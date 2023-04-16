import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { MateriaPrima } from "../models/MateriaPrimaModel";

class MateriaPrimaDAO {

    // Método para obtener una referencia a la colección "materiaprima" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'MateriaPrima');;
    }

    // Método para obtener una materia prima por el id
    static async findById(Id) {
        const ref = doc(FIRESTORE_DB, `MateriaPrima/${Id}`);
        const documento = await getDoc(ref);
        const datos = documento.data()
        const matPrima = new MateriaPrima(documento.id, datos.nombre, datos.precio, datos.cantidadStock);
        matPrima.setCantidadVendidaTotal(datos.cantidadUsadaTotal);
        matPrima.setVendidoUltimoTrimestre(datos.usadaUltimoTrimestre);
        return matPrima;
    }

    // Método para insertar un materiaprima en Firebase
    static async insert(materiaprima) {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'MateriaPrima'), {
            nombre: materiaprima.getNombre.nombre,
            precio: materiaprima.getPrecio.precio,
            cantidadStock: materiaprima.getCantidadStock.cantidadStock
        });

        const matPrima = new MateriaPrima(docRef.id, 
            materiaprima.getNombre.nombre,
            materiaprima.getPrecio.precio,
            materiaprima.getCantidadStock.cantidadStock);
        return matPrima;
    }

    // Método para actualizar un materiaprima en Firebase
    static async update(materiaprima) {
        const ref = doc(FIRESTORE_DB, `MateriaPrima/${materiaprima.getId}`);
        await updateDoc(ref, {
            nombre: materiaprima.getNombre,
            precio: materiaprima.getPrecio,
            cantidadStock: materiaprima.getCantidadStock,
            cantidadUsadaTotal: materiaprima.getCantidadUsadaTotal,
            usadaUltimoTrimestre: materiaprima.getUsadaUltimoTrimestre,
        });
    }

    // Método para eliminar un materiaprima de Firebase
    static async delete(materiaprima) {
        const ref = doc(FIRESTORE_DB, `MateriaPrima/${materiaprima.getId}`);
        await deleteDoc(ref);
    }
}
  
export { MateriaPrimaDAO }