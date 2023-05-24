import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { CustomUser } from '../types/CustomUser';
import { UserRequest } from '../types/UserRequest';
import { UserRole } from '../enum/userRole';
import { Type } from '../enum/type';
import { info } from 'firebase-functions/logger';
admin.initializeApp();


const newUser = async (data: UserRequest, context) => {

    const { type,role } = data;
  
    if (type === Type.Create) {
      // Check if user is authenticated and has the admin role
      if (context.auth) {
        const uid = context.auth.uid;
  
        // Retrieve the custom_user document for the authenticated user
        const customUserSnapshot = await admin.firestore().collection('custom_user').doc(uid).get();
  
        if (!customUserSnapshot.exists) {
          throw new functions.https.HttpsError('not-found', 'User not found.');
        }
  
        const customUser = customUserSnapshot.data() as CustomUser;
  
        if (customUser.role !== UserRole.Admin) {
          throw new functions.https.HttpsError('permission-denied', 'User does not have permission to create a user.');
        }
      }
    }
  
    try {

      info("sending type ...", type);
      info("sending role ...", role);


      
      info("sending data ...");
      info(data);

      // Create the user
      const { email, password } = data;

      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
      });
      
      info("getting uid ...",userRecord.uid);

      const { uid } = userRecord;

      info("setting uid ...",uid);

      
      // Create the custom_user document
      const customUser: CustomUser = {
        firstname: data.firstname,
        name: data.name,
        country: data.country,
        city: data.city,
        phone: data.phone,
        status: true,
        userId: uid,
        role: role,
      };
  
      await admin.firestore().collection('custom_user').doc(uid).set(customUser);
      // await admin.firestore().collection('custom_user').add({...customUser});
  
      // Return the user ID
      return { uid: uid };

    } catch (error) {
      throw new functions.https.HttpsError('internal', 'Error creating user.', error);
    }
  };

export { newUser }