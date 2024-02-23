import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import getapiClient from '../api/apiClient';

const ClassroomBox = ({classID, navigation, isStudent}) => {
  const [classData, setClassData] = useState();

  const getClassData = async () => {
    const apiClient = await getapiClient();
    const response = await apiClient.get('class/' + classID);
    console.log('JELLO MELLO');
    console.log(response.data);
    setClassData(response.data);
  };

  useEffect(() => {
    getClassData();
  }, [classID]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Class', classData);
      }}>
      <View style={styles.Box}>
        <Text
          style={{fontSize: 23, color: 'white', marginLeft: 15, marginTop: 15}}>
          {classData ? classData.className : ''}
        </Text>
        <Text style={{fontSize: 20, color: 'white', marginLeft: 15}}>
          {classData ? classData.classID : ''}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginHorizontal: 15,
            justifyContent: 'space-between',
          }}>
          {!isStudent && (
            <TouchableOpacity
              style={styles.Btn}
              onPress={() => {
                navigation.navigate('Attendence', classData);
              }}>
              <Text style={{fontSize: 15, color: 'black', padding: 5}}>
                Take Attendence
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Box: {
    width: '90%',
    height: 150,
    backgroundColor: '#2D9DAC',
    borderRadius: 10,
    margin: 20,
  },
  Btn: {
    width: '40%',
    backgroundColor: 'white',
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default ClassroomBox;
