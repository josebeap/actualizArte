import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { MateriaPrima } from "../models/MateriaPrimaModel";

class MateriaPrimaDAO {

    // Método para obtener una referencia a la colección "materiaprima" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'MateriaPrima');;
    }

    // Método para obtener las categorias filtradas por nombre
    static async findByNombre(nombreMatPri) {
        const snapshot = await getDocs(collection(FIRESTORE_DB, 'MateriaPrima'));
        const materiasprima = [];
        snapshot.forEach(doc => {
            const {nombre, precio, cantidadStock, cantidadUsadaTotal, usadaUltimoTrimestre} = doc.data();
            if (nombre == nombreMatPri){
                const matPrima = new MateriaPrima(doc.id, nombre, precio, cantidadStock);
                matPrima.setCantidadVendidaTotal(cantidadUsadaTotal);
                matPrima.setVendidoUltimoTrimestre(usadaUltimoTrimestre);
                materiasprima.push(matPrima);
            }
        });
        return materiasprima;
    }

    // Método para insertar un materiaprima en Firebase
    static async insert(materiaprima) {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'MateriaPrima'), {
            nombre: materiaprima.getNombre.nombre,
            precio: materiaprima.getPrecio.precio,
            cantidadstock: materiaprima.getCantidadStock.cantidadstock
        });

        const matPrima = new MateriaPrima(docRef.id, 
            materiaprima.getNombre.nombre,
            materiaprima.getPrecio.precio,
            materiaprima.getCantidadStock.cantidadstock);
        return matPrima;
    }

    // Método para actualizar un materiaprima en Firebase
    static async update(materiaprima) {
        const ref = doc(FIRESTORE_DB, `MateriaPrima/${materiaprima.getId}`);
        await updateDoc(ref, {
            nombre: materiaprima.getNombre,
            precio: materiaprima.getPrecio,
            cantidadstock: materiaprima.getCantidadStock,
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