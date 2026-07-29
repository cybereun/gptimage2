import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

let db = null;

export const initFirebase = (customConfig = null) => {
  try {
    const config = customConfig || {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    if (config.apiKey && config.projectId && config.apiKey !== 'your_api_key_here') {
      const app = getApps().length === 0 ? initializeApp(config) : getApps()[0];
      db = getFirestore(app);
      console.log('Firebase initialized successfully.');
      return true;
    }
  } catch (err) {
    console.warn('Firebase initialization skipped or failed:', err.message);
  }
  return false;
};

// Initial attempt with env vars
initFirebase();

export const fetchFirebasePrompts = async () => {
  if (!db) return null;
  try {
    const querySnapshot = await getDocs(collection(db, 'prompts'));
    const prompts = [];
    querySnapshot.forEach((doc) => {
      prompts.push({ id: doc.id, ...doc.data() });
    });
    return prompts.length > 0 ? prompts : null;
  } catch (err) {
    console.error('Error fetching from Firebase:', err);
    return null;
  }
};

export const saveFirebasePrompt = async (promptData) => {
  if (!db) return false;
  try {
    await addDoc(collection(db, 'prompts'), {
      ...promptData,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (err) {
    console.error('Error saving to Firebase:', err);
    return false;
  }
};
