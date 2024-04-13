import { Button, TouchableOpacity, View } from "react-native";

import Produto from "./Produto";

const Home = ({ navigation }) => {


    const handleProduct = () => {
        navigation.navigate('Produto', { Produto: Produto })
    }

    return (
  <View>

    <TouchableOpacity style={{margin:18}}>
        <Button title='Criar um Produto' onPress={handleProduct} />
      </TouchableOpacity>
  </View>
  
    )
};

export default Home;