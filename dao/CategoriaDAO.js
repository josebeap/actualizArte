import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Categoria } from "../models/CategoriaModel";

class CategoriaDAO {

    // Método para obtener una referencia a la colección "categoria" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Categoria');;
    }

    // Método para obtener las categorias filtradas por nombre
    static async findByName(nombreCat) {
        const snapshot = await getDocs(collection(FIRESTORE_DB, 'Categoria'));
        const categorias = [];
        snapshot.forEach(doc => {
            const {nombre} = doc.data();
            if (nombre == nombreCat){
                categorias.push(new Categoria(doc.id, nombre));
            }
        });
        return categorias;
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