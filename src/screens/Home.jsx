import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar,TouchableOpacity, Button,Image } from "react-native";
import axios from "axios";
import { IP_API } from "../config/config";
import logoHeader from "../../assets/logoHeader.png";
import logoNome from "../../assets/nome.png";


const ListProdutos = ({Informs, handleItemClick})=>{
  const {descricao, tamanhoProduto, localOrigemEstado, localOrigemCidade, destinoEstado, destinoCidade, nomeProduto, foto} = Informs
  const imageSource = foto ? { uri: `data:image/jpeg;base64,${foto}` } : null;
  return (
    <View>
       <TouchableOpacity style={style.Card} onPress={() => handleItemClick(Informs)}> 
      <View style={style.cardContent}>
        <View style={{ flex: 1}}>
          <Text style={style.cardText}>Nome: {nomeProduto}</Text>
          <Text style={style.cardText}>Tamanho: {tamanhoProduto}</Text>
          <Text style={style.cardText}>Estado: {localOrigemEstado}</Text>
          <Text style={style.cardText}>Cidade: {localOrigemCidade}</Text>
          <Text style={style.cardText}>Estado Destino: {destinoEstado}</Text>
          <Text style={style.cardText}>Cidade Destino: {destinoCidade}</Text>
        </View>
        <View style={style.imageContainer}>
          {imageSource && <Image source={imageSource} style={style.logo} />}
        </View>
      </View>
    </TouchableOpacity>
  </View>
  )
}
const Home = ({ navigation}) => {
  const [listProduto, setListProduto]= useState([]);
  //const clienteId = route.params?.clienteId;


  const fetchFlastListProduto = async() =>{
    try {
        const {data} = await axios.get(`${IP_API}/postarProduto`)
        setListProduto(data);
    } catch (error) {
        console.error(error)
    }
   }
   
   useEffect(()=>{
  
   },[fetchFlastListProduto()]) 

   const handleProduct = () => {
    navigation.navigate('Produto', {  });
  };
  const handleItemClick = (item) => {
    navigation.navigate("DetalhesProduto", { item });
  }
  
  return (
    <View >
      <View style={style.header}>
          <Image source={logoHeader} style={{width: 120, height: 40}} resizeMode="contain"/>
          <Image source={logoNome} style={{width: 120, height: 40}} resizeMode="contain"/>
      </View>
      <SafeAreaView>
          <StatusBar/>
            <View style={{marginBottom:450}}>
              <Text style={style.title}>Produtos Postados</Text>
              <TouchableOpacity style={{ margin: 18 }}>
                <Button title='Criar um Produto' onPress={handleProduct} />
            </TouchableOpacity>
            <FlatList
              data={listProduto}
              renderItem={({ item }) => <ListProdutos Informs={item} handleItemClick={handleItemClick} />}
            />
            </View>    
      </SafeAreaView>
    </View>
  );
};
const style = StyleSheet.create({
  Card: {
      padding: 8,
      backgroundColor: '#ffff',
      margin: 8,
      borderRadius: 20,
      borderWidth: 2,
      elevation: 5, 
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    padding: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  header: {
    backgroundColor: "#fff",
    borderWidth:2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft:10,
  }, 
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
})

export default Home;
