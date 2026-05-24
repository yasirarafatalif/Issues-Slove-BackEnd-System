export const USER_ROLE = {
  maintainer: "maintainer",
  contributor: "contributor",
} as const;

export type ROLES = (typeof USER_ROLE)[keyof typeof USER_ROLE];


export type User = {
  name: string;
  password: string;
  role?: ROLES;
  email: string;
  id?:number
};

export type JwtPayloadType = {
  id: number;
  name: string;
  email: string;
  role: ROLES;
};