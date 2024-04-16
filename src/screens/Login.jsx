import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, useEffect } from "react-native";
import axios from "axios";
import BatLogo from "../../assets/logo.png";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation, Cadastro }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  

  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.18.12:8080/cadastro/login', {
        email: email,
        senha: senha,
      });
      if (response.status === 200) {
        const clienteId = response.data.clienteId;
        AsyncStorage.setItem('clienteId', String(clienteId));
        console.log(clienteId);
        navigation.navigate('Home', { clienteId: clienteId });

      }
    } catch (error) {
      setError("Email ou senha incorretos."); 
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={BatLogo} style={styles.logo} />
        </View>
        <Text style={styles.title}>BEM VINDO(A)</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          textContentType="emailAddress"
          style={styles.input}
          placeholder='Email'
        />
        <TextInput
          onChangeText={setSenha}
          value={senha}
          style={styles.input}
          placeholder='Senha'
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <Text style={{textAlign: 'center', verticalAlign: 'bottom' , margin:18}}
              onPress={() =>
          navigation.navigate('Cadastro', {Cadastro : Cadastro})}>Cadastrar</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
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
  logoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 60,
    paddingTop: 20,
    paddingBottom: 5,
  },
  logo: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 42,
    marginVertical: 10,
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 80,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Login;