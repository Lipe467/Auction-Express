import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { IP_API } from "../config/config";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

const DetalhesProduto = ({ route, navigation }) => {
    const [valorLance, setValorLance] = useState('');
    const [tempoEntregaEstimado, setTempoEntregaEstimado] = useState('');
    const { item } = route.params;
    const { id } = item;
    const imageSource = item.foto ? { uri: `data:image/jpeg;base64,${item.foto}` } : null;

    const fazerOferta = async () => {
        try {
            const clienteId = await AsyncStorage.getItem('clienteId');
            await AsyncStorage.setItem('novaOferta', 'true');
            if (!clienteId) {
                console.error('Cliente ID não encontrado');
                return;
            }

            const response = await axios.post(`${IP_API}/lacesProduto`, {
                valorLance,
                tempoEntregaEstimado,
                cliente: { id: clienteId },
                produtoCliente: { id },
            });

            console.log(response.data);
            navigation.navigate('Home');
        } catch (error) {
            console.error('Erro ao fazer oferta:', error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
            <Image source={imageSource} style={styles.logo} />
            <TouchableOpacity style={styles.card}>
                <Text style={styles.nomeProduto}>{item.nomeProduto}</Text>
            </TouchableOpacity>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Origem: {item.localOrigemCidade}, {item.localOrigemEstado}</Text>
                <Text style={styles.infoText}>Destino: {item.destinoCidade}, {item.destinoEstado}</Text>
                <Text style={styles.infoText}>Peso: {item.peso} kg</Text>
                <Text style={styles.infoText}>Comprimento: {parseFloat(item.comprimento).toFixed(2)} m</Text>
                <Text style={styles.infoText}>Largura: {parseFloat(item.largura).toFixed(2)} m</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Valor da Entrega"
                keyboardType="numeric"
                onChangeText={text => setValorLance(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Tempo de Entrega Estimado"
                onChangeText={text => setTempoEntregaEstimado(text)}
            />
            <TouchableOpacity style={styles.button} onPress={fazerOferta}>
                <Text style={styles.buttonText}>Enviar Oferta</Text>
            </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fafa',
        padding: 20,
        alignItems: 'center',
    },
    logo: {
        width: 400,
        height: 300,
        resizeMode: 'cover',
        borderRadius: 10,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
    },
    nomeProduto: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 20,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        height: 48,
        width: '100%',
        backgroundColor: '#fff',
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 80,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default DetalhesProduto;
