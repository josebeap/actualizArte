import { StyleSheet } from "react-native";
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator  } from "@react-navigation/native-stack";
import { TailwindProvider } from 'tailwindcss-react-native';
import { RecursoScreen } from "./screens/recursoScreen";
import { ProductoScreen } from "./screens/productoScreen";
import { CategoriaScreen } from "./screens/categoriaScreen";
import { VentaScreen } from "./screens/ventaScreen";
import { FinanzasScreen } from "./screens/finanzaScreen";
import { Home } from "./screens/Home";
import { ActualizarInventarioScreen } from "./screens/ActualizarInventarioScreen";
import { AgregarManualidadScreen } from "./screens/AgregarManualidadScreen" 
import NotificacionScreen from "./screens/notificacionScreen";
import { elementosInvenDisponible } from "./screens/elementosInventarioDispScreen";

const Stack = createNativeStackNavigator();

function ActualizArteStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name='Home' component={Home} />
      
      <Stack.Screen name= 'ElementosconInventario' component={elementosInvenDisponible}/>

      <Stack.Screen name='Categoria' component={CategoriaScreen} />
      <Stack.Screen name='Recurso' component={RecursoScreen} />
      <Stack.Screen name="AgregarManualidad" component={AgregarManualidadScreen} />
      <Stack.Screen name='Producto' component={ProductoScreen} />
      <Stack.Screen name='Venta' component={VentaScreen} />
      <Stack.Screen name='Notificacion' component={NotificacionScreen} />
      <Stack.Screen name='Finanzas' component={FinanzasScreen} />
      <Stack.Screen name="ActualizarInventario" component={ActualizarInventarioScreen} />
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <TailwindProvider>
    <NavigationContainer>
      <ActualizArteStack />
    </NavigationContainer>
    </TailwindProvider>
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
