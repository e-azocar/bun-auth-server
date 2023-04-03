import type {
  AppContext,
  SignUpContext,
  SignInContext,
  User,
  TokenData,
} from "../types/user";
import { insertUser, selectUserByEmail, selectUserById } from "../queries/user";

export const signUp = async ({ body, jwt, set }: SignUpContext) => {
  const [foundUser] = selectUserByEmail.all(body.email);

  if (foundUser) {
    set.status = 400;
    return { error: "User already exists" };
  }

  insertUser.run(body.email, body.password, body.name);

  const [insertedUser] = selectUserByEmail.all(body.email);
  const user = insertedUser as User;
  const token = await jwt.sign({
    id: user.id.toString(),
    issuedAt: Date.now().toString(),
  });

  return {
    message: "User created successfully",
    token,
  };
};

export const signIn = async ({ body, jwt, set }: SignInContext) => {
  const [foundUser] = selectUserByEmail.all(body.email);

  if (!foundUser) {
    set.status = 400;
    return { error: "User not found" };
  }

  const user = foundUser as User;

  if (user.password !== body.password) {
    set.status = 400;
    return { error: "Invalid password" };
  }

  const token = await jwt.sign({
    id: user.id.toString(),
    issuedAt: Date.now().toString(),
  });

  return {
    message: "User logged in successfully",
    token,
  };
};

export const profile = async ({ jwt, bearer }: AppContext) => {
  const tokenData = await jwt.verify(bearer);
  const { id } = tokenData as unknown as TokenData;

  const [foundUser] = selectUserById.all(id);
  const user = foundUser as User;

  return user;
};
