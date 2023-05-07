import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import { imageFunctions } from "../generalFunctions/imageFunctions";

const AgregarManualidadScreen = () => {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState('');
    
    const handlePickImage = async () => {
        const img = await imageFunctions.pickImage();
        setImage(img)
    }
    
    const handleUploadImage = async () => {
        setUploading(true);
        await imageFunctions.uploadImage(image);
        setUploading(false);
        setImage(null);
    };

    const handleGetImage = async (fileName) => {
        const img = await imageFunctions.getImage(fileName);
        setUrl(img);
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={handlePickImage}>
                <Text style={styles.buttonText}>
                    Seleccionar Imagen
                </Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {image && <Image source={{uri: image.uri}} style={{ width: 150, height: 150}}/>}
                <TouchableOpacity style={styles.uploadButton} onPress={handleUploadImage}>
                    <Text style={styles.buttonText}>
                        Subir Imagen
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={{uri: url}} style={{ width: 150, height: 150}}/>
                <TouchableOpacity style={styles.uploadButton} onPress={() => handleGetImage('Z')}>
                    <Text style={styles.buttonText}>
                        Obtener Imagen
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export { AgregarManualidadScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: '#000',
        justifyContent: 'center'
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