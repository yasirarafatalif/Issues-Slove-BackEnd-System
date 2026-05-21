import { sql } from "../../db";
import {type ROLES, type User } from "../../types";
import type { LogInUser } from "./auth.interface";
import bcrypt from "bcrypt";

const singUpIntoDb = async (payload: User) => {
  const { email, password, role, name } = payload;
  const hashPassword = bcrypt.hashSync(password, 10);
  const roles: ROLES[] = ["maintainer", "contributor"];
  if (role && !roles.includes(role)) {
    throw new Error("Invalid role");
    return;
  }
  const result = await sql`
    INSERT INTO users(name,email,password_hash,role) VALUES(${name},${email},${hashPassword}, COALESCE(${role},'contributor')) RETURNING id, name , email ,role, created_at, updated_at
    `;
  return result[0];
};

const loginIntoDb = async (payload: LogInUser) => {
  const { email, password } = payload;
  const findUser = await sql`
    SELECT * FROM users WHERE email = ${email}
    `;
  const user = findUser[0];
  if (!user) {
    throw new Error("User Not Found");
  }
  const ispassword = bcrypt.compare(password, user.password_hash);
  if (!ispassword) {
    throw new Error("Password Worng");
  }
  const { password_hash, ...result } = user;
  return result;
};

export const authServices = {
  singUpIntoDb,
  loginIntoDb,
};
