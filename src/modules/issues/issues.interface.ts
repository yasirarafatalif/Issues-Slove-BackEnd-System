import type { ROLES } from "../../types";

export type Issue = {
  title?: string;
  description?: string;
  type?: string;
  status?:string;
};

export type IUser ={
  id:number,
  name:string, 
  email:string,
  role:ROLES
}


export type Query ={
  sort?:string,
  type?:string,
  status?:string

}