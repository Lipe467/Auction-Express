import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button, ScrollView } from "react-native";
import axios from "axios";
import { IP_API } from "../config/config";
import logoAuction from "../../assets/logoAuction.png";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Adicione esta linha

const Produto = ({ navigation }) => { // Remova o route, pois você não está mais recebendo clienteId dessa forma
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localOrigemEstado, setLocalOrigemEstado] = useState("");
  const [localOrigemCidade, setLocalOrigemCidade] = useState("");
  const [destinoEstado, setDestinoEstado] = useState("");
  const [destinoCidade, setDestinoCidade] = useState("");
  const [image, setImage] = useState("");
  const [base64Image, setBase64Image] = useState("");

  // Recuperando o clienteId do AsyncStorage
  const loadClientId = async () => {
    try {
      const clientId = await AsyncStorage.getItem('clienteId');
      return clientId;
    } catch (error) {
      console.error(error);
    }
  };

  const cadastrarProduto = async () => {
    try {
      const clienteId = await loadClientId(); // Carregando o clienteId do AsyncStorage

      const response = await axios.post(`${IP_API}/postarProduto`, {
        nomeProduto: nome,
        descricao: descricao,
        localOrigemEstado: localOrigemEstado,
        localOrigemCidade: localOrigemCidade,
        destinoEstado: destinoEstado,
        destinoCidade: destinoCidade,
        foto: base64Image,
        cliente: { id: clienteId }
      });
      console.log(response.data);
      navigation.navigate('Home');

    } catch (error) {
      console.error(error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);

      try {
        let base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setBase64Image(base64Image);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer} />
        <Button title="Selecionar Imagem" onPress={pickImage} style={styles.buttonContainer} />
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Text style={styles.title}>PUBLICAR PRODUTO</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome Produto"
          onChangeText={text => setNome(text)}
        />
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
      </ScrollView>
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
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    textAlign: "center",
    fontSize: 20,
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
  }, 
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 10,
  },
  logoContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 60,
    paddingTop: 25,
    paddingBottom: 5,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});

export default Produto;
