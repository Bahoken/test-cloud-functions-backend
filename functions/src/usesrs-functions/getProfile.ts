import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const getCustomUserInfo = async (data, context) => {
  try {
    // Get the authenticated user ID
    const userId = context.auth?.uid;

    if (!userId) {
      throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
    }

    const customUserRef = admin.firestore().collection('custom_user').doc(userId);
    const customUserDoc = await customUserRef.get();

    if (!customUserDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Custom user not found');
    }

    const customUserInfo = customUserDoc.data();

    return { customUserInfo };
    
  } catch (error) {
    console.error('Error retrieving custom user info:', error);
    throw new functions.https.HttpsError('internal', 'Internal server error');
  }
}

export { getCustomUserInfo }
