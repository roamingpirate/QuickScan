import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import QRCodeReader from '../components/QrCodeScanner';
import InputBox from '../components/InputBox';
import {SelectList} from 'react-native-dropdown-select-list';
import {getTokenFromStorage, saveTokenToStorage} from '../Utils/TokenStorage';
import axios from 'axios';
import getapiClient from '../api/apiClient';
import {useIsFocused} from '@react-navigation/native';

const Btn = ({text, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const Welcome = ({navigation}) => {
  const [accountType, setAccountType] = useState('');
  const [degree, setDegree] = useState(null);
  const [rollNo, setRollNo] = useState(null);
  const [instituteID, setInstituteId] = useState('');
  const [department, setDepartment] = useState('');
  const [userData, setUserData] = useState(null);
  const [formVisibility, setFormVisibility] = useState(false);
  const [mssg, setMssg] = useState('');
  const [name, setName] = useState('');
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(true);

  const navigateFunc = () => {
    if (accountType === 'student') {
      navigation.navigate('student');
    } else {
      navigation.navigate('teacher');
    }
  };

  const registerData = async () => {
    const Data = {
      instituteID: instituteID,
      department: department,
      ...(rollNo ? {rollNo: rollNo} : {}),
      ...(degree ? {degree: degree} : {}),
    };

    console.log(Data);
    try {
      const apiClient = await getapiClient();
      const response = await apiClient.post(
        '/' + accountType + '/register',
        Data,
      );
      console.log(response);
      setMssg('All Set!');
      setFormVisibility(false);
    } catch (e) {
      setMssg('An Error Occured! Try Again!');
    }
  };

  const getUserData = async () => {
    console.log('jello');
    const token = await getTokenFromStorage();
    console.log(token);
    const apiClient = await getapiClient();
    const userData = await apiClient.get('/user/getUser');
    console.log(userData.data);
    await UpdateFormVisibility(userData.data);
  };

  const UpdateFormVisibility = async user => {
    console.log('mello');
    console.log(user.accountType);
    setName(user.name);
    setAccountType(user.accountType);
    try {
      const apiClient = await getapiClient();
      const response = await apiClient.get(
        '/' + user.accountType + '/isRegistered',
      );
      const isRegistered = response.data;
      setFormVisibility(!isRegistered);
      console.log(isRegistered);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserData();
  }, [isFocused]);

  return (
    <>
      {!isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', marginHorizontal: 20}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.heading}>{`Welcome, ${
              name ? name : ''
            }!`}</Text>
            <Text style={styles.text}>
              {` You have been logged in successfully.`}
            </Text>
          </View>
          {formVisibility ? (
            <View>
              <Text style={styles.heading}>{` Fill in the details below`}</Text>
              <Text style={styles.text}>{` Department Name`}</Text>
              <InputBox
                iconLeft="open-book"
                placeholder="Enter Deparment Name"
                onChangeText={setDepartment}
              />
              <Text style={styles.text}>{` Institute ID`}</Text>
              <InputBox
                iconLeft="open-book"
                placeholder="Enter Institute ID"
                onChangeText={setInstituteId}
              />
              {accountType === 'student' && (
                <View>
                  <Text style={styles.text}>{` Degree`}</Text>
                  <InputBox
                    iconLeft="open-book"
                    placeholder="Enter Degree"
                    onChangeText={setDegree}
                  />
                  <Text style={styles.text}>{` Roll Number`}</Text>
                  <InputBox
                    iconLeft="open-book"
                    placeholder="Enter Roll Number"
                    onChangeText={setRollNo}
                  />
                </View>
              )}
              <Btn
                text="Submit"
                onPress={() => {
                  registerData();
                }}
              />
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <Btn text="Continue" onPress={navigateFunc} />
            </View>
          )}
          <View style={{alignItems: 'center'}}>
            {mssg && <Text style={styles.text}>{mssg}</Text>}
          </View>
        </View>
      ) : (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size={50} color="#2D9DAC" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'AbrilFatface-Regular',
    fontSize: 32,
    color: '#52504F',
    paddingVertical: 5,
  },
  text: {
    fontFamily: 'AbrilFatface-Regular',
    fontSize: 16,
    color: '#52504F',
    paddingVertical: 5,
  },
  button: {
    alignSelf: 'center',
    width: '95%',
    height: 45,
    marginRight: 15,
    marginTop: 10,
    backgroundColor: '#6635BF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'AbrilFatface-Regular',
  },
});

export default Welcome;
