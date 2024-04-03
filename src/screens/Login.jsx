
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";


const Login = ({ navigation, Cadastro, Home}) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)


  const styles = StyleSheet.create({
    button: {
      gap: 12
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    text: {
      color: `#ff0000`,
      textAlign: 'center'
    },
    center: {
      flex: 1,
      justifyContent: "center",
    }
  })


  const validEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleLogin = () => {
    if(validEmail(email) && password) {
      navigation.navigate('Home', { Home: Home })
    } else {
      setError(true)
    }
  }

  return (
    <SafeAreaView style={styles.center}>
      <StatusBar />
      <Text style={{fontSize:20, fontWeight:"bold",textAlign:"center"}}>BEM VINDO(A)</Text>
      <TextInput
        onChangeText={setEmail}
        value={email}
        textContentType="emailAddress"
        style={styles.input}
        placeholder='Email'
      />
      <TextInput
        onChangeText={setPassword}
        value={password}
        style={styles.input}
        placeholder='Senha'
        secureTextEntry={true}
        onpress
      />
  
      <TouchableOpacity>
        <Button title='Entrar' onPress={handleLogin} />  
      </TouchableOpacity>
        { error &&  <Text style={styles.text}>Email e Senha devem ser obrigatórios</Text>}
       
        <Text style={{textAlign: 'center', verticalAlign: 'bottom' , margin:18}}
              onPress={() =>
          navigation.navigate('Cadastro', {Cadastro : Cadastro})}>Cadastrar</Text>

      <Text style={{ textAlign: 'center', verticalAlign: 'bottom' , margin:18 }}>Desenvolvido por Felipe Augusto</Text>
    </SafeAreaView>
  );

}


export default Login;