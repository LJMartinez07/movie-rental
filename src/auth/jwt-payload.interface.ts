import { UserRoles } from "./../constants/userRoles";

export interface JwtPayload {
    username: string;
    roles: UserRoles[];
}
