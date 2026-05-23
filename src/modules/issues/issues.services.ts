import { sql } from "../../db";
import { USER_ROLE } from "../../types";

import type { Issue, IUser } from "./issues.interface";

const issuesCreateIntoDB = async (payload: Issue, id: number) => {
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

const issuesGetIntoDb = async () => {
  const result = await sql`
  SELECT 
    orders.id,
    orders.title,
    orders.description,
    orders.type,
    orders.status,
    orders.created_at,
    orders.updated_at,

    users.id AS reporter_id,
    users.name AS reporter_name,
    users.role AS reporter_role
    FROM orders
    JOIN users
    ON orders.reporter_id = users.id
  `;
  const data = result.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    type: item.type,
    status: item.status,

    reporter: {
      id: item.reporter_id,
      name: item.reporter_name,
      role: item.reporter_role,
    },

    created_at: item.created_at,
    updated_at: item.updated_at,
  }));
  return data;
};

const issuesGetSingelIntoDb = async (id: string) => {
  const productId = Number(id);
  const result = await sql`
  SELECT 
    orders.id,
    orders.title,
    orders.description,
    orders.type,
    orders.status,
    orders.created_at,
    orders.updated_at,

    users.id AS reporter_id,
    users.name AS reporter_name,
    users.role AS reporter_role
    FROM orders
    JOIN users
    ON orders.reporter_id = users.id
    WHERE orders.id = ${productId}
  `;

  const data = result.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    type: item.type,
    status: item.status,

    reporter: {
      id: item.reporter_id,
      name: item.reporter_name,
      role: item.reporter_role,
    },

    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  return data;
};

const issuesUpdateIntoDb = async (payload: Issue, id: string, user: any) => {
  const issueId = Number(id);

  const { id: userId, role } = user;

  // Find Issue
  const findIssue = await sql`
    SELECT *
    FROM orders
    WHERE id = ${issueId}
  `;

  const issue = findIssue[0];

  if (!issue) {
    throw new Error("Issue not found.");
  }

  // contributor
  if (role === USER_ROLE.contributor) {
    if (issue.reporter_id !== userId) {
      throw new Error("Access denied.");
    }

    if (issue.status !== "open") {
      throw new Error("Only open issues can be updated.");
    }

    const { title, description, type } = payload;

    const updatedIssue = await sql`
      UPDATE orders
      SET
        title = ${title},
        description = ${description},
        type = ${type}
      WHERE id = ${issueId}
      RETURNING *
    `;

    return updatedIssue[0];
  }

  if (role === USER_ROLE.maintainer) {
    const { title, description, type, status } = payload;

    const updatedIssue = await sql`
      UPDATE orders
      SET
        title = ${title},
        description = ${description},
        type = ${type},
        status = ${status}
      WHERE id = ${issueId}
      RETURNING *
    `;

    return updatedIssue[0];
  }

  throw new Error("Invalid role.");
};
const issuesDeleteIntoDb = async (id: string) => {
  const issueId = Number(id);


  if (isNaN(issueId)) {
    throw new Error("Invalid issue id.");
  }


  const deletedIssue = await sql`
    DELETE FROM orders
    WHERE id = ${issueId}
    RETURNING *
  `;


  if (deletedIssue.length === 0) {
    throw new Error("Issue not found. Unable to delete the issue.");
  }

  return deletedIssue[0];
};

export const issuesService = {
  issuesCreateIntoDB,
  issuesGetIntoDb,
  issuesGetSingelIntoDb,
  issuesDeleteIntoDb,
  issuesUpdateIntoDb,
};
