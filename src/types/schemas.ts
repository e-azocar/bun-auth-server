import { t } from "elysia";

export const signInSchema = {
  body: t.Object({
    email: t.String(),
    password: t.String(),
  }),
};

export const signUpSchema = {
  body: t.Object({
    email: t.String(),
    password: t.String(),
    name: t.String(),
  }),
};
