import type { JWTPayloadSpec } from "@elysiajs/jwt";
import type { Context } from "elysia";

export interface BaseUser {
  email: string;
  password: string;
}

export interface RegisterUser extends BaseUser {
  name: string;
}

export interface User extends RegisterUser {
  id: number;
}

export interface AppContext extends Context {
  bearer?: string;
  jwt: {
    sign: (
      morePayload: Record<string, string> & JWTPayloadSpec
    ) => Promise<string>;
    verify: (
      jwt?: string | undefined
    ) => Promise<false | (Record<string, string> & JWTPayloadSpec)>;
  };
}

export interface SignInContext extends AppContext {
  body: BaseUser;
}

export interface SignUpContext extends AppContext {
  body: RegisterUser;
}

export interface TokenData {
  id: string;
  issuedAt: string;
}
