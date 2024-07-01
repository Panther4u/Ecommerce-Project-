import { auth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from '../Services/firebase'; // Import necessary Firebase authentication functions

// Function to sign in with Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user; // Return the signed-in user object
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error; // Re-throw the error for handling in the calling component
  }
};

// Function to sign out
export const signOut = async () => { // Rename the function to `signOut`
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error; // Re-throw the error for handling in the calling component
  }
};

// Other authentication-related functions can be added here
