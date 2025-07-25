import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import { db } from "../firebase/firebase.data.js";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  query,
  where
} from "firebase/firestore";

const userCollection = collection(db, "usuarios");

export const findOne = async ({ email }) => {
  const q = query(userCollection, where('email', '==', email));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return false;
  const doc = snapshot.docs[0];
  const user = doc.data();
  return user;
}

export class UserModel {

  static async register({ name, email, password }) {
    const id = crypto.randomUUID();
    const hashPassword = bcrypt.hashSync(password, 10);
    const docRef = doc(userCollection, id);

    const user = {
      id,
      name,
      email,
      password: hashPassword
    };

    await docRef.set(user);
    return { name, email }; // No enviar password
  }

  

  static async login({ email, password }) {
    const user = await findOne({ email });
    if (!user) throw new Error("User not found");

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    const payload = {
      id: user.id,
      name: user.name
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "defaultSecret",
      { expiresIn: '1h' }
    );

    return { token, user: payload };
  }

}