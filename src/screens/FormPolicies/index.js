import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'

const FormPolicies = ({ route }) => {
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Formulario',
      headerTintColor: 'black',
      headerBackTitleVisible: false
    })
  }, [navigation])

  useEffect(() => {

  }, [])

  return (
    <View style={styles.formPolices}>
      <View style={styles.formPolices_container}>
        {route.params?.url !== '' ?
          <WebView style={styles.formPolicies_webView} source={{ uri: route.params?.url }} onLoad={console.log('Cargando')} />
          :
          <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text>No tengo Uri</Text>
          </View>
        }
      </View>
    </View>
  )
}

export default FormPolicies

const styles = StyleSheet.create({
  formPolices: {
    flex: 1,
  },
  formPolices_container: {
    flex: 1,
  },
})