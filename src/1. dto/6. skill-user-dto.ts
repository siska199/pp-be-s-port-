import prisma from "@0 db/prisma";
import skillUserSchema from "@2. validation/6. skill-user-schema";
import { getImageUrlFromClaudinary } from "@_lib/helpers/claudinary";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  validationParse,
} from "@_lib/helpers/function";
import { TQueryParamsPaginationList } from "@_lib/types";
import { Level, SkillUser } from "@prisma/client";

type TParamsListSkillUserDto = TQueryParamsPaginationList<keyof SkillUser> & {
  id_user: string;
  id_skills?: string;
  year_of_experiance?: number;
  level?: Level;
};

export const getListSkillUserDto = async (params: TParamsListSkillUserDto) => {
  const {
    id_user,
    page_no,
    items_perpage,
    sort_by = "created_at",
    sort_dir = "desc",
    id_skills,
    year_of_experiance,
    level,
  } = params;
  const listIdSkill = id_skills?.split(",");

  const skip = Number(items_perpage) * (Number(page_no) - 1);
  const take = items_perpage;

  const result = await prisma?.skillUser?.findMany({
    ...(skip && { skip }),
    ...(take && { take }),
    where: {
      ...(id_user && { id_user }),
      AND: [
        {
          OR: listIdSkill?.map((id_skill) => ({
            skill: {
              id: id_skill,
            },
          })),
        },
        {
          ...(level && { level }),
        },
        {
          ...(year_of_experiance && { year_of_experiance }),
        },
      ],
    },
    orderBy: {
      ...(sort_by && { [sort_by]: sort_dir }),
    },
    include: {
      skill: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const resultDto = {
    items: result?.map((data) => {
      return filterKeysObject({
        object: data,
        keys: ["created_at", "updated_at"],
      });
    }),
    total_items: await prisma?.skillUser?.count(),
    current_page: page_no ?? 1,
  };

  return result ? resultDto : null;
};

export const getSkillUserByIdDto = async (param: string) => {
  const id = param;
  const result = await prisma?.skillUser?.findUnique({
    where: {
      id,
    },
    include: {
      skill: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  const skill_image = await getImageUrlFromClaudinary({
    publicId: result?.skill?.image || "",
  });

  const resultDto = filterKeysObject({
    object: {
      ...result,
      image: skill_image,
    },
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};

export const upsertSkillUserDto = async (params: SkillUser) => {
  const id = params.id ?? "";
  const dataDto = {
    ...(id && { id }),
    id_skill: params.id_skill,
    year_of_experiance: params.year_of_experiance,
    level: params.level,
    id_user: params.id_user,
  };

  await validationParse({
    schema: skillUserSchema(!id),
    data: dataDto,
  });

  const result = await prisma?.skillUser?.upsert({
    where: {
      id,
    },
    create: dataDto,
    update: filterKeysObject({
      object: removeKeyWithUndifienedValue(dataDto),
      keys: ["id_user"],
    }),
    include: {
      skill: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const resultDto = result;
  return result ? resultDto : null;
};

export const createBulkSkillUserDto = async (params: SkillUser[]) => {
  const listData = params?.map((data) => {
    return {
      id_skill: data?.id_skill,
      year_of_experiance: data?.year_of_experiance,
      level: data?.level,
      id_user: data?.id_user,
    };
  });

  const result = await prisma?.skillUser?.createMany({
    data: listData,
  });
  const resultDto = result;
  return result ? resultDto : null;
};

export const deleteSkillUserByIdDto = async (param: string) => {
  const id = param;

  const result = await prisma?.skillUser?.delete({
    where: {
      id,
    },
  });

  const resultDto = result;
  return result ? resultDto : null;
};
