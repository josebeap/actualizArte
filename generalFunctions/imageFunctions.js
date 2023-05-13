import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { STORAGE } from "../persistence/firebase/Firebase";

class imageFunctions {
    
    static pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });
        const source = {uri: result.assets[0].uri};
        return source;
    }

    static uploadImage = async (image, filename) => {
        if (image == null) {
            console.log('No se ha seleccionado ninguna imagen');
            return Alert.alert('No se ha seleccionado ninguna imagen')
        }

        const response = await fetch(image.uri);
        const blob = await response.blob();
        var storageRef = ref(STORAGE, filename);
        uploadBytes(storageRef, blob).then((snapshot) => {
            console.log('Imagen Subida!');
        })

        try {
            await ref;
        } catch (e) {
            console.log(e);
        }
        Alert.alert(
            'Imagen subida..!!'
        );
    }

    static getImage = (fileName) => {
        return getDownloadURL(ref(STORAGE, fileName)).then((url) => {
            return url;
        }).catch((error) => {
            console.log(error);
        });
    }
} 

export { imageFunctions }