import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';
import Produto from '../screens/Produto';

const Routes = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Cadastro"
        component={Cadastro}
      />
       <Stack.Screen
        name="Home"
        component={Home}
      />
       <Stack.Screen
        name="Produto"
        component={Produto}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default Routes;