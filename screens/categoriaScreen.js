import  React, { useState, useEffect} from "react";
import { View, Text, TouchableOpacity, TextInput,  ScrollView,} from "react-native";
import { CategoriaDAO } from "../dao/CategoriaDAO";
import { Categoria } from "../models/CategoriaModel";
import { onSnapshot } from "firebase/firestore";
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
    };

    const handleUpdate = async categoria => {
        await CategoriaDAO.update(categoria);
        const index = categorias.findIndex(cat => cat.id === categoria.id);
        setcategorias([...categorias.slice(0, index), categoria, ...categorias.slice(index + 1)]);
        
    };

    const handleDelete = async categoria => {
        await CategoriaDAO.delete(categoria);
        setcategorias(categorias.filter(cat => cat.id !== categoria.id));
        
    };

    const handleFindById = async id => {
        console.log(await CategoriaDAO.findById(id));
        setIdentificador('');
    };

    return (
        <ScrollView style={estilos.containerScrollView}>
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

export { CategoriaScreen }