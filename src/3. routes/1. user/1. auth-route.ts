import signInSchema from "@2. validation/1.1 sign-in-schema";
import signUpSchema from "@2. validation/1.2 sign-up-schema";
import { signIn, signUp } from "@4. controllers/1. user/1. auth-controller";
import validateData from "@_lib/middleware/validate-data";

import express from "express";

export default (router: express.Router) => {
  router.post("/sign-up", validateData(signUpSchema), signUp);
  router.post("/sign-in", validateData(signInSchema), signIn);
};
