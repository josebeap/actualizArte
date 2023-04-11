import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Pedido } from "../models/PedidoModel";

class PedidoDAO {

    // Método para obtener una referencia a la colección "pedido" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Pedido');;
    }

    // Método para obtener los pedidos filtradas por codigo
    static async findBycode(codePed) {
        const snapshot = await getDocs(collection(FIRESTORE_DB, 'Pedido'));
        const pedidos = [];
        snapshot.forEach(doc => {
            const {codigo, fecha, proveedor, precioTotal, materiasPrimaList} = doc.data();
            if (codigo == codePed){
                const pedido = new Pedido(doc.id, codigo, fecha, proveedor);
                pedido.setPrecioTotal(precioTotal);
                materiasPrimaList.forEach(matPri => pedido.addProducto(matPri))
                pedidos.push(pedido);
            }
        });
        return pedidos;
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