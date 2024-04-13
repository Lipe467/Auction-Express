import React, { useState } from "react";
import { Button, Image, ScrollView, StyleSheet,Text,TextInput, TouchableOpacity, View } from "react-native";
import RadioForm from "react-native-simple-radio-button";
import  BatLogo  from "../../assets/logo.png";

const Cadastro = ({navigation, Home, Login}) => {


  const[dados, setdados] = useState({
    telefone: "",
    nome: "",
  })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

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

      const handleback = () => {
          navigation.navigate('Login', { Login: Login })
      }

    var radio_props = [
        {label: 'Masculino', value: 0 },
        {label: 'Feminino', value: 1 },
      ];

      var radio_props2 = [
        {label: 'Cliente', value2: 0 },
        {label: 'Entregador', value2: 1 },
      ];
    


      const handleradio = (label) => {
        if(label = 0){
            value = 0;
        } else {
            value = 1
         
        }
      }

      const handleradio2 = (label) => {
        if(label = 0){
            value2 = 0;
        } else {
            value2 = 1
         
        }
      }

 
    
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
        backgroundColor: `#ffffff`,
      height: '100%'
      },
      logo: {
        margin: 25,
        width: 125, 
        height: 125, 
        alignSelf: 'center', 
    }
    })
 
    return (
        <View style={styles.center}>
            <ScrollView>
            <TextInput
   style={styles.input}
    onChangeText={dados.nome}
    placeholder="Nome Completo"
    />
<TextInput
   style={styles.input}
    onChangeText={dados.telefone}
    placeholder="Telefone"
    />

<RadioForm
  radio_props={radio_props}
  initial={0}
  onPress={handleradio}
/>
    
    
          <TextInput
          style={styles.input}
        onChangeText={setEmail}
        value={email}
        textContentType="emailAddress"
        placeholder='Email'
      />
      <TextInput
      style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder='Senha'
        secureTextEntry={true}
        onpress
      />
      <RadioForm
  radio_props={radio_props2}
  initial={0}
  onPress={handleradio2}
/>
      <TouchableOpacity style={{margin:18}}>
        <Button title='Cadastrar' onPress={handleLogin} />
      </TouchableOpacity>
      <TouchableOpacity style={{margin:18}}>
        <Button title='voltar' onPress={handleback} />
      </TouchableOpacity>
      { error &&  <Text style={styles.text}>Email e Senha devem ser obrigatórios</Text>}
      <View>
      <Image source={BatLogo} style={styles.logo}/>
      </View>
</ScrollView>
    </View>
      
);
      
}
    

export default Cadastro;