import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_API } from '../config/config';
import { Linking } from 'react-native';

const ProdutosAceitos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Definindo a função fetchProdutosAceitos fora do useEffect
  const fetchProdutosAceitos = async () => {
    try {
      const clienteId = await AsyncStorage.getItem('clienteId');
      const response = await axios.get(`${IP_API}/lacesProduto/ofertasAceitas/${clienteId}`);
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos aceitos", error);
      Alert.alert("Erro", "Não foi possível buscar os produtos aceitos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutosAceitos();
  }, []);

  const openWhatsApp = (numero) => {
    let phoneNumber = numero.replace(/[^0-9]/g, '');
    if (phoneNumber) {
      const link = `https://api.whatsapp.com/send?phone=55${phoneNumber}`;
      Linking.openURL(link);
    }
  };

  const confirmarEntrega = async (lanceId) => {
    try {
      const response = await axios.put(`${IP_API}/lacesProduto/confirmarEntrega/${lanceId}`);
      if (response.status === 200) {
        Alert.alert("Sucesso", "Entrega confirmada com sucesso!");
        fetchProdutosAceitos(); // Recarregar a lista para refletir a alteração
      }
    } catch (error) {
      console.error("Erro ao confirmar entrega", error);
      Alert.alert("Erro", "Não foi possível confirmar a entrega.");
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {item.foto && <Image source={{ uri: `data:image/jpeg;base64,${item.foto}` }} style={styles.image} />}
              <Text style={styles.title}>{item.nomeProduto}</Text>
              <Text style={styles.title}>{item.cliente.telefone}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => openWhatsApp(item.cliente.telefone)}
              >
                <Text style={styles.buttonText}>Abrir WhatsApp</Text>
              </TouchableOpacity>
              <Button
                title="Confirmar Entrega"
                onPress={() => confirmarEntrega(item.id)}
                color="#4CAF50"
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    width: 300,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 270,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#25D366',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProdutosAceitos;
