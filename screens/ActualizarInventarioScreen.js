import  React, { useState, useEffect} from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { onSnapshot } from "firebase/firestore";
import { MateriaPrimaDAO } from "../dao/MateriaPrimaDAO";
import { Producto } from "../models/ProductoModel";
import { ProductoDAO } from "../dao/ProductoDAO";
import { MateriaPrima } from "../models/MateriaPrimaModel";
import { AntDesign } from '@expo/vector-icons'; 


const ActualizarInventarioScreen = () => {

    const [materiasP, setMateriasP] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cantStock, setCantStock] = useState('');

    useEffect(() => {
        const materiaPRef = MateriaPrimaDAO.getCollection();
        const subs = onSnapshot(materiaPRef, {
            next: (snapshot) => {
                const materiasP = [];
                snapshot.forEach((doc) => {
                    const materiaPrim = new MateriaPrima(doc.id, doc.data().nombre,
                        doc.data().precio, doc.data().cantidadStock);
                    materiaPrim => materiaPrim.setCantidadUsadaTotal(doc.data().cantidadUsadaTotal);
                    materiaPrim => materiaPrim.setUsadaUltimoTrimestre(doc.data().usadaUltimoTrimestre);
                    materiasP.push(materiaPrim);
                });
                setMateriasP(materiasP);
            }
        });

        const productoRef = ProductoDAO.getCollection();
        const subsProducto = onSnapshot(productoRef, {
            next: (snapshot) => {
                const productos = [];
                snapshot.forEach((doc)=>{
                    const productoSnap = new Producto (doc.id, doc.data().nombre, doc.data().descripcion, 
                            doc.data().imagen, doc.data().categoria, doc.data().precio, 
                            doc.data().cantidadStock);
                    productoSnap => productoSnap.setCantidadVendidaTotal(doc.data().cantidadVendidaTotal);
                    productoSnap => productoSnap.setVendidoUltimoTrimestre(doc.data().vendidoUltimoTrimestre);
                    productos.push(productoSnap);
                });
                setProductos(productos);
            }
        });
        return () => {subs(), subsProducto()};
    }, []);

    const handleUpdateMateria = async materia => {
        await MateriaPrimaDAO.update(materia);
        const index = materiasP.findIndex(matp => matp.id === materia.id);
        setMateriasP([...materiasP.slice(0, index), materia, ...materiasP.slice(index + 1)]);
    };

    const handleUpdateProducto = async producto => {
        await ProductoDAO.update(producto);
        const index = productos.findIndex(prod => prod.id === producto.id);
        setProductos([...productos.slice(0, index), producto, ...productos.slice(index + 1)]);
    };

    return (
        <ScrollView style={styles.container}>
            <Text>Lista de Productos:</Text>
            {productos.map((producto) => ( 
                <View key={producto.getId} style={styles.view}>
                    <Text><strong>Nombre:</strong> {producto.getNombre}</Text>
                    <Text><strong>Descripción:</strong> {producto.getDescripcion}</Text>
                    <Text><strong>Precio:</strong> {producto.getPrecio}</Text>
                    <Text><strong>Stock:</strong> {producto.getCantidadStock}</Text>
                    
                    <AntDesign name="pluscircle" size={24} color="black" 
                        onPress={() => handleUpdateProducto( new Producto(producto.getId, 
                            producto.getNombre, producto.getDescripcion, producto.getImagen, 
                            producto.getCategoria, producto.getPrecio, 
                            Number.parseInt(producto.getCantidadStock) + Number.parseInt(cantStock.cantStock) ))}/>

                    <TextInput placeholder="Cantidad" defaultValue="1"
                        onChangeText={(value) => setCantStock({cantStock: value})}/>
                    
                    <AntDesign name="minuscircle" size={24} color="black" onPress={() => 
                        handleUpdateProducto( new Producto 
                            (producto.getId, producto.getNombre, producto.getDescripcion, 
                            producto.getImagen, producto.getCategoria, producto.getPrecio, 
                            Number.parseInt(producto.getCantidadStock) - Number.parseInt(cantStock.cantStock)))}/> 
                </View>
            ))}

            <Text>Lista de Materias Primas:</Text>
            {materiasP.map(materia => ( 
                <View key={materia.getId} style={styles.view}>
                    <Text><strong>Nombre:</strong> {materia.getNombre}</Text>
                    <Text><strong>Precio:</strong> {materia.getPrecio}</Text>
                    <Text><strong>Stock:</strong> {materia.getCantidadStock}</Text>
                    <AntDesign name="pluscircle" size={24} color="black" onPress={() => 
                        handleUpdateMateria(new MateriaPrima(materia.getId, materia.getNombre, 
                            materia.getPrecio, Number.parseFloat(materia.getCantidadStock + 
                            Number.parseInt(cantStock.cantStock))))} />

                    <TextInput placeholder="Cantidad" 
                        onChangeText={(value) => setCantStock({cantStock: value})}/>

                    <AntDesign name="minuscircle" size={24} color="black" onPress={() => 
                        handleUpdateMateria(new MateriaPrima(materia.getId, materia.getNombre,
                            materia.getPrecio, Number.parseFloat(materia.getCantidadStock) - 
                            Number.parseInt(cantStock.cantStock)))}/>            
                    
                </View>                
            ))}

        </ScrollView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },

    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },

    view: {
        flex: 1,
        paddingBottom: 20,
        paddingLeft: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})
    

export {ActualizarInventarioScreen}


