import { Elysia } from "elysia";
import bearer from "@elysiajs/bearer";
import cors from "@elysiajs/cors";
import jwt from "@elysiajs/jwt";
import { swagger } from "@elysiajs/swagger";
import { profile, signIn, signUp } from "./controllers/user";
import { isAuth } from "./middlewares/auth";
import { JWT_SECRET } from "./config";
import { signInSchema, signUpSchema } from "./types/schemas";
import { initDb } from "./db";

const app = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: JWT_SECRET,
    })
  )
  .use(bearer())
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: {
          title: "Auth Server",
          description: "Simple auth server with Elysia and SQLite",
          version: "1.0.0",
        },
      },
    })
  );

app.group("/user", (app) =>
  app
    .post("/signup", signUp, { schema: signUpSchema })
    .post("/signin", signIn, { schema: signInSchema })
    .get("/", profile, { beforeHandle: isAuth })
);

initDb();
app.listen(3000);

console.log(
  `🚀 Auth Server is running http://${app.server?.hostname}:${app.server?.port}`
);
