import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const updateCustomUserInfo = async (data, context) => {
  try {
    // Get the authenticated user ID
    const userId = context.auth?.uid;

    if (!userId) {
      throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
    }

    // Get the custom user data from the request
    const { firstname, name, country, city, phone } = data;

    // Update the custom user document
    const customUserRef = admin.firestore().collection('custom_user').doc(userId);
    await customUserRef.update({ firstname, name, country, city, phone });

    return { message: 'Custom user info updated successfully' };
  } catch (error) {
    console.error('Error updating custom user info:', error);
    throw new functions.https.HttpsError('internal', 'Internal server error');
  }
}

export { updateCustomUserInfo }