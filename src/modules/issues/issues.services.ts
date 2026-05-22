import { sql } from "../../db";
import type { Issue } from "./issues.interface";

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

const issuesGetSingelIntoDb = async (id:string)=>{
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
  
}

export const issuesService = {
  issuesCreateIntoDB,
  issuesGetIntoDb,
  issuesGetSingelIntoDb
};
