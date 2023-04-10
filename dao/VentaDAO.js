import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Venta } from "../models/VentaModel";

class VentaDAO {

    // Método para obtener una referencia a la colección "venta" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Venta');;
    }

    // Método para obtener los ventas filtradas por codigo
    static async findBycode(codeVen) {
        const snapshot = await getDocs(collection(FIRESTORE_DB, 'Venta'));
        const ventas = [];
        snapshot.forEach(doc => {
            const {codigo, fecha, cliente, precioTotal, productosList} = doc.data();
            if (codigo == codeVen){
                const venta = new Venta(doc.id, codigo, fecha, cliente);
                venta.setPrecioTotal(precioTotal);
                productosList.forEach(matPri => venta.addProducto(matPri))
                ventas.push(venta);
            }
        });
        return ventas;
    }

    // Método para insertar un venta en Firebase
    static async insert(venta) {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'Venta'), {
            nombre: venta.getNombre.nombre,
            fecha: venta.getFecha.fecha,
            cliente: venta.getCliente.cliente,
            precioTotal: venta.getPrecioTotal.precioTotal,
        });
        return new Venta(docRef.id, 
            venta.getNombre.nombre,
            venta.getFecha.fecha,
            venta.getCliente.cliente,
            venta.getPrecioTotal.precioTotal);
    }

    // Método para actualizar un venta en Firebase
    static async update(venta) {
        const ref = doc(FIRESTORE_DB, `Venta/${venta.getId}`);
        await updateDoc(ref, {
            nombre: venta.getNombre,
            fecha: venta.getFecha,
            cliente: venta.getCliente,
            precioTotal: venta.getPrecioTotal
        });
    }

    // Método para eliminar un venta de Firebase
    static async delete(venta) {
        const ref = doc(FIRESTORE_DB, `Venta/${venta.getId}`);
        await deleteDoc(ref);
    }
}
  
export { VentaDAO }