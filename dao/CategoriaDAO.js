import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { Categoria } from "../models/CategoriaModel";

class CategoriaDAO {

    // Método para obtener una referencia a la colección "categoria" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Categoria');;
    }

    // Método para obtener una categoria por el id
    static async findById(Id) {
        const ref = doc(FIRESTORE_DB, `Categoria/${Id}`);
        const documento = await getDoc(ref);
        const datos = documento.data()
        return new Categoria(documento.id, datos.nombre);
    }

    // Método para insertar un producto en Firebase
    static async insert(categoria) {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'Categoria'), {
            nombre: categoria.getNombre.nombre
        });
        return new Categoria(docRef.id, categoria.getNombre.nombre);
    }

    // Método para actualizar un producto en Firebase
    static async update(categoria) {
        const ref = doc(FIRESTORE_DB, `Categoria/${categoria.getId}`);
        await updateDoc(ref, {nombre: categoria.getNombre});
    }

    // Método para eliminar un producto de Firebase
    static async delete(categoria) {
        const ref = doc(FIRESTORE_DB, `Categoria/${categoria.getId}`);
        await deleteDoc(ref);
    }
}
  
export { CategoriaDAO }