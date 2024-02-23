import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const InputBox = ({iconLeft, placeholder, onChangeText, value, isPassword,isNum}) => {
  const [showPassword, setShowPassword] = useState(!isPassword);
  return (
    <View>
      <View style={styles.inputContainer}>
        {iconLeft && (
          <Icon name={iconLeft} size={20} color="black" style={styles.icon} />
        )}
        <TextInput
          keyboardType={isNum? 'numeric': 'default'}
          style={styles.input}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={!showPassword}
          placeholderTextColor="grey"
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eye-with-line'}
              size={20}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    fontFamily: 'AbrilFatface-Regular',
    paddingLeft: 10,
    paddingRight: 10,
    color: 'black',
  },
  icon: {
    marginHorizontal: 5,
  },
});

export default InputBox;
