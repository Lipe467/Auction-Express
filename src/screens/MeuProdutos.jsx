import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_API } from "../config/config";
import { useFocusEffect } from '@react-navigation/native';

const MeuProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [clienteId, setClienteId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadClientId = async () => {
    try {
      const clientId = await AsyncStorage.getItem('clienteId');
      setClienteId(clientId);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProdutos = async () => {
    try {
      if (clienteId) {
        const response = await axios.get(`${IP_API}/postarProduto/todosPorCliente/${clienteId}`);
        setProdutos(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setProdutos([]);
      } else {
        console.error("Erro ao buscar produtos postados:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (produtoId) => {
    try {
      await axios.delete(`${IP_API}/postarProduto/deletar/${produtoId}`);
      fetchProdutos(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const confirmDelete = (produtoId) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja deletar este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deletar", onPress: () => handleDelete(produtoId) },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    loadClientId();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProdutos();
    }, [clienteId])
  );

  const renderProduto = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>Produto: {item.nomeProduto}</Text>
          <Text style={styles.cardText}>Descrição: {item.descricao}</Text>
          <Text style={styles.cardText}>Valor Sugerido: {item.valorSugerido.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
          <Text style={styles.cardText}>Local de Origem: {item.localOrigemCidade}, {item.localOrigemEstado}</Text>
          <Text style={styles.cardText}>Destino: {item.destinoCidade}, {item.destinoEstado}</Text>
          <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
            <Text style={styles.deleteButtonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
        {item.foto && <Image source={{ uri: `data:image/jpeg;base64,${item.foto}` }} style={styles.logo} />}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Meus Produtos Postados</Text>
      {isLoading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : produtos.length === 0 ? (
        <Text style={styles.noProductsText}>Nenhum produto encontrado.</Text>
      ) : (
        <FlatList
          data={produtos}
          renderItem={renderProduto}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  noProductsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
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
  cardDetails: {
    flex: 1,
    marginRight: 10,
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
  logo: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MeuProdutos;
