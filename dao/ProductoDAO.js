import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { Producto } from "../models/ProductoModel";

class ProductoDAO {

    // Método para obtener una referencia a la colección "producto" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Producto');;
    }

    // Método para obtener las categorias filtradas por nombre
    static async findByNombre(nombrePro) {
        const snapshot = await getDocs(collection(FIRESTORE_DB, 'Producto'));
        const productos = [];
        snapshot.forEach(doc => {
            const {nombre, descripcion, imagen, categoria, precio, cantidadStock, cantidadVendidaTotal, vendidoUltimoTrimestre} = doc.data();
            if (nombre == nombrePro){
                const producto = new Producto(doc.id, nombre, descripcion, imagen, categoria, precio, cantidadStock);
                producto.setCantidadVendidaTotal(cantidadVendidaTotal);
                producto.setVendidoUltimoTrimestre(vendidoUltimoTrimestre);
                productos.push(producto);
            }
        });
        return productos;
    }

    // Método para insertar un producto en Firebase
    static async insert(producto) {
        const docRef = await addDoc(collection(FIRESTORE_DB, 'Producto'), {
            nombre: producto.getNombre.nombre,
            descripcion: producto.getDescripcion.descripcion,
            imagen: producto.getImagen.imagen,
            categoria: producto.getCategoria.categoria,
            precio: producto.getPrecio.precio,
            cantidadstock: producto.getCantidadStock.cantidadstock
        });
        return new Producto(docRef.id, 
            producto.getNombre.nombre,
            producto.getDescripcion.descripcion,
            producto.getImagen.imagen,
            producto.getCategoria.categoria,
            producto.getPrecio.precio,
            producto.getCantidadStock.cantidadstock);
    }

    // Método para actualizar un producto en Firebase
    static async update(producto) {
        const ref = doc(FIRESTORE_DB, `Producto/${producto.getId}`);
        await updateDoc(ref, {
            nombre: producto.getNombre,
            descripcion: producto.getDescripcion,
            imagen: producto.getImagen,
            categoria: producto.getCategoria,
            precio: producto.getPrecio,
            cantidadstock: producto.getCantidadStock,
            cantidadVendidaTotal: producto.getCantidadVendidaTotal,
            vendidoUltimoTrimestre: producto.getVendidoUltimoTrimestre
        });
    }

    // Método para eliminar un producto de Firebase
    static async delete(producto) {
        const ref = doc(FIRESTORE_DB, `Producto/${producto.getId}`);
        await deleteDoc(ref);
    }
}
  
export { ProductoDAO }