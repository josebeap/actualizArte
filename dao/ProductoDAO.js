import { FIRESTORE_DB } from '../persistence/firebase/Firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { Producto } from "../models/ProductoModel";

class ProductoDAO {

    // Método para obtener una referencia a la colección "producto" en Firebase
    static getCollection() {
        return collection(FIRESTORE_DB, 'Producto');;
    }

    // Método para obtener un producto por el id
    static async findById(Id) {
        const ref = doc(FIRESTORE_DB, `Producto/${Id}`);
        const documento = await getDoc(ref);
        const datos = documento.data()
        const producto = new Producto(documento.id, datos.nombre, datos.descripcion, 
            datos.imagen, datos.categoria, datos.precio, datos.cantidadStock);
        producto.setCantidadVendidaTotal(datos.cantidadVendidaTotal);
        producto.setVendidoUltimoTrimestre(datos.vendidoUltimoTrimestre);
        return producto;
    }

    // Método para obtener un producto por el nombre
    static async findByName(nombre) {
        const ref = collection(FIRESTORE_DB, 'Producto');
        const q = query(ref, where('nombre', '==', `${nombre}`));
        const idProducto = false;
        
        return await new Promise((resolve, reject) => {
            getDocs(q).then((querySnapshot) => {
                if(!querySnapshot.empty){
                    const doc = querySnapshot.docs[0];
                    resolve(doc.id);
                } else {
                    resolve(null);
                }
            }).catch((error) => {
                reject(error);
            });
        })
    }

    // Método para insertar un producto en Firebase
    static async insert(producto) {
        console.log(producto.getNombre);
        const docRef = await addDoc(collection(FIRESTORE_DB, 'Producto'), {
            nombre: producto.getNombre,
            descripcion: producto.getDescripcion,
            imagen: producto.getImagen,
            categoria: producto.getCategoria,
            precio: producto.getPrecio,
            cantidadStock: producto.getCantidadStock,
            materiaPrimaList: producto.getMateriaPrimaList
        });
        const newProducto = new Producto(docRef.id, 
            producto.getNombre.nombre,
            producto.getDescripcion.descripcion,
            producto.getImagen.imagen,
            producto.getCategoria.categoria,
            producto.getPrecio.precio,
            producto.getCantidadStock.cantidadStock);
        
        const listaMatPrimas = producto.getMateriaPrimaList;
        listaMatPrimas.forEach(matPrima => {
            newProducto.addMateriaPrima(matPrima) 
        });
        return newProducto;
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
            cantidadStock: producto.getCantidadStock,
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