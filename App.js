import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hola Mundo Jose</Text>
      <Text>Hola aqui reportandose otro loco Att: Nicolas</Text>
      <Text>Sin mente como los locos Att: Miguel</Text>
      <Text>Hola, Buenas tardes, Cómo están? Att: Edwar Marin</Text>
      <text>Comentario de Jhohan Stiwar Giraldo</text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
