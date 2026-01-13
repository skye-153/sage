// This file would contain your server-side auth logic,
// but for client-side operations, we can handle them in components or hooks.
// Here we'll define simple sign-in and sign-out functions.

import {
  signInWithEmailAndPassword,
  signOut,
  AuthError,
} from 'firebase/auth';
import { auth } from './config';

export async function signInWithEmail(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    const authError = error as AuthError;
    return { success: false, error: authError.message };
  }
}

export async function signOutUser(): Promise<{ success: boolean; error?: string }> {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    const authError = error as AuthError;
    return { success: false, error: authError.message };
  }
}
