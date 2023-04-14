import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Cliente } from "../models/ClienteModel";

class ClienteDAO {

    // Método para obtener una referencia a la colección "cliente" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Cliente');;
    }

    // Método para obtener un cliente por el id
    static async findById(Id) {
        const ref = doc(FIRESTORE_DB, `Cliente/${Id}`);
        const documento = await getDoc(ref);
        const datos = documento.data()
        const cliente = new Cliente(documento.id, datos.cedula, 
            datos.nombre, datos.telefono, datos.direccion, datos.correo);
        return cliente;
    }

    // Método para insertar un producto en Firebase
    static async insert(cliente) {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'Cliente'), {
            cedula: cliente.getCedula.cedula,
            nombre: cliente.getNombre.nombre,
            telefono: cliente.getTelefono.telefono,
            direccion: cliente.getDireccion.direccion,
            correo: cliente.getCorreo.correo,
        });
        return new Cliente(docRef.id, 
            cliente.getCedula.cedula,
            cliente.getNombre.nombre,
            cliente.getTelefono.telefono,
            cliente.getDireccion.direccion,
            cliente.getCorreo.correo,);
    }

    // Método para actualizar un producto en Firebase
    static async update(cliente) {
        const ref = doc(FIRESTORE_DB, `Cliente/${cliente.getId}`);
        await updateDoc(ref, {
            cedula: cliente.getCedula,
            nombre: cliente.getNombre,
            telefono: cliente.getTelefono,
            direccion: cliente.getDireccion,
            correo: cliente.getCorreo,
        });
    }

    // Método para eliminar un producto de Firebase
    static async delete(cliente) {
        const ref = doc(FIRESTORE_DB, `Cliente/${cliente.getId}`);
        await deleteDoc(ref);
    }
}
  
export { ClienteDAO }