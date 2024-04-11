import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import axios from "axios";
import RadioForm from "react-native-simple-radio-button";
import  BatLogo  from "../../assets/logo.png";

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [telefone, setTelefone]= useState("");
  const [dados, setDados] = useState({
    tipoUsuario: "",
    sexo: "",
  });

  const cadastrarUsuario = async () => {
    try {
      const response = await axios.post('http://192.168.18.12:8080/cadastro', {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        sexo: dados.sexo === 0 ? "Homem" : "Mulher",
        tipoUsuario: dados.tipoUsuario === 0 ? "Cliente" : "Entregador",
      });
      
      console.log(response.data);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      setError("Erro ao cadastrar usuário. Por favor, tente novamente.");
    }
  };

  const radio_props = [
    {label: 'Masculino', value: 0 },
    {label: 'Feminino', value: 1 },
  ];

  const radio_props2 = [
    {label: 'Cliente', value: 0 },
    {label: 'Entregador', value: 1 },
  ];

  const handleradio = (label) => {
    setDados({...dados, genero: label});
  };

  const handleradio2 = (label) => {
    setDados({...dados, tipoUsuario: label});
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Cadastro</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          onChangeText={text => setNome(text)}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setTelefone(text)}
          placeholder="Telefone"
        />

        <RadioForm
          radio_props={radio_props}
          initial={0}
          onPress={handleradio}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={text => setSenha(text)}
        />
        
        <RadioForm
          radio_props={radio_props2}
          initial={0}
          onPress={handleradio2}
        />
          { error &&  <Text style={styles.MenssagemErro}>Email e Senha devem ser obrigatórios</Text>}
        <TouchableOpacity style={styles.button} onPress={cadastrarUsuario}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Nav} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.Text}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
        <View>
           <Image source={BatLogo} style={styles.logo}/>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  Nav: {
    marginTop: 10,
    alignItems: "center",
  },
  Text: {
    color: "#007bff",
  },
  MenssagemErro: {
    color: "red",
    marginBottom: 10,
  },
  logo: {
    margin: 25,
    width: 125, 
    height: 125, 
    alignSelf: 'center', 
}
});

export default Cadastro;
