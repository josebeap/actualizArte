import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Proveedor } from "../models/ProveedorModel";

class ProveedorDAO {

    // Método para obtener una referencia a la colección "proveedor" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Proveedor');;
    }

    // Método para obtener las categorias filtradas por nombre
    static async find(nombrePro) {
        const snapshot = await getDocs(collection(FIRESTORE_DB, 'Proveedor'));
        const proveedores = [];
        snapshot.forEach(doc => {
            const {nit, nombre, telefono, direccion, correo} = doc.data();
            if (nombre == nombrePro){
                proveedores.push(new Proveedor(doc.id, nit, nombre, telefono, direccion, correo));
            }
        });
        return proveedores;
    }

    // Método para insertar un producto en Firebase
    static async insert(proveedor) {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'Proveedor'), {
            nit: proveedor.getNit.nit,
            nombre: proveedor.getNombre.nombre,
            telefono: proveedor.getTelefono.telefono,
            direccion: proveedor.getDireccion.direccion,
            correo: proveedor.getCorreo.correo,
        });
        return new Proveedor(docRef.id, proveedor.getNit.nit,
            proveedor.getNombre.nombre,
            proveedor.getTelefono.telefono,
            proveedor.getDireccion.direccion,
            proveedor.getCorreo.correo,);
    }

    // Método para actualizar un producto en Firebase
    static async update(proveedor) {
        const ref = doc(FIRESTORE_DB, `Proveedor/${proveedor.getId}`);
        await updateDoc(ref, {
            nit: proveedor.getNit,
            nombre: proveedor.getNombre,
            telefono: proveedor.getTelefono,
            direccion: proveedor.getDireccion,
            correo: proveedor.getCorreo,
        });
    }

    // Método para eliminar un producto de Firebase
    static async delete(proveedor) {
        const ref = doc(FIRESTORE_DB, `Proveedor/${proveedor.getId}`);
        await deleteDoc(ref);
    }
}
  
export { ProveedorDAO }