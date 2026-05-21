import { sql } from "../../db";
import { USER_ROLE, type ROLES, type User } from "../../types";

const singUpIntoDb = async (payload: User) => {
  const { email, password, role, name } = payload;
  const roles: ROLES[]= ["maintainer", "contributor"];
  if (role && !roles.includes(role)) {
    throw new Error("Invalid role");
    return
  }
  const result = await sql`
    INSERT INTO users(name,email,password_hash,role) VALUES(${name},${email},${password}, COALESCE(${role},'contributor')) RETURNING name , email ,role, created_at, updated_at
    `;
  return result[0];
};

export const authServices = {
  singUpIntoDb,
};
