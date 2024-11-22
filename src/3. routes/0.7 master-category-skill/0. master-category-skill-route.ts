import express from "express";
import {
  createBulkMasterCategorySkill,
  getListmasterCategorySkill,
  upsertMasterCategorySkill,
} from "@4. controllers/0.7 master-category-skill/0. master-category-skill-controller";

export default (router: express.Router) => {
  router.get("/category-skills", getListmasterCategorySkill);
  router.post("/category-skills", createBulkMasterCategorySkill);
  router.post("/category-skill", upsertMasterCategorySkill);

  return router;
};
