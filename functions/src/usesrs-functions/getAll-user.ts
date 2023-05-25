import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { info } from 'firebase-functions/logger';
// import { UserRole } from '../enum/userRole';
// import { CustomUser } from '../types/CustomUser';

const getAllCustomUsers = async (data, context) => {
   
    // if (context.auth) {
    //     const uid = context.auth.uid;
  
    //     // Retrieve the custom_user document for the authenticated user
    //     const customUserSnapshot = await admin.firestore().collection('custom_user').doc(uid).get();
  
    //     if (!customUserSnapshot.exists) {
    //       throw new functions.https.HttpsError('not-found', 'User not found.');
    //     }
  
    //     const customUser = customUserSnapshot.data() as CustomUser;
  
    //     if (customUser.role !== UserRole.Admin) {
    //       throw new functions.https.HttpsError('permission-denied', 'User does not have permission to create a user.');
    //     }
    //   }

    try {
      const customUsersSnapshot = await admin.firestore().collection('custom_user').get();
  
      const customUsers: any[] = [];
      customUsersSnapshot.forEach((doc) => {
        const customUser = doc.data();
        customUser.id = doc.id;
        customUsers.push(customUser);
      });
  
      info('---- custom user ----', customUsers);

      return { customUsers };
    } catch (error) {
      console.error('Error fetching custom users:', error);
      throw new functions.https.HttpsError('internal', 'Internal server error');
    }

}

export { getAllCustomUsers }