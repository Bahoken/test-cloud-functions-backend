import { newUser } from "./new-user";
import { UserRequest } from "../types/UserRequest";
import { Type } from "../enum/type";

const Create = async (data: UserRequest, context) => {
    
    data.type = Type.Create;

    newUser(data, context);

}

export { Create };