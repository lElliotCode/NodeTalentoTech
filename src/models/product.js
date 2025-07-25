import { db } from "../firebase/firebase.data.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "productos");

export class ProductModel {

  static async getAll({ category } = {}) {
    try {
        const snapshot = await getDocs(productsCollection);
  
    if (snapshot.empty) throw new Error("No products found");
  
    let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
    if (category) {
      // Filtrado manual simple en JS, sin usar query firestore
      const lowerCategory = category.toLowerCase();
      products = products.filter(p => Array.isArray(p.category) && p.category.some(c => c.toLowerCase() === lowerCategory));
    }
  
    return products;
    } catch (error) {
        throw error;
    }
  }
  

  static async getById({ id }) {
    const docRef = doc(productsCollection, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Product not found");
    return { id: docSnap.id, ...docSnap.data() };
  }

  static async create({ input }) {
    const newId = crypto.randomUUID();
    const newProduct = {
      id: newId,
      ...input,
    };
    const docRef = doc(productsCollection, newId);
    await setDoc(docRef, newProduct);
    return newProduct;
  }

  static async update({ id, product }) {
    const docRef = doc(productsCollection, id);
    await updateDoc(docRef, product);
    const updatedDoc = await getDoc(docRef);
    return { id: updatedDoc.id, ...updatedDoc.data() };
  }

  static async delete(id) {
    const docRef = doc(productsCollection, id);
    await deleteDoc(docRef);
    return true;
  }
}