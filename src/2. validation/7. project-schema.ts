import { zEnum, zString } from "@2. validation/reusable-shema";
import { CategoryProject, TypeProject } from "@prisma/client";
import { z } from "zod";

const projectSchmea = (mandatory = true) =>
  z
    ?.object({
      name: zString({
        name: "Name",
        mandatory,
      }),
      thumbnail_image: zString({
        name: "Thumbnail Image",
        mandatory,
      }),
      description: zString({
        name: "Description",
        mandatory,
      }),
      category: zEnum({
        name: "Category",
        enum: [
          CategoryProject.API,
          CategoryProject.MOBILE,
          CategoryProject.UI_UX,
          CategoryProject.WEBSITE,
        ],
      }),
      type: zEnum({
        name: "Type",
        enum: [
          TypeProject.COMPANY_PROJECT,
          TypeProject.COMPANY_PROJECT,
          TypeProject.FREELANCE,
        ],
      }),
      id_experiance: zString({
        name: "ID Experiance",
        mandatory,
      }),
      id_user: zString({
        name: "ID User",
        mandatory,
      }),
    })
    ?.strict();

export default projectSchmea;
