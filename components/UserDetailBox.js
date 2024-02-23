import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const UserDetailBox = ({name, email, accountType}) => {
  return (
    <View>
      <Text style={styles.Welcome}>Welcome</Text>
      <View style={{flexDirection: 'row', marginLeft: 10}}>
        <Image
          source={require('../assets/images/teacher.jpeg')}
          style={styles.image}
        />
        <View style={{paddingHorizontal: 10}}>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>{name}</Text>
          <Text style={styles.text}>{email}</Text>
          <Text
            style={[
              styles.text,
              {
                color: accountType === 'teacher' ? '#CB1111' : 'green',
                fontWeight: 'bold',
              },
            ]}>
            {accountType}
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  Welcome: {
    fontFamily: 'JustMeAgainDownHere-Regular',
    fontSize: 40,
    marginLeft: 20,
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    resizeMode: 'cover',
    borderWidth: 0.5,
    borderColor: 'black',
  },
  line: {
    width: '90%',
    height: 0.5,
    backgroundColor: 'grey',
    margin: 20,
  },
});

export default UserDetailBox;
