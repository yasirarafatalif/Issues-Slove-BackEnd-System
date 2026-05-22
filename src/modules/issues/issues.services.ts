import { sql } from "../../db";
import type { Issue } from "./issues.interface";

const issuesCreateIntoDB = async (payload: Issue ,id:number) => {
  const { title, description, type } = payload;

  const userId = id;
 


  // try to implement repoter_id from jwt token in header
  const result = await sql`
  INSERT INTO orders (
    title,
    description,
    type,
    status,
    reporter_id
  ) VALUES (
    ${title},
    ${description},
    ${type},
    'in_progress',
    ${userId}
  ) RETURNING id, title, description, type, status, reporter_id, created_at, updated_at
  `;
  if (!result) {
    throw new Error("Failed to create issue");
  }
  return result[0];
};

export const issuesService = {
  issuesCreateIntoDB,
};
