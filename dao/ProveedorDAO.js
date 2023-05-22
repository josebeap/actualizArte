import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc,  updateDoc } from "firebase/firestore";
import { Proveedor } from "../models/ProveedorModel";

class ProveedorDAO {

    // Método para obtener una referencia a la colección "proveedor" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Proveedor');;
    }

    // Método para obtener un proveedor por el id
    static async findById(Id) {
        const ref = doc(FIRESTORE_DB, `Proveedor/${Id}`);
        const documento = await getDoc(ref);
        const datos = documento.data()
        const proveedor = new Proveedor(documento.id, datos.nit, datos.nombre, 
            datos.telefono, datos.direccion, datos.correo);
        return proveedor;
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