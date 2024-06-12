import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Button, ScrollView } from "react-native";
import axios from "axios";
import { IP_API } from "../config/config";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { getEstadosBrasil } from "../Estado/Estado";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Produto = ({ navigation  }) => {
    const [nome, setNome] = useState("");
    const [valorSugerido, setValorSugerido] = useState("");
    const [descricao, setDescricao] = useState("");
    const [localOrigemEstado, setLocalOrigemEstado] = useState("");
    const [localOrigemCidade, setLocalOrigemCidade] = useState("");
    const [destinoEstado, setDestinoEstado] = useState("");
    const [destinoCidade, setDestinoCidade] = useState("");
    const [image, setImage] = useState("");
    const [peso, setPeso] = useState("");
    const [largura, setLargura] = useState("");
    const [comprimento, setComprimento] = useState("");
    const [base64Image, setBase64Image] = useState("");
    const [error, setError] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };

      const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
      };

    const maxDescricaoLength = 200;

    const loadClientId = async () => {
        try {
            const clientId = await AsyncStorage.getItem('clienteId');
            return clientId;
        } catch (error) {
            console.error(error);
        }
    };

    const cadastrarProduto = async () => {
        if (!nome || !descricao || !localOrigemEstado || !localOrigemCidade || !destinoEstado || !destinoCidade) {
            setError("Por favor, preencha todos os campos obrigatórios.");
            return;
        } else if (descricao.length > 200) {
            setError("O campo descrição deve conter até 200 caracteres.");
            return;
        }
        try {
            const clienteId = await loadClientId();

            const response = await axios.post(`${IP_API}/postarProduto`, {
                nomeProduto: nome,
                valorSugerido: valorSugerido,
                descricao: descricao,
                localOrigemEstado: localOrigemEstado,
                localOrigemCidade: localOrigemCidade,
                destinoEstado: destinoEstado,
                destinoCidade: destinoCidade,
                foto: base64Image,
                cliente: { id: clienteId },
                peso: peso,
                largura: largura,
                comprimento: comprimento,
                dataEntrega: dataEntrega,
            });
            console.log(response.data);
            setNome("");
            setDescricao("");
            setLocalOrigemEstado("");
            setLocalOrigemCidade("");
            setDestinoEstado("");
            setDestinoCidade("");
            setImage("");
            setBase64Image("");
            setValorSugerido("");
            setPeso("");
            setLargura("");
            setComprimento("");
            navigation.navigate('Home');
        } catch (error) {
            console.error(error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);

            try {
                let base64Image = await FileSystem.readAsStringAsync(result.assets[0].uri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                setBase64Image(base64Image);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access media library denied');
            }
        })();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.logoContainer} />
                <Text style={styles.title}>PUBLICAR PRODUTO</Text>
               
             {image && <Image source={{ uri: image }} style={styles.image} />}
                <View style={{ padding: 10 }}>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Selecionar Imagem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={showDatePicker}>
                    <Text style={styles.buttonText}>Selecionar Data de Entrega</Text>
                </TouchableOpacity>
                    <DateTimePickerModal
                        date={selectedDate}
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nome Produto"
                        value={nome}
                        onChangeText={text => setNome(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Valor da Entrega"
                        keyboardType="numeric"
                        onChangeText={text => setValorSugerido(text)}
                        value={valorSugerido}
                    />
                    <Text style={styles.charCount}>
                        {descricao.length}/{maxDescricaoLength} caracteres
                    </Text>
                    <TextInput
                        style={styles.inputDescricao}
                        placeholder="Descrição Produto"
                        value={descricao}
                        onChangeText={text => setDescricao(text)}
                        multiline={true}
                        maxLength={maxDescricaoLength}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Peso (em kg)"
                        value={peso}
                        onChangeText={text => setPeso(text)}
                        keyboardType="numeric"
                    />
                    <Text style={styles.charCount}>
                        Largura em metros, use vírgula para decimais
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setLargura(text)}
                        value={largura}
                        placeholder="Largura Produto"
                        keyboardType="numeric"
                    />
                    <Text style={styles.charCount}>
                        Comprimento em metros, use vírgula para decimais
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setComprimento(text)}
                        value={comprimento}
                        placeholder="Comprimento Produto"
                        keyboardType="numeric"
                    />
                    <View style={{ padding: 10 }}>
                        <Picker
                            selectedValue={localOrigemEstado}
                            style={styles.input}
                            onValueChange={(itemValue) => setLocalOrigemEstado(itemValue)}>
                            <Picker.Item label="Selecione o Estado de Origem" value="" />
                            {getEstadosBrasil().map((estado, index) => (
                                <Picker.Item key={index} label={estado.label} value={estado.value} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={destinoEstado}
                            style={styles.input}
                            onValueChange={(itemValue) => setDestinoEstado(itemValue)}>
                            <Picker.Item label="Selecione o Estado de Destino" value="" />
                            {getEstadosBrasil().map((estado, index) => (
                                <Picker.Item key={index} label={estado.label} value={estado.value} />
                            ))}
                        </Picker>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setLocalOrigemCidade(text)}
                        value={localOrigemCidade}
                        placeholder="Cidade Origem"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setDestinoCidade(text)}
                        value={destinoCidade}
                        placeholder="Cidade Destino"
                    />
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={cadastrarProduto}>
                    <Text style={styles.buttonText}>Postar Produto</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5fafa",
        justifyContent: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    input: {
        height: 60,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 8,
        marginBottom: 10,
        paddingLeft: 10,
        textAlign: "center",
        fontSize: 20,
        backgroundColor: '#ffff'
    },
    inputDescricao: {
        height: 120,
        borderWidth: 3,
        borderColor: "black",
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: '#ffff'
    },
    buttonContainer: {
        backgroundColor: '#007bff',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 80,
        alignSelf: 'center',
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    },
    image: {
        width: 300,
        height: 300,
        alignSelf: 'center',
        marginTop: 10,
    },
    logoContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 60,
        paddingTop: 25,
        paddingBottom: 5,
    },
    logo: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    charCount: {
        textAlign: "right",
        marginRight: 10,
        marginBottom: 10,
        color: "gray",
    },
    MenssagemdeValidacao: {
        color: "red",
        marginBottom: 10,
    },
    datePickerButton: {
        height: 60,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 8,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },
    datePickerButtonText: {
        fontSize: 20,
        color: "black",
        
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    button : {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20


    }
});

export default Produto;