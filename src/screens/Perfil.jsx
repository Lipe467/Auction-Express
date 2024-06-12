import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Fontisto';
import { IP_API } from "../config/config";

const Perfil = ({ navigation }) => {
  const [perfil, setPerfil] = useState({});
  const [valorNome, setValorNome] = useState("");
  const [valorTelefone, setValorTelefone] = useState("");
  const [sexo, setSexo] = useState(0);
  const [email, setEmail] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(0);
  const [senha, setSenha] = useState(""); // Campo de senha opcional
  const [error, setError] = useState("");

  const loadClientId = async () => {
    try {
      const clientId = await AsyncStorage.getItem('clienteId');
      return clientId;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPerfil = async () => {
    try {
      const clienteId = await loadClientId();
      const response = await axios.get(`${IP_API}/cadastro/${clienteId}`);
      const perfilData = response.data;
      setPerfil(perfilData);
      setValorNome(perfilData.nome);
      setValorTelefone(perfilData.telefone);
      setEmail(perfilData.email);
      setSexo(perfilData.sexo === "Homem" ? 0 : 1);
      setTipoUsuario(perfilData.tipoUsuario === "Cliente" ? 0 : 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPerfil();
  }, []);

  const validarTelefone = (telefone) => {
    var validTelefone = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$');
    return validTelefone.test(telefone);
  };

  const validarEmail = (email) => {
    var validEmail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w\w+)+$/;
    return validEmail.test(email);
  };

  const handlePut = async () => {
    try {
      const clientId = await loadClientId();
      if (!clientId) {
        setError("Erro: ID do cliente não encontrado.");
        return;
      }
  
      if (!valorNome || !valorTelefone || !email) {
        setError("Por favor, preencha todos os campos obrigatórios.");
        return;
      } else if (!validarTelefone(valorTelefone)) {
        setError("Por favor, insira um telefone válido.");
        return;
      } else if (!validarEmail(email)) {
        setError("Por favor insira um email válido.");
        return;
      }
  
      const response = await axios.put(`${IP_API}/cadastro/${clientId}`, {
        nome: valorNome,
        telefone: valorTelefone,
        email: email,
        sexo: sexo === 0 ? "Homem" : "Mulher",
        tipoUsuario: tipoUsuario === 0 ? "Cliente" : "Entregador",
        senha: senha, // Inclua a senha se ela estiver sendo atualizada
      });
  
      if (response.status === 200) {
        fetchPerfil(); // Atualiza o perfil após a edição
        setError("Dados atualizados com sucesso.");
      }
    } catch (error) {
      setError("Erro ao atualizar o perfil");
    }
  };

  const handleDelete = async () => {
    try {
      const clientId = await loadClientId();
      if (!clientId) {
        setError("Erro: ID do cliente não encontrado.");
        return;
      }

      const response = await axios.delete(`${IP_API}/cadastro/${clientId}`);
      if (response.status === 200) {
        await AsyncStorage.removeItem('clienteId');
        navigation.navigate('Login');
      } else {
        setError("Erro ao excluir o usuário.");
      }
    } catch (error) {
      setError("Erro ao excluir o usuário.");
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Deletar",
          style: "destructive",
          onPress: handleDelete
        }
      ]
    );
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('clienteId');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <StatusBar />
      <ScrollView>
        <View style={style.profileContainer}>
          <Text style={style.title}>Perfil</Text>
          <View style={style.fieldContainer}>
            <Text style={style.label}>Nome</Text>
            <TextInput
              style={style.input}
              value={valorNome}
              onChangeText={text => setValorNome(text)}
            />
          </View>
          <View style={style.fieldContainer}>
            <Text style={style.label}>Telefone</Text>
            <TextInput
              style={style.input}
              value={valorTelefone}
              onChangeText={text => setValorTelefone(text)}
              keyboardType="numeric"
            />
          </View>
          <View style={style.fieldContainer}>
            <Text style={style.label}>Sexo</Text>
            <RadioForm
              radio_props={[
                { label: 'Homem', value: 0 },
                { label: 'Mulher', value: 1 },
              ]}
              initial={sexo}
              onPress={value => setSexo(value)}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'#2196f3'}
              selectedButtonColor={'#2196f3'}
              labelStyle={style.radioLabel}
              animation={true}
            />
          </View>
          <View style={style.fieldContainer}>
            <Text style={style.label}>Email</Text>
            <TextInput
              style={style.input}
              value={email}
              editable={false}
            />
          </View>
          <View style={style.fieldContainer}>
            <Text style={style.label}>Tipo de Usuário</Text>
            <RadioForm
              radio_props={[
                { label: 'Cliente', value: 0 },
                { label: 'Entregador', value: 1 },
              ]}
              initial={tipoUsuario}
              onPress={value => setTipoUsuario(value)}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'#2196f3'}
              selectedButtonColor={'#2196f3'}
              labelStyle={style.radioLabel}
              animation={true}
            />
          </View>
          <View style={style.fieldContainer}>
            <Text style={style.label}>Senha</Text>
            <TextInput
              style={style.input}
              value={senha}
              onChangeText={text => setSenha(text)}
              secureTextEntry={true}
              placeholder="Deixe em branco para não alterar"
            />
          </View>
          <TouchableOpacity
            style={style.button}
            onPress={() => navigation.navigate('EntregaFinalizada')} // Navega para a tela EntregaFinalizada
          >
            <Text style={style.buttonText}>Ver Ofertas Aceita</Text>
          </TouchableOpacity>

          {error ? <Text style={style.error}>{error}</Text> : null}
          <TouchableOpacity style={style.button} onPress={handlePut}>
            <Text style={style.buttonText}>Atualizar Dados</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[style.button, style.deleteButton]} onPress={confirmDelete}>
            <Text style={style.buttonText}>Deletar conta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.button} onPress={handleLogout}>
            <Text style={style.buttonText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  profileContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 48,
    backgroundColor: '#fff',
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  radioLabel: {
    fontSize: 16,
    marginRight: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Perfil;
