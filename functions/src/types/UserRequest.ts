import { Type } from "../enum/type";
import { UserRole } from "../enum/userRole";

export interface UserRequest {
    email: string;
    password: string;
    firstname: string;
    name: string;
    country: string;
    city: string;
    phone: string;
    type?: Type;
    role?: UserRole;
}