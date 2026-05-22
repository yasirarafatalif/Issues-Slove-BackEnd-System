import { sql } from "../../db";
import type { Issue } from "./issues.interface";

const issuesCreateIntoDB = async (payload: Issue) => {
  const { title, description, type } = payload;

  // try to implement repoter_id from jwt token in header
  const result = await sql`
  INSERT INTO orders (
    title,
    description,
    type,
    status
  ) VALUES (
    ${title},
    ${description},
    ${type},
    'open'
  ) RETURNING id, title, description, type, status, created_at, updated_at
  `;
  if (!result) {
    throw new Error("Failed to create issue");
  }
  return result[0];
};

export const issuesService = {
  issuesCreateIntoDB,
};
