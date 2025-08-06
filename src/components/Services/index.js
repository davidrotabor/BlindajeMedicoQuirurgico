import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ServiceCard from './ServiceCard';
import ArriendoLogo from '../../Assets/Icons/ArriendoLogo.png';
import ViajesLogo from '../../Assets/Icons/ViajesLogo.png';
import SoatLogo from '../../Assets/Icons/SoatLogo.png';
import {useNavigation} from '@react-navigation/native';

const servicess = [
  /*{
    id: '1',
    name: 'tu soat aqui',
    description: '8 Productos',
    icon: SoatLogo,
  },*/
  {
    id: '2',
    name: 'Seguro de viaje',
    description: 'Este seguro cubre asistencia por COVID-19',
    icon: ViajesLogo,
  },
  {
    id: '3',
    name: 'Arrend digital',
    description: 'Cotiza el seguro de tu arrendamiento',
    icon: ArriendoLogo,
  },
];

const Services = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.services}>
      <View style={styles.services_}>
        <View style={styles.services_header}>
          <Text style={{color: 'black'}}>Nuestros Servicios</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AgregarServicios')}
            style={styles.services_headerButton}>
            <Text style={styles.services_headerButtonText}>Ver Todos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.services_cards}>
          <FlatList
            data={servicess}
            horizontal
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ServiceCard
                icon={item.icon}
                name={item.name}
                description={item.description}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default Services;

const styles = StyleSheet.create({
  services: {
    width: '90%',
    height: 215,
    marginTop: 5,
  },
  services_: {
    alignItems: 'center',
  },
  services_header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  services_headerButton: {
    width: 100,
    height: 30,
    backgroundColor: '#1B7BCC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  services_headerButtonText: {
    color: 'white',
  },
});
