import { UserRoles } from "src/common";


export interface IRefreshTokenPayload {
    email: string,
    role: UserRoles,
    iat: number,
    exp: number
  }
  