import {
  getListSocialLink,
  upsertSocialLink,
} from "@4. controllers/3. social-link/0. social-link-controller";
import authentication from "@_lib/middleware/authentication";
import express from "express";

export default (router: express.Router) => {
  router.get("/social-links", getListSocialLink);
  router.post("/social-link", authentication(), upsertSocialLink);
};
