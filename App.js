import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

export default function App() {
  const [usuario, SetUsuario] = useState("");
  const [pass, SetPass] = useState("");

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE usuario (id	INTEGER, usuario	integer, pin	varchar ( 33 ), apellidos	varchar ( 100 ),nombres	varchar ( 100 ),e	varchar ( 1 ) DEFAULT 1,updated	TIMESTAMP,PRIMARY KEY(`id`))"
      );
    });
  }, []);

  const handleClick = () => {
    let query = `SELECT * FROM usuario WHERE usuario = '${usuario}' AND pin = '${pass}'`;
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (txObj, resultSet) => {
          alert(resultSet.rows._array);
        },
        (txObj, error) => alert(error)
      );
    });
  };

  const register = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("INSERT INTO usuario (1, '18422509', 'DCC18422', 'Zuniga', 'Aaron', '1', '1993-01-27')");
      },
      alert("error"),
      alert("agregado")
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("./assets/images/DBM2.0-2.png")} style={{ width: 300, height: 100 }} />
      </View>
      <View>
        <Text style={styles.title}>Iniciar sesión</Text>
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Usuario"
          onChangeText={(usuario) => SetUsuario(usuario)}
          value={usuario}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Contraseña."
          secureTextEntry={true}
          onChangeText={(password) => SetPass(password)}
          value={pass}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleClick}>
        <Text style={styles.loginText}>ENTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} onPress={register}>
        <Text style={styles.loginText}>REGISTRAR</Text>
      </TouchableOpacity>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#404040",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  title: {
    height: 50,
    color: "white",
  },
  inputView: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 1,
  },
  loginBtn: {
    width: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    backgroundColor: "#D02323",
  },
  loginText: {
    color: "white",
  },
});
