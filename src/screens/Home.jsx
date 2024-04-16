import { Button, TouchableOpacity, View } from "react-native";

import { useEffect } from "react";

const Home = ({ navigation, route }) => {
  const clienteId = route.params?.clienteId;


    const handleProduct = () => {
        navigation.navigate('Produto', { clienteId: clienteId })
    }
    useEffect(() => {
      console.log("clienteId na Home:", clienteId);
    }, [clienteId]);

    return (
  <View>

    <TouchableOpacity style={{margin:18}}>
        <Button title='Criar um Produto' onPress={handleProduct} />
      </TouchableOpacity>
  </View>
  
    )
};

export default Home;