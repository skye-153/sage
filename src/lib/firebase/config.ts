import { initializeApp, getApps, getApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const getFirebaseConfig = (): FirebaseOptions => {
    // This function will only be called on the client,
    // ensuring process.env variables are available.
    return {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

function initializeFirebase() {
    if (typeof window !== 'undefined') {
        if (getApps().length === 0) {
            const firebaseConfig = getFirebaseConfig();
            app = initializeApp(firebaseConfig);
        } else {
            app = getApp();
        }
        auth = getAuth(app);
        db = getFirestore(app);
    }
}

// We also export the function to be able to initialize it when needed.
export { initializeFirebase, app, auth, db };
