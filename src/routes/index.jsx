import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Home from '../screens/Home';
import Produto from '../screens/Produto';
import DetalhesProduto from '../screens/DetalhesProduto';
import Perfil from '../screens/Perfil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HistoricoOferta from '../screens/HistoricoOferta';
import MeuProdutos from '../screens/MeuProdutos';
import EntregaFinalizada from '../screens/EntregaFinalizada';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator >
    <Stack.Screen  name="Home" component={Home} />
    <Stack.Screen name="DetalhesProduto" component={DetalhesProduto} />
    <Stack.Screen name="Perfil" component={Perfil} />
    <Stack.Screen name="EntregaFinalizada" component={EntregaFinalizada} options={{ title: "Entregas Finalizadas" }} />

  </Stack.Navigator>
);

const ProdutoStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Produto" component={Produto} />
    <Stack.Screen name="DetalhesProduto" component={DetalhesProduto} />
  </Stack.Navigator>
);

const Routes = () => {
  const handleLogout = async () => {
    try {
      // Limpa os dados de autenticação
      await AsyncStorage.removeItem('clienteId');
      // Navega de volta para a tela de login
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Define as telas de autenticação
const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Cadastro" component={Cadastro} />
  </Stack.Navigator>
);

// Define as abas principais
const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="HomeTab" component={HomeStack}
      options={{ title: 'Home',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ), 
      }}
    />
    <Tab.Screen name="ProdutoTab" component={ProdutoStack}
      options={{ title: 'Produto',
        tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="plus" color={color} size={size} />
        ), 
      }} 
    />
    
    <Tab.Screen name="HistoricoOferta" component={HistoricoOferta} 
      options={{ title: 'Ofertas', tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="history" color={color} size={size} />
        ), 
       }} 
    />
     <Tab.Screen name="MeuProdutos" component={MeuProdutos} 
      options={{ title: 'MeuProdutos', tabBarIcon: ({ color, size }) => (
        <MaterialCommunityIcons name="cube-outline" color={color} size={size} />
        ), 
       }} 
    />
  </Tab.Navigator>
);

export default Routes;
