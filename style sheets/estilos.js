import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;

const estilos = StyleSheet.create({
  
  botonHome:{
    color:"#eabf7b",
    backgroundColor: "#eabf7b",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
 
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#f2e1c6",
    padding:35,
    width: '100%',
  },
  containerCheck: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#f2e1c6",
    padding:10,
    width: '100%',
  },
  check:{
    alignItems: 'center',
    padding:10
  },
  picker:{
    flex: 1,
    backgroundColor: "#f2e1c6",
    padding:10,
    marginBottom:10
  },
  containerOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding:10,
    marginBottom: 20,
    paddingHorizontal:10,
    width: "100%",
    justifyContent: 'space-between',
  },
  containerAccionesEnListas:{
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    width:'35%',
    

    
  },
  containerScrollView: {
    flex: 1,
    padding: 35,
    backgroundColor:"#f2e1c6",
},
  botonesEnListas:{
    flexDirection: "row",
    alignItems: "baseline",
    backgroundColor: 'grey',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  title: {
    fontSize: windowWidth / 15,
    fontWeight: "bold",
    marginBottom: 20,
    ...Platform.select({
      ios: {
        color: "blue",
      },
      android: {
        color: "green",
      },
    }),
  },
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    textAlign: 'center',
    marginBottom: 20,
    
      
  
  },
  
  botonesAgregarQuitar:{

  },
  inputCantidades: {
    height: "25%",
    width: "25%",
    alignItems: 'center',
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    padding: 2,
  },
  button: {
    color:"gray",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    maxWidth: 400,
  },
  buttonText: {
    color: "BLACK",
    fontWeight: "bold",
    textAlign: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  form: {
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textItems: {
    fontSize: 22,
  },
  view: {
    backgroundColor:"#f4c67f",
    flex: 1,
    paddingBottom: 20,
    paddingLeft: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default estilos;