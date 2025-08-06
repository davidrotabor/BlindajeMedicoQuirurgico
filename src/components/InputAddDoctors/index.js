import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import React from 'react';
import {SearchNormal1} from 'iconsax-react-native';

const InputAddDoctors = ({value, onChangeText, load}) => {
  return (
    <View style={styles.inputAddDoctors}>
      <View style={styles.inputAddDoctors_inputContainer}>
        <View style={styles.inputAddDoctors_inputContainer_}>
          <View style={styles.inputAddDoctors_inputView}>
            <TextInput
              style={styles.inputAddDoctors_input}
              placeholder="Nombre Completo"
              placeholderTextColor="black"
              value={value}
              onChangeText={onChangeText}
            />
          </View>
          <View>
            {load ? (
              <ActivityIndicator />
            ) : (
              <SearchNormal1 size={20} color="black" />
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default InputAddDoctors;

const styles = StyleSheet.create({
  inputAddDoctors_inputContainer: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(27, 123, 204, .5)',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  inputAddDoctors_inputContainer_: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputAddDoctors_inputView: {
    width: '90%',
  },
  inputAddDoctors_input: {
    height: 50,
    fontSize: 14,
  },
});
