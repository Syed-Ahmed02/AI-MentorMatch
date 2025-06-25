import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Initialize Firebase Admin if not already initialized
export function initializeFirebaseAdmin() {
  if (!getApps().length) {
    const serviceAccount = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    // Validate required environment variables
    if (!serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
      console.error('Missing Firebase Admin SDK environment variables');
      throw new Error('Firebase Admin SDK not properly configured');
    }

    initializeApp({
      credential: cert(serviceAccount),
    });
  }
}

// Get Firebase Admin Auth instance
export function getFirebaseAdminAuth() {
  initializeFirebaseAdmin();
  return getAuth();
}

// Verify Firebase ID token
export async function verifyIdToken(idToken: string) {
  try {
    const auth = getFirebaseAdminAuth();
    return await auth.verifyIdToken(idToken);
  } catch (error) {
    throw new Error('Invalid authorization token');
  }
} 