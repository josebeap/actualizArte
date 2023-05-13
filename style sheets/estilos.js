import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'grey',
    padding:10,
    width: '100%',
    

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
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    maxWidth: 400,
  },
  buttonText: {
    color: "red",
    fontWeight: "bold",
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
});

export default estilos;
