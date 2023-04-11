import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Cliente } from "../models/ClienteModel";

class ClienteDAO {

    // Método para obtener una referencia a la colección "cliente" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Cliente');;
    }

    // Método para obtener las categorias filtradas por nombre
    static async findByNombre(nombreCli) {
        const snapshot = await getDocs(collection(FIRESTORE_DB, 'Cliente'));
        const clientes = [];
        snapshot.forEach(doc => {
            const {cedula, nombre, telefono, direccion, correo} = doc.data();
            if (nombre == nombreCli){
                clientes.push(new Cliente(doc.id, cedula, nombre, telefono, direccion, correo));
            }
        });
        return clientes;
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