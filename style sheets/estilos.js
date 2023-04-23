import { StyleSheet, Dimensions, Platform } from "react-native";

const windowWidth = Dimensions.get("window").width;

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
    width: "90%",
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
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    maxWidth: 400,
  },
  buttonText: {
    color: "white",
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
});

export default estilos;
