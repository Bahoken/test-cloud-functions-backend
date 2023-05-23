import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

interface CreateUserRequest {
  email: string;
  password: string;
  firstname: string;
  name: string;
  country: string;
  city: string;
  phone: string;
}

interface CustomUser {
  firstname: string;
  name: string;
  country: string;
  city: string;
  phone: string;
  role: string;
  userId: string;
}

exports.registerUser = functions.https.onCall(async (data: CreateUserRequest) => {
    // Check if user is authenticated
    //   if (!context.auth) {
    //     throw new functions.https.HttpsError('unauthenticated', 'User is not authenticated.');
    //   }

  try {
    // Create the user
    const { email, password } = data;

    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    const { uid } = userRecord;
    
    // Create the custom_user document
    const customUser: CustomUser = {
      firstname: data.firstname,
      name: data.name,
      country: data.country,
      city: data.city,
      phone: data.phone,
      role: 'user', // Set the role field to 'user'
      userId: uid, // Link the custom_user document to the newly created user
    };
    
    await admin.firestore().collection('custom_user').doc(uid).set(customUser);

    // Return the user ID
    return { uid: uid };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Error creating user.', error);
  }

});
