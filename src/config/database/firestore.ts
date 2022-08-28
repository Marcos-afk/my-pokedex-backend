import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccountKey from './serviceAccountKey.json';

const serviceAccount = serviceAccountKey as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestoreDb = admin.firestore();
