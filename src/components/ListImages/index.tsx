import { FlatList, Image} from 'react-native';
import React from 'react';

// Importe keys apenas se for necessário para outras configurações
// import keys from '../../config/keys/index.json';

export const ListImage = ({ data }: { data: Array<string> }) => {
  // Substitua keys.IPMachineLocal pelo endereço IP local da sua máquina
  const localIP = '192.168.2.3'; // Substitua pelo seu endereço IP local

  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <Image
          source={{
            uri: `http://${localIP}:8080/${item}`,
          }}
          defaultSource={{
            uri: `http://${localIP}:8080/${item}`,
          }}
          style={{
            width: 100,
            height: 150,
            borderRadius: 10,
            marginHorizontal: 5,
            marginTop: 5,
          }}
        />
      )}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => String(index)}
      style={{
        marginTop: 20,
        marginLeft: 10,
      }}
    />
  );
};