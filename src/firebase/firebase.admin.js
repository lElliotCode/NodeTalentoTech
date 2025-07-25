import 'dotenv/config';
import admin from "firebase-admin";
import fs from 'fs';

// Leé el archivo JSON manualmente
const serviceAccount = JSON.parse(
  fs.readFileSync('./src/firebase/node-api-rest.json', 'utf-8')
);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://node-api-rest-ea6fa-default-rtdb.firebaseio.com",
  });

export const db = admin.firestore();
