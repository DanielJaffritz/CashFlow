import { FirebaseError } from 'firebase/app';

export const getFriendlyErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email or password are incorrect';
    case 'auth/invalid-email':
      return "Email's format is not valid";
    case 'auth/email-already-in-use':
      return 'Email is already in use';
    case 'auth/too-many-requests':
      return 'Too many attemps. Try it later';
    case 'auth/password-does-not-meet-requirements':
      return 'password must be 8 characters long and it must contain at leat one special character'
    default:
      return errorCode;
  }
};