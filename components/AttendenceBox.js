import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const Line = () => {
  return (
    <View
      style={{
        borderLeftWidth: 1,
        borderColor: 'white',
        height: '60%',
        marginHorizontal: 30,
      }}
    />
  );
};

const Data = ({count, text}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
        {count}
      </Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
        {text}
      </Text>
    </View>
  );
};

const AttendenceBox = ({present, absent, total}) => {
  return (
    <View style={styles.container}>
      <Data count={present} text="Present" />
      <Line />
      <Data count={total - present} text="Absent" />
      <Line />
      <Data count={total} text="Total" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    height: 100,
    backgroundColor: '#2D9DAC',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AttendenceBox;
