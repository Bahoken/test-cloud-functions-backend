import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { info } from 'firebase-functions/logger';

const updateCustomUserStatus = async (data, context) => {
  try {
    const { id,status } = data;

    info(' ---- user status ----', status);
    info(' ---- user id ----', id);

    if (!id) {
      throw new functions.https.HttpsError('invalid-argument', 'Custom user ID is missing');
    }

    const customUserRef = admin.firestore().collection('custom_user').doc(id);
    const customUserDoc = await customUserRef.get();

    if (!customUserDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'Custom user not found');
    }

    await customUserRef.update({ status: status });

    // Deactivate Firebase user
    const customUser = customUserDoc.data();
    const userId = customUser.userId;
    await admin.auth().updateUser(userId, { disabled: status });

    return { message: 'Custom user status updated successfully' };
  } catch (error) {
    console.error('Error updating custom user status:', error);
    throw new functions.https.HttpsError('internal', 'Internal server error : Error updating user status');
  }
};


export { updateCustomUserStatus }