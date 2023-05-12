import  React, { useState, useEffect} from "react";
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from "react-native";
import { CategoriaDAO } from "../dao/CategoriaDAO";
import { Categoria } from "../models/CategoriaModel";
import { onSnapshot } from "firebase/firestore";
import {
    TouchableOpacity,
  } from "react-native";
  import estilos from "../style sheets/estilos";

const CategoriaScreen = (props) => {

    const [categorias, setcategorias] = useState([]);
    const [nombre, setNombre] = useState('');
    const [identificador, setIdentificador] = useState('');

    useEffect(() => {
        const categoriaRef = CategoriaDAO.getCollection();
        const subs = onSnapshot(categoriaRef, {
            next: (snapshot) => {
                const categorias = [];
                snapshot.forEach((doc) => {
                    categorias.push(new Categoria(doc.id, doc.data().nombre))
                });
                setcategorias(categorias);
            }
        });
        return () => subs();
    }, []);

    const handleInsert = async () => {
        const categoria = new Categoria(null, nombre);
        const nuevocategoria = await CategoriaDAO.insert(categoria);
        setcategorias([...categorias, nuevocategoria]);
        setNombre('');
        //props.navigation.navigate('Categoria');
    };

    const handleUpdate = async categoria => {
        await CategoriaDAO.update(categoria);
        const index = categorias.findIndex(cat => cat.id === categoria.id);
        setcategorias([...categorias.slice(0, index), categoria, ...categorias.slice(index + 1)]);
        //props.navigation.navigate('Categoria');
    };

    const handleDelete = async categoria => {
        await CategoriaDAO.delete(categoria);
        setcategorias(categorias.filter(cat => cat.id !== categoria.id));
        //props.navigation.navigate('Categoria');
    };

    const handleFindById = async id => {
        console.log(await CategoriaDAO.findById(id));
        setIdentificador('');
        //props.navigation.navigate('Categoria');
    };

    return (
        <ScrollView style={styles.container}>
            <Text>Lista de Categorias:</Text>
            {categorias.map(categoria => ( 
                <View key={categoria.getId}>
                    <Text>{categoria.getId} - {categoria.getNombre}</Text>
                    <TextInput placeholder="Editar Nombre"
                        onChangeText={(value) => setNombre({nombre: value})}/>


                    

                    <TouchableOpacity
                        style={estilos.botonHome}
                        onPress={() => 
                            handleUpdate(new Categoria(categoria.getId, nombre.nombre))}
                        >
                        <Text style={estilos.buttonText}>EDITAR</Text>
                    </TouchableOpacity>


                    
                    <TouchableOpacity
                        style={estilos.botonHome}
                        onPress={() => handleDelete(categoria)}
                        >
                        <Text style={estilos.buttonText}>ELIMINAR</Text>
                    </TouchableOpacity>

                </View>            
            ))}

            <TextInput placeholder="Nombre" 
                onChangeText={(value) => setNombre({nombre: value})} />


             

            <TouchableOpacity
                        style={estilos.botonHome}
                        onPress={handleInsert} 
                        >
                        <Text style={estilos.buttonText}>AGREGAR</Text>
                    </TouchableOpacity>

            <TextInput placeholder="Buscar"
                onChangeText={(value) => setIdentificador({identificador: value})} />
            

            <TouchableOpacity
                        style={estilos.botonHome}
                        onPress={() => handleFindById(identificador.identificador)}
                        >
                        <Text style={estilos.buttonText}>BUSCAR</Text>
                    </TouchableOpacity>

        </ScrollView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
        backgroundColor:"#f2e1c6",
    },

    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
})

export { CategoriaScreen }