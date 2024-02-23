import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const QrScanBtn = ({onPress}) => {
  return (
    <View style={styles.Icon}>
      <TouchableOpacity onPress={onPress}>
        <Icon name={'qrcode'} size={40} color="white" />
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
    right: '45%',
    zIndex: 1,
    backgroundColor: '#2D9DAC',
    padding: 10,
    borderRadius: 50,
    elevation: 5,
  },
});

export default QrScanBtn;
