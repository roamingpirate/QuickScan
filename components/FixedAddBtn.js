import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const FixedAddBtn = ({onPress, isStudent}) => {
  return (
    <View style={isStudent ? styles.IconStudent : styles.Icon}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={'plus'} size={36} color="#2D9DAC" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  Icon: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
  IconStudent: {
    position: 'absolute',
    top: 60,
    right: 30,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
});

export default FixedAddBtn;
