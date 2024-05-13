import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Button } from "react-native";

const DetalhesProduto = ({route, navigation, Home}) => {
    const { item } = route.params;
    const imageSource = item.foto ? { uri: `data:image/jpeg;base64,${item.foto}` } : null;

    const handleback = () => {
      navigation.navigate('Home',  Home);
    }
    return (
        <View>
            {imageSource && <Image source={imageSource} style={style.logo}/>}
            <View style={{ paddingTop: 100, alignItems: 'center' }}>
        <View style={{ borderBottomColor: '#bdbdbd', borderBottomWidth: 1, width: '90%' }} />
        <View style={{ position: 'relative' }}>
        </View>
      </View>
            <Text style={style.Title}>{item.nomeProduto}</Text>
            <TouchableOpacity style={style.Card}>
            <View style={style.container}>
            <Text style={style.descricao}>{item.descricao}</Text>
            </View>
            </TouchableOpacity>
            <Text><Text style={{fontWeight:'bold'}}>de: </Text>{item.localOrigemCidade}, {item.localOrigemEstado} <Text style={{fontWeight:'bold'}}>para: </Text>{item.destinoCidade}, {item.destinoEstado }</Text>
            <TextInput
            style={style.input}
          placeholder="Valor da Entrega"
          onChangeText={text => setNome(text)}
        />
        <TouchableOpacity style={{ margin: 18 }}>
                <Button title='Aceitar'/>
            </TouchableOpacity>
            <TouchableOpacity style={{ margin: 18 }}>
                <Button title='Voltar'
                onPress={handleback}
                />
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        borderWidth: 2, 
    borderColor: '#bdbdbd' 

      },
      input: {
        height: 48,
        borderColor: "#ccc",
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 16,
        textAlign: 'center',
        marginTop:20
      },
      Title:{
        fontSize:28,
        textAlign:'center',
        marginTop:20,
        fontWeight:'bold'
      },
      descricao:{
        textAlign: 'center',
        fontSize: 15,
        marginTop: 8
      },
      image: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: -20,
        left: -20,
        backgroundColor: '#fff'
      },
      container: {
        padding: 8,
        backgroundColor: "#fff",
      },
      Card: {
        padding: 8,
        backgroundColor: '#ffff',
        margin: 8,
        borderRadius: 20,
        borderWidth: 2,
        elevation: 5,
        borderColor: "#bdbdbd",
        
    }
})

export default DetalhesProduto;