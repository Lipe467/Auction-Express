import { Button, Image, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native"
import Home from "./Home"
import { useState } from "react"
import  BatLogo  from "../../assets/logo.png";


const Produto = ({navigation}) => {

    const [images, setImages] = useState<Array<string>>([]);

    async function fetchImages() {
        return;
      }
    
      useEffect(() => {
        fetchImages();
      }, []);

    const[dados, setdados] = useState({
        telefone: "",
        nome: "",
      })
    
        const [descricao, setDescricao] = useState('')
        const [password, setPassword] = useState('')
        const [error, setError] = useState(false)
    
          const handleback = () => {
              navigation.navigate('Home', { Home: Home })
          }

          const styles = StyleSheet.create({
            button: {
              gap: 12
            },
            input: {
              height: 125,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              textAlignVertical: 'top'
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
          },
          container: {
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: getStatusBarHeight(true) + 20,
          }
        }

        
    )
    return (
       <View>
        
        <ScrollView>
        <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='#fff' translucent />
      <Header fetchImages={fetchImages} />
      {images.length ? (
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 38,
            }}
          >
            <Text
              style={{
                color: '#222',
                fontSize: 18,
                width: '100%',
                right: 15,
              }}
            >
              Hoje
            </Text>
            <AntDesign name='checkcircleo' size={22} color='#222' />
          </View>

          <ListImage data={images} />
        </View>
      ) : (
        <></>
      )}
    </View>
            
        <TextInput style={styles.input } 
onChangeText={descricao}
placeholder="Descrição do Produto"
/>

<TouchableOpacity style={{margin:18}}>
        <Button title='voltar' onPress={handleback} />
      </TouchableOpacity>

  <View>
  <Image source={BatLogo} style={styles.logo}/>
  </View>
</ScrollView>
</View>

    );
}

export default Produto;