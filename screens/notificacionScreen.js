import React from "react";
import { View, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Notifications.scheduleNotificationAsync({
  content: {
    title: "¡El producto X!",
    body: "Esta en desuso hace X meses, por favor revisar",
  },
  trigger: { seconds: 5 },
});



export default function notificacionScreen() {
  const showAlert = () => {
    Alert.alert(
      "Título de la alerta",
      "Contenido de la alerta",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Aceptar", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <Button title='Mostrar alerta' onPress={showAlert} />
    </View>
  );
}
