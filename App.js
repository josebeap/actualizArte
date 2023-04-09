import { StyleSheet } from "react-native";
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator  } from "@react-navigation/native-stack";

import { RecursoScreen } from "./screens/recursoScreen";
import { ProductoScreen } from "./screens/productoScreen";

const Stack = createNativeStackNavigator();

function ActualizArteStack(){
  return ( 
    <Stack.Navigator>
        <Stack.Screen name="Recurso" component={RecursoScreen} />
        <Stack.Screen name="Producto" component={ProductoScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <ActualizArteStack/>
    </NavigationContainer>
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
