import { newUser } from "./new-user";
import { UserRequest } from "../types/UserRequest";
import { UserRole } from "../enum/userRole";
import { Type } from "../enum/type";


const Subscribe = async (data: UserRequest, context=null) => {
    
    data.type = Type.Subscribe;
    data.role = UserRole.User;
    newUser(data, context);

}

export { Subscribe };