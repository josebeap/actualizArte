import { View, Text, Button, StyleSheet, Modal, TextInput,
     Picker, TouchableOpacity, Image, ScrollView, CheckBox, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { imageFunctions } from "../generalFunctions/imageFunctions";
import { CategoriaDAO } from "../dao/CategoriaDAO";
import { onSnapshot } from "firebase/firestore";
import { Categoria } from "../models/CategoriaModel";
import { Producto } from "../models/ProductoModel";
import { ProductoDAO } from "../dao/ProductoDAO";
import { MateriaPrimaDAO } from "../dao/MateriaPrimaDAO";
import { MateriaPrima } from "../models/MateriaPrimaModel";

const AgregarManualidadScreen = () => {

    const [manualidad, setManualidad] = useState({
        nombre: '',
        descripcion: '',
        categoria: '',
        precio: '',
        cantidadStock: ''
    });
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [materiasPrimas, setMateriasPrimas] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);

    useEffect(() => {
        const categoriaRef = CategoriaDAO.getCollection();
        const materiaPrimaRef = MateriaPrimaDAO.getCollection();

        const subCategorias = onSnapshot(categoriaRef, {
            next: (snapshot) => {
                const categorias = [];
                snapshot.forEach((doc) => {
                    const categoria = new Categoria(
                        doc.id,
                        doc.data().nombre
                    );
                    categorias.push(categoria);
                    
                });

                setCategorias(categorias);
            }
        });

        const subMateriasPrimas = onSnapshot(materiaPrimaRef, {
            next: (snapshot) => {
                const materiasPrimas = [];
                snapshot.forEach((doc) => {
                    const materiaPrima = new MateriaPrima(
                        doc.id,
                        doc.data().nombre,
                        doc.data().cantidadStock,
                        doc.data().precio
                    );
                    materiasPrimas.push({obj: materiaPrima, seleccionado: false});
                });
                setMateriasPrimas(materiasPrimas);
            }
        });

        return () => { subCategorias(), subMateriasPrimas() }
    }, []);
    
    const handleChangeText = (attribute, value) => {
        setManualidad({ ...manualidad, [attribute]: value})
    }

    const handlePickImage = async () => {
        const img = await imageFunctions.pickImage();
        setImage(img)
    };
    
    const handleInsert = async () => {
        const nuevoProducto = await ProductoDAO.findByName(manualidad.nombre);
        if (!nuevoProducto){
            const filename = manualidad.nombre + "%" + manualidad.categoria + "%" + manualidad.descripcion;

            const producto = new Producto(null, manualidad.nombre, manualidad.descripcion, filename, 
                manualidad.categoria, manualidad.precio, manualidad.cantidadStock);
            
            seleccionados.forEach(matPrima => {
                producto.addMateriaPrima(matPrima.obj.getId)
            });
            
            const registro = await ProductoDAO.insert(producto);
            if (registro) {
                setUploading(true);
                await imageFunctions.uploadImage(image, filename);
                setUploading(false);
                setImage(null);
            } 
            
        } else {
            Alert.alert('Manualidad Existente', `La manualidad con nombre ${manualidad.nombre} ya existe`)
        }
    };

    const handleSelection = (id) => {
        const listaActualizada = materiasPrimas.map((matPrima) => {
            if( matPrima.obj.getId === id) {
                return {
                    obj: matPrima.obj,
                    seleccionado: !matPrima.seleccionado
                };
            } else {
                return matPrima;
            };
        });
        setMateriasPrimas(listaActualizada); 

        const seleccionadosActuales = listaActualizada.filter((matPrima) => matPrima.seleccionado);
        setSeleccionados(seleccionadosActuales);
    }
          
    return (
        <ScrollView style={styles.container}>
            <View style={styles.container}>
            
                <TextInput placeholder="Nombre" inputMode="text"
                    onChangeText={(value) => handleChangeText("nombre", value)} />

                <TextInput placeholder="Descripción" inputMode="text"
                    onChangeText={(value) => handleChangeText("descripcion", value)} />

                <TextInput placeholder="Precio" inputMode="decimal"
                    onChangeText={(value) => handleChangeText("precio", value)} />

                <TextInput placeholder="Cantidad" inputMode="numeric"
                    onChangeText={(value) => handleChangeText("cantidadStock", value)} />

                <Picker  
                    onValueChange={(value) => {handleChangeText("categoria", value)}}>
                    <Picker.Item label={"Categoría"} />
                    {categorias.map((categoria) => (
                        <Picker.Item key={categoria.getId} label={categoria.getNombre} value={categoria.getId} />
                    ))}
                </Picker>

                <TouchableOpacity style={styles.selectButton} onPress={handlePickImage}>
                    <Text style={styles.buttonText}>
                        Seleccionar Imagen
                    </Text>
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    {image && <Image source={{uri: image.uri}} style={{ width: 150, height: 150}}/>}
                </View>
        
                <Button title="Abrir modal" onPress={() => setModalVisible(true)} />

                <Modal animationType="slide" transparent={false} visible={modalVisible} 
                    onRequestClose={() => setModalVisible(false)} >
                    
                    {materiasPrimas.map((matPrima) => (
                        <View key={"v" + matPrima.obj.getId}>
                            <CheckBox key={"c" + matPrima.obj.getId} value={matPrima.seleccionado}
                            onValueChange={() => handleSelection(matPrima.obj.getId)} />
                            <Text key={"t" + matPrima.obj.getId}>{matPrima.obj.getNombre}</Text>
                        </View>
                        
                    ))}
                    <Button title="Cerrar modal" 
                        onPress={() => setModalVisible(false)}
                    />
                
                </Modal>

                <Button title="Agregar" onPress={handleInsert} />

            </View>
        </ScrollView>
    )
}

export { AgregarManualidadScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#FFF'
    },
    selectButton:{
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: 'blue',
        alignItems:'center',
        justifyContent: 'center'
    },
    uploadButton:{
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: 'green',
        alignItems:'center',
        justifyContent: 'center'
    },
    buttonText:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    imageContainer:{
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    }
});