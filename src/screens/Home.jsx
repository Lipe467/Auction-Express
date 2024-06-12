import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, FlatList, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Modal, Image, ScrollView } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { IP_API } from "../config/config";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ListProdutos = ({ Informs, handleItemClick }) => {
  const { id, descricao, localOrigemEstado, localOrigemCidade, destinoEstado, destinoCidade, nomeProduto, foto, peso, valorSugerido } = Informs;
  const imageSource = foto ? { uri: `data:image/jpeg;base64,${foto}` } : null;
  return (
    <TouchableOpacity style={style.Card} onPress={() => handleItemClick(Informs)}>
      <View style={style.cardContent}>
        <View style={{ flex: 1 }}>
          <Text style={style.cardText}>Nome: {nomeProduto}</Text>
          <Text style={style.cardText}>Preço Sugerido: {parseFloat(valorSugerido).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
          <Text style={style.cardText}>Estado: {localOrigemEstado}</Text>
          <Text style={style.cardText}>Cidade: {localOrigemCidade}</Text>
          <Text style={style.cardText}>Estado Destino: {destinoEstado}</Text>
          <Text style={style.cardText}>Cidade Destino: {destinoCidade}</Text>
          <Text style={style.cardText}>Peso: {parseFloat(peso).toLocaleString('pt-BR', { maximumFractionDigits: 2 })} kg</Text>
        </View>
        <View>
          {imageSource && <Image source={imageSource} style={style.logo} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Home = ({ navigation }) => {
  const [listProduto, setListProduto] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showChat, setShowChat] = useState(false); // Adicione o estado para mostrar ou ocultar o chat
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${IP_API}/postarProduto`);
      setListProduto(response.data);
    } catch (error) {
      console.error("Erro ao obter a lista de produtos:", error);
    }
  };

  useEffect(() => {
    fetchProductList();
    checkOfferNotifications(); // Verificar notificações ao montar a tela
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProductList();
      checkOfferNotifications(); // Verificar notificações ao retomar o foco na tela
    }, [])
  );

  const checkOfferNotifications = async () => {
    try {
      const clienteId = await AsyncStorage.getItem('clienteId');
      if (!clienteId) {
        console.error('Cliente ID não encontrado');
        return;
      }
      const response = await axios.get(`${IP_API}/notificacoes/cliente/${clienteId}`);
      if (Array.isArray(response.data)) {
        const novasNotificacoes = response.data.filter(notificacao => !notificacao.lida);
        if (novasNotificacoes.length > 0) {
          setShowNotifications(true);
          setNotificationData(novasNotificacoes);
        } else {
          setShowNotifications(false);
          setNotificationData([]);
        }
      } else {
        setShowNotifications(false);
        setNotificationData([]);
      }
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      setShowNotifications(false);
      setNotificationData([]);
    }
  };

  const handleNotificationIconPress = () => {
    setShowNotificationModal(true);
  };

  const handleItemClick = (item) => {
    setSelectedProduct(item);
    setShowChat(true);
    console.log("ID do Produto:", item.id);
    navigation.navigate("DetalhesProduto", { item });
  };

  const handleCloseNotificationModal = async () => {
    try {
      const promises = notificationData.map(notification =>
        axios.put(`${IP_API}/notificacoes/${notification.id}/marcarComoLida`)
      );
      await Promise.all(promises);
      setShowNotificationModal(false);
      checkOfferNotifications(); // Atualizar o estado das notificações
    } catch (error) {
      console.error('Erro ao marcar notificações como lidas:', error);
    }
  };

  return (
    <View style={{ backgroundColor: '#f5fafa', flex: 1 }}>
      <SafeAreaView>
        <StatusBar />
        <View style={style.header}>
          <Text style={style.title}>Produtos Publicados</Text>
          <View style={style.iconContainer}>
            <TouchableOpacity onPress={handleNotificationIconPress} style={style.iconButton}>
              <Ionicons name="notifications" size={24} color={showNotifications ? "red" : "black"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Perfil')} style={style.iconButton}>
              <MaterialCommunityIcons name="account" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={listProduto}
          renderItem={({ item }) => <ListProdutos Informs={item} handleItemClick={handleItemClick} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 155, paddingHorizontal: 8 }}
        />
      </SafeAreaView>
      <Modal
        visible={showNotificationModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowNotificationModal(false)}
      >
        <View style={style.modalContainer}>
          <TouchableOpacity style={style.modalCloseButton} onPress={handleCloseNotificationModal}>
            <Text style={style.modalCloseText}>Fechar</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={style.modalContentContainer}>
            <Text style={style.modalText}>Você tem novas ofertas:</Text>
            {notificationData.map((notification, index) => (
              <View key={index} style={style.notificationCard}>
               <Text style={style.notificationText}>
                <Text style={style.boldText}>{notification.mensagem} </Text>
              </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  header: {
    backgroundColor: "#fff",
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 40,
  },
  modalContentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  modalCloseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  notificationCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'black',
    width: '100%',
  },
  notificationText: {
    fontSize: 18,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18
  },
});

export default Home;
