import { sql } from "../../db";
import { USER_ROLE } from "../../types";

import type { Issue, IUser, Query } from "./issues.interface";

const issuesGetIntoDb = async (query: Query) => {
  const { sort = "newest", type, status } = query;
  // const sortType = sort==="newest"? "DESC" :"ASC";

  let result;

  if (type && status) {
    result = await sql`
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
    WHERE orders.type = ${type}
    AND orders.status = ${status}

    ORDER BY orders.created_at ${sort === "newest" ? sql`DESC` : sql`ASC`}
  `;
  } else if (type) {
    result = await sql`
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

    WHERE orders.type = ${type}

    ORDER BY orders.created_at ${sort === "newest" ? sql`DESC` : sql`ASC`}
  `;
  } else if (status) {
    result = await sql`
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

    WHERE orders.status = ${status}

    ORDER BY orders.created_at ${sort === "newest" ? sql`DESC` : sql`ASC`}
  `;
  } else {
    result = await sql`
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

    ORDER BY orders.created_at ${sort === "newest" ? sql`DESC` : sql`ASC`}
  `;
  }

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

const issuesCreateIntoDB = async (payload: Issue, id: number) => {
  const { title, description, type } = payload;

  const userId = id;

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

const issuesUpdateIntoDb = async (payload: Issue, id: string, user: IUser) => {
  const issueId = Number(id);

  const { id: userId, role } = user;
  const { title, description, type, status } = payload;

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

  if (role === USER_ROLE.contributor) {
    if (issue.reporter_id !== userId) {
      throw new Error("Access denied.");
    }

    if (issue.status !== "open") {
      throw new Error("Only open issues can be updated.");
    }

    let updatedIssue;

    // title + description + type
    if (title && description && type) {
      updatedIssue = await sql`
        UPDATE orders
        SET
          title = ${title},
          description = ${description},
          type = ${type}
        WHERE id = ${issueId}
        RETURNING *
      `;
    }

    // title + description
    else if (title && description) {
      updatedIssue = await sql`
        UPDATE orders
        SET
          title = ${title},
          description = ${description}
        WHERE id = ${issueId}
        RETURNING *
      `;
    }

    // title + type
    else if (title && type) {
      updatedIssue = await sql`
        UPDATE orders
        SET
          title = ${title},
          type = ${type}
        WHERE id = ${issueId}
        RETURNING *
      `;
    }

    // description + type
    else if (description && type) {
      updatedIssue = await sql`
        UPDATE orders
        SET
          description = ${description},
          type = ${type}
        WHERE id = ${issueId}
        RETURNING *
      `;
    }

    // only title
    else if (title) {
      updatedIssue = await sql`
        UPDATE orders
        SET
          title = ${title}
        WHERE id = ${issueId}
        RETURNING *
      `;
    }

    // only description
    else if (description) {
      updatedIssue = await sql`
        UPDATE orders
        SET
          description = ${description}
        WHERE id = ${issueId}
        RETURNING *
      `;
    }

    // only type
    else if (type) {
      updatedIssue = await sql`
        UPDATE orders
        SET
          type = ${type}
        WHERE id = ${issueId}
        RETURNING *
      `;
    } else {
      throw new Error("No fields provided.");
    }

    return updatedIssue[0];
  }

  if (role === USER_ROLE.maintainer) {
    if (status === undefined) {
      throw new Error("No fields provided.");
      return;
    }

    const updatedIssue = await sql`
      UPDATE orders
      SET
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
