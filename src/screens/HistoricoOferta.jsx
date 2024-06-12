import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { IP_API } from "../config/config";
import { Linking } from 'react-native';


const ListProdutos = ({ Informs, handleAcceptOffer, handleRejectOffer }) => {
  const { id, nomeProduto, valorSugerido, foto, valorLance, data, status, cliente } = Informs;

  const imageSource = foto ? { uri: `data:image/jpeg;base64,${foto}` } : null;

  const openWhatsApp = (numero) => {
    // Substituir espaços e outros caracteres para formatar o número corretamente
    let phoneNumber = numero.replace(/[^0-9]/g, '');
    if (phoneNumber) {
      // Abre o link do WhatsApp
      const link = `https://api.whatsapp.com/send?phone=55${phoneNumber}`;
      Linking.openURL(link);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>Você Recebeu uma oferta de: {cliente.nome}</Text>
          <Text style={styles.cardText}>Produto: {nomeProduto}</Text>
          <Text style={styles.cardText}>Valor Sugerido: {(valorSugerido || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
          <Text style={styles.cardText}>Valor Lance: {(valorLance || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </Text>
          <Text style={styles.cardText}>Data Oferta: {data}</Text>
          <Text style={styles.cardText}>Status Oferta: {status}</Text>
          {status === "Aceito" && (
            <>
              <Text style={styles.cardText}>Telefone: {cliente.telefone}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonWhatsApp]}
                onPress={() => openWhatsApp(cliente.telefone)}
              >
                <Text style={styles.buttonText}>Abrir no WhatsApp</Text>
              </TouchableOpacity>
            </>
          )}
          {status !== "Aceito" && status !== "Rejeitado" && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleAcceptOffer(id)}
              >
                <Text style={styles.buttonText}>Aceitar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonReject]}
                onPress={() => handleRejectOffer(id)}
              >
                <Text style={styles.buttonText}>Rejeitar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {imageSource && <Image source={imageSource} style={styles.logo} />}
      </View>
    </View>
  );
};
const HistoricoOferta = ({ navigation }) => {
  const [listProduto, setListProduto] = useState([]);
  const [clienteId, setClienteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadClientId = async () => {
    try {
      const id = await AsyncStorage.getItem('clienteId');
      setClienteId(id);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOfertasRecebidas = async () => {
    try {
      if (clienteId) {
        const response = await axios.get(`${IP_API}/lacesProduto/ofertasRecebidasDetalhadas/${clienteId}`);
        setListProduto(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setListProduto([]);
      } else {
        console.error("Erro ao buscar ofertas recebidas:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadClientId();
  }, []);

  useEffect(() => {
    fetchOfertasRecebidas();
  }, [clienteId]);

  useFocusEffect(
    useCallback(() => {
      if (clienteId) {
        fetchOfertasRecebidas();
      }
    }, [clienteId])
  );

  const handleAcceptOffer = async (offerId) => {
    try {
      await axios.put(`${IP_API}/lacesProduto/${offerId}/statusAceito`);
      fetchOfertasRecebidas(); // Atualiza a lista após aceitar a oferta
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectOffer = async (offerId) => {
    try {
      await axios.put(`${IP_API}/lacesProduto/${offerId}/statusRejeitado`);
      fetchOfertasRecebidas(); // Atualiza a lista após rejeitar a oferta
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <ListProdutos
      Informs={item}
      handleAcceptOffer={handleAcceptOffer}
      handleRejectOffer={handleRejectOffer}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Histórico de Ofertas</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : listProduto.length === 0 ? (
        <Text style={styles.noOffersText}>Nenhuma oferta encontrada.</Text>
      ) : (
        <FlatList
          data={listProduto}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonReject: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  cardDetails: {
    flex: 1,
    marginRight: 10,
  },
  lanceContainer: {
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  noOffersText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonWhatsApp: {
    backgroundColor: '#25D366', // Cor característica do WhatsApp
  },
  
});

export default HistoricoOferta;
