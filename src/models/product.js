import { db }  from '../firebase/firebase.admin.js';

const collection = db.collection("productos");

export class ProductModel {
    static collection = collection;

    static async getAll({ category }) {
        let query = this.collection;
        if (category) {
            query = query.where("category", "==", category.toLowerCase());
        }
        const snapshot = await query.get();

        console.log(snapshot.docs.map(doc => doc.data()))
        if (snapshot.empty) throw new Error("No products found");
        return snapshot.docs.map(doc => doc.data());
    }

    static async getById({ id }) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) throw new Error("Product not found");
        return doc.data();
    }

    static async create({ input }) {
        const newProduct = {
            id: crypto.randomUUID(),
            ...input
        }
        const docRef = this.collection.doc(newProduct.id);
        await docRef.set(newProduct);
        return newProduct;
    }

    static async update({ id, product }) {
        const docRef = this.collection.doc(id);
        await docRef.update(product);
        return docRef.get().then(doc => doc.data());
    }

    static async delete(id) {
        const docRef = this.collection.doc(id);
        await docRef.delete();
        return true;
    }
}