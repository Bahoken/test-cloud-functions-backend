import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const authenticateAndCheckRole = async (data, context) => {
    const { email, password } = data;
  
    try {
      // Authenticate the user with the provided credentials
      const { user } = await admin.auth().signInWithEmailAndPassword(email, password);
      const uid = user.uid;
  
      // Retrieve the user's custom role from the related custom user document
      const customUserDoc = await admin.firestore().collection('custom_users').doc(uid).get();
  
      if (!customUserDoc.exists) {
        throw new functions.https.HttpsError('not-found', 'Custom user document not found.');
      }
  
      const customUserData = customUserDoc.data();
  
      // Check if the user has the required role (e.g., "admin")
      if (customUserData.role !== 'admin') {
        throw new functions.https.HttpsError('permission-denied', 'User does not have the required role.');
      }
  
      // Authentication and role verification successful
      return {
        message: 'Authentication and role verification successful.',
        user: {
          uid,
          email: user.email,
          role: customUserData.role
        }
      };
    } catch (error) {
      throw new functions.https.HttpsError('unauthenticated', 'Invalid credentials.');
    }
}
  
 export  { authenticateAndCheckRole }