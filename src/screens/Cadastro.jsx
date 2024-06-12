import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import axios from "axios";
import RadioForm from "react-native-simple-radio-button";
import BatLogo from "../../assets/logo.png";
import IconUser from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/Entypo'
import Icons from 'react-native-vector-icons/Fontisto'
import { IP_API } from "../config/config";

// Substitua SEU_PROJECT_ID pelo ID do projeto Expo
const expoProjectId = "41bbf4ef-97a4-46ce-b5a2-de4caa907041";

const Cadastro = ({ navigation }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [sexo, setSexo] = useState(0);
  const [tipoUsuario, setTipoUsuario] = useState(0);
  const [error, setError] = useState("");
  const cadastrarUsuario = async () => {
    if (!nome || !email || !telefone || !senha) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    } else if (senha.length < 6) {
      setError("A senha deve conter pelo menos 6 caracteres.");
      return;
    } else if (!validarTelefone(telefone)) {
      setError("Por favor, insira um telefone válido.");
      return;
    } else if (!validarEmail(email)) {
      setError("Por favor insira um email válido. O email deve conter @gmail.com ou @hotmail.com");
      return;
    }

    try {
    
      const response = await axios.post(`${IP_API}/cadastro`, {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        sexo: sexo === 0 ? "Homem" : "Mulher",
        tipoUsuario: tipoUsuario === 0 ? "Cliente" : "Entregador",
        
      });
      alert("Cadastro Realizado com sucesso!");
      console.log(response.data);
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 500 && error.response.data.message === "E-mail já cadastrado") {
        setError("E-mail já cadastrado. Por favor, tente com outro e-mail.");
      } else {
        setError("Erro ao cadastrar usuário. Por favor, tente novamente.");
      }
    }
  };

  const validarTelefone = (telefone) => {
    var validTelefone = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
    return validTelefone.test(telefone);
  };

  const validarEmail = (email) => {
    var validEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    return validEmail.test(email);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Cadastro</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            onChangeText={text => setNome(text)}
          />
          <IconUser style={styles.icon} name="user" size={25} />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={text => setTelefone(text)}
            placeholder="(99) 99999-9999"
            keyboardType="numeric"
          />
          <IconUser style={styles.icon} name="phone" size={25} />
        </View>
        <RadioForm
          radio_props={[
            { label: 'Homem', value: 0 },
            { label: 'Mulher', value: 1 },
          ]}
          onPress={value => setSexo(value)}
          labelStyle={styles.fontTextRadio}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
          />
          <Icon style={styles.icon} name="mail" size={25} />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            onChangeText={text => setSenha(text)}
          />
           <Icons style={styles.icon} name="locked"  size={25}/>
        </View>
        <RadioForm
          radio_props={[
            { label: 'Cliente', value: 0 },
            { label: 'Entregador', value: 1 },
          ]}
          onPress={value => setTipoUsuario(value)}
          labelStyle={styles.fontTextRadio}
        />
        {error && <Text style={styles.MenssagemdeValidacao}>{error}</Text>}
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
    backgroundColor: "#f5fafa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 48,
    backgroundColor: '#ffff',
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 16,
    textAlign: 'center'
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
    fontSize: 20
  },
  Nav: {
    marginTop: 10,
    alignItems: "center",
  },
  Text: {
    color: "#007bff",
    fontSize: 16
  },
  MenssagemdeValidacao: {
    color: "red",
    marginBottom: 10,
  },
  logo: {
    margin: 25,
    width: 125, 
    height: 125, 
    alignSelf: 'center', 
  },
  fontTextRadio: {
    fontSize: 16,
    
  }, 
  icon: {
    position: 'absolute',
    paddingTop: 10,
    paddingLeft: 8,
    color: 'black'
  },
});

export default Cadastro;
