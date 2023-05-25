import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const changePassword = async (data, context) => {
  try {
    // Get the authenticated user ID
    const userId = context.auth?.uid;

    if (!userId) {
      throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated');
    }

    // Get the current user
    const user = await admin.auth().getUser(userId);

    // Verify the old password
    const { oldPassword, newPassword } = data;
    const credential = admin.auth.EmailAuthProvider.credential(user.email, oldPassword);
    await admin.auth().reauthenticateWithCredential(credential);

    // Change the password
    await admin.auth().updateUser(userId, { password: newPassword });

    return { message: 'Password changed successfully' };
  } catch (error) {
    console.error('Error changing password:', error);
    if (error.code === 'auth/wrong-password') {
      throw new functions.https.HttpsError('permission-denied', 'Invalid old password');
    }
    throw new functions.https.HttpsError('internal', 'Internal server error');
  }
}

export { changePassword }