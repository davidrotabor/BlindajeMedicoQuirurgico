import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import BlindajeLogo from '../../Assets/Icons/BlindajeLogo.png';
import PublicityCard from './PublicityCard';

const publicityData = [
  {
    id: '1',
    title: 'Cobertura Jurídica',
    description:
      'Es una herramienta de protección jurídica y judicial diseñada para usted, con el fin de blindar su actuar profesional de manera...',
    logo: BlindajeLogo,
  },
  {
    id: '2',
    title: 'Complicaciones Postquirúrgicas',
    description:
      'Tiene como objeto Cubrir Los gastos médicos, de urgencias, hospitalarios y quirúrgicos que se deriven de una complicación de Cirugía...',
    logo: BlindajeLogo,
  },
];

const Publicity = () => {
  return (
    <View style={styles.flatListPublicity}>
      <FlatList
        data={publicityData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <PublicityCard
            title={item.title}
            description={item.description}
            logo={item.logo}
            id={item.id}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Publicity;

const styles = StyleSheet.create({
  flatListPublicity: {
    width: '100%',

    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
