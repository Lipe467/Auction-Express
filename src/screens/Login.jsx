import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import axios from "axios";
import logoAuction from "../../assets/logoAuction.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Entypo'
import Icons from 'react-native-vector-icons/Fontisto'
import { IP_API } from "../config/config";

const Login = ({ navigation, Cadastro }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  
  const handleLogin = async () => {
    try {
      const response = await axios.post(`${IP_API}/cadastro/login`, {
        email: email,
        senha: senha,
      });
      if (response.status === 200) {
        const clienteId = response.data.clienteId;
        await AsyncStorage.setItem('clienteId', String(clienteId));
        setSenha("")
        setEmail("")
        navigation.navigate('Main', { screen: 'HomeTab', params: { screen: 'Home', params: { clienteId } } });
      }
    } catch (error) {
      setError("Email ou senha incorretos."); 
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image source={logoAuction} style={styles.logo} />
        </View>
        <Text style={styles.title}>BEM VINDO(A)</Text>
        <View>
        <TextInput
          onChangeText={setEmail}
          value={email}
          textContentType="emailAddress"
          style={styles.input}
          placeholder='Email'
        />
        <Icon style={styles.icon} name="mail" size={25}/>
        </View>
        <View>
        <TextInput
          onChangeText={setSenha}
          value={senha}
          style={styles.input}
          placeholder='Senha'
          secureTextEntry={true}
        />
        <Icons style={styles.icons} name="locked"  size={25}/>
        </View>
        
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.textCadastrar}
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
    backgroundColor: "#f5fafa",
  },
  logoContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 60,
    paddingTop: 25,
    paddingBottom: 5,
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 2,
    padding: 10,
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: '#ffff'
  },
  buttonContainer: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 80,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth:2,
    elevation: 5
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
  textCadastrar: {
    textAlign: 'center',
    verticalAlign: 'bottom' , 
    margin:18,
    fontSize: 18
  },
  icon: {
    position: 'absolute',
    paddingTop: 20,
    paddingLeft: 8,
    color: 'black'
  },
  icons: {
    position: 'absolute',
    paddingTop: 20,
    paddingLeft: 8,
    color: 'black'
  }
});

export default Login;
