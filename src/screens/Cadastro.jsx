import React, { useState } from "react";
import { Button, ScrollView, StyleSheet,Text,TextInput, TouchableOpacity, View } from "react-native";
import RadioForm from "react-native-simple-radio-button";

const Cadastro = ({navigation, Home, Login}) => {

    const [cep, setcep] = useState();
    const[data,setdata] = useState();
    const [cpf, setpf] = useState();
    const [nome, setnome] = useState();
    const [logradouro, setlogradouro] = useState();
    const [bairro, setbairro] = useState();
    const [cidade, setcidade] = useState();
    const [estado, setestado] = useState();
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
    


      const handleradio = (label) => {
        if(label = 0){
            value = 0;
        } else {
            value = 1
         
        }
      }

 
    
    const styles = StyleSheet.create({
        containerPrincipal: {
            flex:1,
            flexDirection:'column'
        },
        topBar: {
            flexDirection:'row',
            height:70,
            backgroundColor:'#018786'
        },
        title: {
            color:'#fff',
            fontSize:25,
            fontWeight:'bold',
            alignSelf: 'center',
            margin: 20
        },
        containerCep: {
            flexDirection: 'row',
            height: 100,
            marginHorizontal:20,
        
        },
        botaoBuscar: {
            backgroundColor: '#018786',
            width: 120,
            height:70,
            marginTop:30,
            marginEnd:20,
            borderRadius:10,
            padding:20,

        },
        textoBotaBuscar: {
            color:'#FFF',
            fontSize:18,
            fontWeight: 'bold',
            alignSelf:'center',
            

        },
        caixadeTexto: {
            borderColor:'#000',
            borderWidth:2,
            padding:15,
            fontSize:18,
            borderRadius:10,
            marginTop:10,
            marginHorizontal: 20
        },text: {
            color: `#ff0000`,
            textAlign: 'center'
          }
    })
 
      
    

    return (
        <View style={styles.containerPrincipal}>
            <ScrollView>
            <TextInput
   style={styles.caixadeTexto}
    onChangeText={nome}
    placeholder="Nome Completo"
    />
    <TextInput
    style={{
        borderColor: '#000',borderWidth:2,width:100,
        fontSize:18, marginTop:10, marginEnd:20, borderRadius:10,
        marginHorizontal:20, padding:15
    }}
    onChangeText={data}
    placeholder="Idade"
    />

<RadioForm
  radio_props={radio_props}
  initial={0}
  onPress={handleradio}
/>
        <TextInput
     style={styles.caixadeTexto}
    onChangeText={cpf}
    placeholder="CPF"
    value={cpf}
    />
        
        <View style={styles.containerCep}>
    <TextInput
    style={{
        borderColor: '#000',borderWidth:2,width:200,
        fontSize:18, marginTop:30, marginEnd:20, borderRadius:10
    }}
    onChangeText={cep}
    placeholder="Cep"
    value={cep}
    />
</View>
        <TextInput
   style={styles.caixadeTexto}
    onChangeText={logradouro}
    placeholder="Logradouro"
    />

<TextInput
   style={styles.caixadeTexto}
    onChangeText={bairro}
    placeholder="Bairro"
    />

<TextInput
    style={styles.caixadeTexto}
    onChangeText={cidade}
    placeholder="Cidade"
    />

<TextInput
    style={{
        borderColor: '#000',borderWidth:2,width:100,
        fontSize:18, marginTop:10, marginEnd:20, borderRadius:10,
        marginHorizontal:20, padding:15
    }}
    onChangeText={estado}
    placeholder="Estado"
    />
    
          <TextInput
          style={styles.caixadeTexto}
        onChangeText={setEmail}
        value={email}
        textContentType="emailAddress"
        placeholder='Email'
      />
      <TextInput
      style={styles.caixadeTexto}
        onChangeText={setPassword}
        value={password}
        placeholder='Senha'
        secureTextEntry={true}
        onpress
      />
      <TouchableOpacity style={{margin:18}}>
        <Button title='Cadastrar' onPress={handleLogin} />
      </TouchableOpacity>
      <TouchableOpacity style={{margin:18}}>
        <Button title='voltar' onPress={handleback} />
      </TouchableOpacity>
      { error &&  <Text style={styles.text}>Email e Senha devem ser obrigatórios</Text>}
</ScrollView>
    </View>
      
);
      
}
    

export default Cadastro;