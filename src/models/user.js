import { db } from '../firebase/firebase.admin.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from 'crypto';

const collection = db.collection("usuarios");

export const findOne = async ({ email }) => {
  const thisCollection = collection;
  const snapshot = await thisCollection.where('email', '==', email).get();
  if (snapshot.empty) return false
  const doc = snapshot.docs[0];
  const user = doc.data();
  return user;
}

export class UserModel {
  static collection = collection;

  static async register({ name, email, password }) {
    const id = crypto.randomUUID();
    const hashPassword = bcrypt.hashSync(password, 10);
    const docRef = this.collection.doc(id);

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