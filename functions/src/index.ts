import { Create } from "./usesrs-functions/create-user";
import { Subscribe } from "./usesrs-functions/subscribe";
import * as functions from "firebase-functions";

exports.manage_user = functions.https.onCall( async (data, context) => {
  
  const { action,user } = data;
  
  switch(action) {
    case 'CREATE':
        return Create(user, context);
        break;
    case 'SUBSCRIBE':
        return Subscribe(user, context=null);
        break;
    default:
        break;
  }

});