import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";

import { useEffect } from "react";

const Produto = ({ navigation, route }) => {
  const [descricao, setDescricao] = useState("");
  const [localOrigemEstado, setLocalOrigemEstado] = useState("");
  const [localOrigemCidade, setLocalOrigemCidade] = useState("");
  const [destinoEstado, setDestinoEstado] = useState("");
  const [destinoCidade, setDestinoCidade] = useState("");
  const clienteId = route.params?.clienteId;



  const cadastrarProduto = async () => {
    try {
      
      const response = await axios.post('http://192.168.18.12:8080/postarProduto', {
        descricao: descricao,
        localOrigemEstado: localOrigemEstado,
        localOrigemCidade: localOrigemCidade,
        destinoEstado: destinoEstado,
        destinoCidade: destinoCidade,
        cliente: { id: clienteId }
        
     
      });
      console.log(response.data);
      navigation.navigate('Home',  { clienteId: clienteId });
    } catch (error) {
      console.error(error);
    }
  }; 
   useEffect(() => {
    console.log("clienteId Produto:", clienteId);
  }, [clienteId]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Postar Produto</Text>
      <TextInput
        style={styles.inputDescricao}
        placeholder="Descrição Produto"
        onChangeText={text => setDescricao(text)}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setLocalOrigemEstado(text)}
        placeholder="Estado Origem"
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade Origem"
        onChangeText={text => setLocalOrigemCidade(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado Destino"
        onChangeText={text => setDestinoEstado(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade Destino"
        onChangeText={text => setDestinoCidade(text)}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={cadastrarProduto}>
        <Text style={styles.buttonText}>Postar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  input: {
    height: 60,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  inputDescricao: {
    height: 120,
    borderWidth: 3,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 80,
    alignSelf: 'center',
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center"
  }
});

export default Produto;
