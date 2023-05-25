import { Create } from "./usesrs-functions/create-user";
import { Subscribe } from "./usesrs-functions/subscribe";
import { getAllCustomUsers } from "./usesrs-functions/getAll-user";
import { updateCustomUserStatus } from "./usesrs-functions/deactivate-user";
import { getCustomUserInfo } from "./usesrs-functions/getProfile";
import * as functions from "firebase-functions";

exports.manage_user = functions.https.onCall( async (data, context) => {
  
  const { action,user,status } = data;
  
  switch(action) {
    case 'CREATE':
        return Create(user, context);
        break;
    case 'SUBSCRIBE':
        return Subscribe(user, context=null);
        break;
    case 'GET_ALL_USERS':
        return getAllCustomUsers(null, context=null);
        break;
    case 'CHANGE_STATUS':
        return updateCustomUserStatus(status, context=null);
        break;
    case 'GET_PROFILE':
        return getCustomUserInfo(null, context);
        break;
        
    default:
        break;
  }

});