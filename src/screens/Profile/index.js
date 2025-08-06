import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'

const Profile = () => {
  const {logout, userData} = useContext(AuthContext)

  return (
    <View style={styles.profile}>
      <Text>Nombre</Text>
      <Text style={styles.profile_name}>{userData.name}</Text>
      <TouchableOpacity onPress={() => {logout()}} style={styles.profile_logoutButton}>
        <Text style={styles.profile_logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  profile: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profile_name: {
    fontSize: 30,
    fontWeight: '600',
    textTransform: 'capitalize',
    marginBottom: 50
  },
  profile_logoutButton: {
    width: '70%',
    height: 60,
    backgroundColor: '#1B7BCC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    shadowOffset: {height: 4},
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  profile_logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
})