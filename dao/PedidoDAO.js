import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Pedido } from "../models/PedidoModel";

class PedidoDAO {

    // Método para obtener una referencia a la colección "pedido" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Pedido');;
    }

    // Método para obtener un pedido por el id
    static async findById(Id) {
        const ref = doc(FIRESTORE_DB, `Pedido/${Id}`);
        const documento = await getDoc(ref);
        const datos = documento.data()
        const pedido = new Pedido(documento.id, datos.codigo, datos.fecha, datos.proveedor);
        pedido.setPrecioTotal(datos.precioTotal);
        //materiasPrimaList.forEach(matPri => pedido.addMateriaPrima(matPri))
        return pedido;
    }

    // Método para insertar un pedido en Firebase
    static async insert(pedido) {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'Pedido'), {
            nombre: pedido.getNombre.nombre,
            fecha: pedido.getFecha.fecha,
            proovedor: pedido.getProovedor.proovedor,
            precioTotal: pedido.getPrecioTotal.precioTotal,
        });
        return new Pedido(docRef.id, 
            pedido.getNombre.nombre,
            pedido.getFecha.fecha,
            pedido.getProovedor.proovedor,
            pedido.getPrecioTotal.precioTotal);
    }

    // Método para actualizar un pedido en Firebase
    static async update(pedido) {
        const ref = doc(FIRESTORE_DB, `Pedido/${pedido.getId}`);
        await updateDoc(ref, {
            nombre: pedido.getNombre,
            fecha: pedido.getFecha,
            proovedor: pedido.getProovedor,
            precioTotal: pedido.getPrecioTotal
        });
    }

    // Método para eliminar un pedido de Firebase
    static async delete(pedido) {
        const ref = doc(FIRESTORE_DB, `Pedido/${pedido.getId}`);
        await deleteDoc(ref);
    }
}
  
export { PedidoDAO }