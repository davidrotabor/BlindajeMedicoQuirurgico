import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const PublicityCard = ({title, description, logo, id}) => {
  const navigation = useNavigation();

  const openWhatsApp = () => {
    const url =
      'https://api.whatsapp.com/send?phone=573127813077&text=Hola,%20estoy%20interesado%20en%20adquirir%20un%20servicio%20de%20Complicaciones%20Postquirúrgicas';
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  return (
    <View style={styles.publicitya}>
      <View style={styles.publicityContent}>
        <View style={styles.publicityContent_text}>
          <Text style={styles.publicityContent_textTitle}>{title}</Text>
          <Text style={styles.publicityContent_textDescription}>
            {description}
          </Text>
        </View>
        <View>
          <Image style={styles.publicityContent_logo} source={logo} />
        </View>
        <TouchableOpacity
          onPress={() =>
            id === '1'
              ? navigation.navigate('AgregarServicios')
              : openWhatsApp()
          }
          style={styles.publicityContent_button}>
          <Text style={styles.publicityContent_buttonText}>Ver Más</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PublicityCard;

const styles = StyleSheet.create({
  publicitya: {
    width: 350,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {height: 4},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    elevation: 8,
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  publicityContent: {
    width: '90%',
    height: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  publicityContent_text: {
    flex: 1,
  },
  publicityContent_textTitle: {
    fontWeight: '800',
    fontSize: 18,
    lineHeight: 22,
    color: 'black',
  },
  publicityContent_textDescription: {
    fontSize: 10,
    color: 'black',
  },
  publicityContent_logo: {
    width: 75,
    height: 73,
    marginLeft: 5,
    marginRight: 8,
  },
  publicityContent_button: {
    backgroundColor: '#1B7BCC',
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
  },
  publicityContent_buttonText: {
    color: 'white',
  },
});
