import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Dimensions,
  View,
  ScrollView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CardPlans from './CardPlans';
import {AuthContext} from '../../Context/AuthContext';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import CardPlansWebView from './CardPlansWebView';

const ServicesDetail = ({route}) => {
  const navigation = useNavigation();
  const {userData} = useContext(AuthContext);

  const [basicPlan, setBasicPlan] = useState(true);
  const [plusPlan, setPlusPlan] = useState(false);

  //Button procedureTipe
  const [esteticoSelected, setEsteticaSelected] = useState(true);
  const [quirurgicoSelected, setQuirurgicaSelected] = useState(false);

  const handleBasicPlan = () => {
    setBasicPlan(true);
    setPlusPlan(false);
  };
  const handlePlusPlan = () => {
    setBasicPlan(false);
    setPlusPlan(true);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Agregar',
      headerTransparent: true,
      headerTintColor: 'white',
      headerBackTitleVisible: false,
      //for android
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, [navigation]);

  const pressEstetico = () => {
    setEsteticaSelected(true);
    setQuirurgicaSelected(false);
  };

  const pressQuirurgico = () => {
    setEsteticaSelected(false);
    setQuirurgicaSelected(true);
  };

  return (
    <BottomSheetModalProvider>
      <View style={styles.servicesDetail}>
        <View style={styles.servicesDetail_header}>
          <ImageBackground
            style={styles.servicesDetail_headerImgBackground}
            source={route.params?.backgroundImg}>
            <Text style={styles.servicesDetail_Title}>
              {route.params?.name}
            </Text>
          </ImageBackground>
        </View>
        <View style={styles.servicesDetail_container}>
          {route.params?.procedimientos ? (
            <View style={styles.servicesDetail_container_}>
              <Text style={styles.servicesDetail_procedureTipeTitle}>
                Seleccione el tipo de procedimiento
              </Text>
              <View style={styles.servicesDetail_procedureTipe}>
                <View style={styles.servicesDetail_procedureTipe_}>
                  <TouchableOpacity
                    onPress={pressEstetico}
                    style={
                      esteticoSelected === true
                        ? styles.servicesDetail_procedureSelected
                        : styles.servicesDetail_procedureNoSelected
                    }>
                    <Text
                      style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                      Estético
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={pressQuirurgico}
                    style={
                      quirurgicoSelected === true
                        ? styles.servicesDetail_procedureSelected
                        : styles.servicesDetail_procedureNoSelected
                    }>
                    <Text
                      style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                      Quirúrgico
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={styles.servicesDetail_containerTextTitle}>
                Planes
              </Text>
              {esteticoSelected === true ? (
                <View style={{height: '100%', paddingHorizontal: 5}}>
                  <View style={styles.servicesDetail_containerButtons}>
                    <TouchableOpacity
                      style={[
                        styles.servicesDetail_containerButton,
                        {shadowOpacity: basicPlan ? 0.4 : 0},
                        {backgroundColor: basicPlan ? '#96C4EA' : '#999'},
                      ]}
                      onPress={handleBasicPlan}>
                      <Text style={styles.servicesDetail_containerButtonText}>
                        Básico
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.servicesDetail_containerButton,
                        {shadowOpacity: !plusPlan ? 0 : 0.4},
                        {backgroundColor: !plusPlan ? '#999' : '#96C4EA'},
                      ]}
                      onPress={handlePlusPlan}>
                      <Text style={styles.servicesDetail_containerButtonText}>
                        Plus
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {basicPlan && (
                    <CardPlans
                      idN={route.params?.id}
                      titleDescription={'Descripción'}
                      description={
                        route.params?.procedimientos[0].estetico.planes[0]
                          .planDescription
                      }
                      price={
                        route.params?.procedimientos[0].estetico.planes[0]
                          .planPrice
                      }
                      planN={'Básico'}
                      procedureTipeN={'Estético'}
                      backgroundImgN={route.params?.backgroundImg}
                      nameN={route.params?.name}
                      logoDetailN={route.params?.logoDetail}
                      logoIcon={route.params?.logo}
                    />
                  )}
                  {plusPlan && (
                    <CardPlans
                      idN={route.params?.id}
                      titleDescription={'Adicional'}
                      description={
                        route.params?.procedimientos[0].estetico.planes[1]
                          .planDescription
                      }
                      price={
                        route.params?.procedimientos[0].estetico.planes[1]
                          .planPrice
                      }
                      planN={'Plus'}
                      procedureTipeN={'Estético'}
                      backgroundImgN={route.params?.backgroundImg}
                      nameN={route.params?.name}
                      logoDetailN={route.params?.logoDetail}
                      logoIcon={route.params?.logo}
                    />
                  )}
                </View>
              ) : (
                <View style={{height: '100%', paddingHorizontal: 5}}>
                  <View style={styles.servicesDetail_containerButtons}>
                    <TouchableOpacity
                      style={[
                        styles.servicesDetail_containerButton,
                        {shadowOpacity: basicPlan ? 0.4 : 0},
                        {backgroundColor: basicPlan ? '#96C4EA' : '#999'},
                      ]}
                      onPress={handleBasicPlan}>
                      <Text style={styles.servicesDetail_containerButtonText}>
                        Básico
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.servicesDetail_containerButton,
                        {shadowOpacity: !plusPlan ? 0 : 0.4},
                        {backgroundColor: !plusPlan ? '#999' : '#96C4EA'},
                      ]}
                      onPress={handlePlusPlan}>
                      <Text style={styles.servicesDetail_containerButtonText}>
                        Plus
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {basicPlan && (
                    <CardPlans
                      idN={route.params?.id}
                      titleDescription={'Descripción'}
                      description={
                        route.params?.procedimientos[1].quirurgico.planes[0]
                          .planDescription
                      }
                      price={
                        route.params?.procedimientos[1].quirurgico.planes[0]
                          .planPrice
                      }
                      planN={'Básico'}
                      procedureTipeN={'Quirúrgico'}
                      backgroundImgN={route.params?.backgroundImg}
                      nameN={route.params?.name}
                      logoDetailN={route.params?.logoDetail}
                      logoIcon={route.params?.logo}
                    />
                  )}
                  {plusPlan && (
                    <CardPlans
                      idN={route.params?.id}
                      titleDescription={'Adicional'}
                      description={
                        route.params?.procedimientos[1].quirurgico.planes[1]
                          .planDescription
                      }
                      price={
                        route.params?.procedimientos[1].quirurgico.planes[1]
                          .planPrice
                      }
                      planN={'Plus'}
                      procedureTipeN={'Quirúrgico'}
                      backgroundImgN={route.params?.backgroundImg}
                      nameN={route.params?.name}
                      logoDetailN={route.params?.logoDetail}
                      logoIcon={route.params?.logo}
                    />
                  )}
                </View>
              )}
            </View>
          ) : (
            <View style={styles.servicesDetail_container_}>
              <View style={{height: '100%'}}>
                <CardPlansWebView
                  titleDescription={'Descripción'}
                  description={route.params?.descriptionL}
                  price={route.params?.price}
                  backgroundImg={route.params?.backgroundImg}
                  name={route.params?.name}
                  logoDetail={route.params?.logoDetail}
                  url={route.params?.url}
                  nameU={userData.name}
                  serviceU={route.params?.name}
                  logoIcon={route.params?.log}
                />
              </View>
            </View>
          )}
        </View>
        <View style={styles.servicesDetail_logo}>
          <Image
            style={styles.servicesDetail_logoImg}
            source={route.params?.logoDetail}
          />
        </View>
      </View>
    </BottomSheetModalProvider>
  );
};

export default ServicesDetail;

const styles = StyleSheet.create({
  servicesDetail: {
    height: Dimensions.get('window').height,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  servicesDetail_header: {
    height: 650,
    width: '100%',
  },
  servicesDetail_headerImgBackground: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  servicesDetail_Title: {
    marginTop: 65,
    color: 'white',
    fontSize: 25,
    fontWeight: '800',
    maxWidth: 280,
    textAlign: 'center',
    lineHeight: 25,
  },
  servicesDetail_container: {
    height: '75%',
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  servicesDetail_container_: {
    width: '85%',
    height: '100%',
    paddingTop: 40,
    position: 'relative',
  },
  servicesDetail_procedureTipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: 'black',
  },
  servicesDetail_procedureTipe: {
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(103, 108, 116, .3)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  servicesDetail_procedureTipe_: {
    width: '97%',
    height: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicesDetail_procedureSelected: {
    width: 150,
    height: '100%',
    backgroundColor: '#676C74',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  servicesDetail_procedureNoSelected: {
    width: 150,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  servicesDetail_containerTextTitle: {
    fontSize: 20,
    fontWeight: '500',
    paddingHorizontal: 5,
    color: 'black',
  },
  servicesDetail_containerButtons: {
    flexDirection: 'row',
  },
  servicesDetail_containerButton: {
    width: 80,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 5,
    backgroundColor: '#96C4EA',
    shadowColor: '#000',
    shadowOffset: {height: 3},
    shadowRadius: 3,
  },
  servicesDetail_containerButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  servicesDetail_logo: {
    position: 'absolute',
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    top: '18%',
  },
  servicesDetail_logoImg: {
    width: 70,
    height: 70,
  },
});
