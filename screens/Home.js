import { Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import estilos from "../style sheets/estilos";

const Home = (props) => {
  const handleProps = (nombre) => {
    props.navigation.navigate(nombre);
  };
  return (
    <ScrollView style={styles.container}>

      <TouchableOpacity
      style={estilos.botonHome}
      onPress={() => handleProps("Venta")}
      >
        <Text style={estilos.buttonText}>VENTA</Text>
      </TouchableOpacity>
   
      <TouchableOpacity
      style={estilos.botonHome}
      onPress={() => handleProps("AgregarManualidad")}
      >
        <Text style={estilos.buttonText}>AGREGAR MANUALIDAD</Text>
      </TouchableOpacity>
 
      <TouchableOpacity
      style={estilos.botonHome}
      onPress={() => handleProps("Notificacion")} 
      >
        <Text style={estilos.buttonText}>NOTIFICACIÓN</Text>
      </TouchableOpacity>
   
      <TouchableOpacity
      style={estilos.botonHome}
      onPress={() => handleProps("Finanzas")}
      >
        <Text style={estilos.buttonText}>FINANZAS</Text>
      </TouchableOpacity>
   
      <TouchableOpacity
      style={estilos.botonHome}
      onPress={() => handleProps("InventarioDisponible")}
      >
        <Text style={estilos.buttonText}>ELEMENTOS INVENTARIO</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={estilos.botonHome}
      onPress={() => handleProps("ActualizarInventario")} 
      >
        <Text style={estilos.buttonText}>ACTUALIZAR INVENTARIO</Text>
      </TouchableOpacity>
  
    </ScrollView>
  );
};
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
    borderBottomColor: "#cccccc",
  }, 
  boton :{
    color:"red"
  }
  
});

export { Home };
