import React, {useState, useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const DurationPicker = ({setTime}) => {
  const [duration1, setDuration1] = useState(1);

  const incrementDuration = () => {
    setDuration1(duration1 + 1);
    setTime(duration1);
  };

  const decrementDuration = () => {
    if (duration1 > 1) {
      setDuration1(duration1 - 1);
      setTime(duration1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={decrementDuration} style={styles.button}>
        <Icon name={'minus'} size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.durationText}>{duration1} min</Text>
      <TouchableOpacity onPress={incrementDuration} style={styles.button}>
        <Icon name={'plus'} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    borderColor: 'grey',
    borderWidth: 0.5,
    width: '40%',
    padding: 5,
    borderRadius: 15,
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '25%',
    height: 40,
    backgroundColor: '#2D9DAC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  durationText: {
    fontSize: 20,
    color: 'black',
    marginTop: 4,
    fontFamily: 'AbrilFatface-Regular',
    marginHorizontal: 10,
  },
});

export default DurationPicker;
