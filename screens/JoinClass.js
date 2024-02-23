import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import InputBox from '../components/InputBox';
import getapiClient from '../api/apiClient';
import Icon from 'react-native-vector-icons/Entypo';

const Btn = ({text, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const JoinClass = ({route, navigation}) => {
  const [classID, setClassID] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [className, setClassName]=useState('');
  const studentID = route.params.studentID;
  const [isJoined, setIsJoined] = useState(false);
  const [err, setErr] = useState('');

  const joinClassFunc = async () => {
    setErr('');
    if (!classID || !rollNo) {
      console.log('eleo');
      setErr('Enter Class ID and Roll Number');
      return;
    }
    try {
      const apiClient = await getapiClient();
      const response = await apiClient.get(
        `/class/addStudent/${classID}?studentID=${studentID}&rollNo=${rollNo}`,
      );
      console.log(response);
      if (response.data.message) {
        setErr(response.data.message);
      } else {
        setIsJoined(true);
        setClassName(response.data.className);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.Container}>
      {!isJoined ? (
        <View>
          <Text style={styles.Heading}>Join Class</Text>
          <Text style={[styles.Heading, {fontSize: 25, marginBottom: 15}]}>
            Enter Details
          </Text>
          <Text style={styles.text}>{`ClassID`}</Text>
          <InputBox
            style={styles.input}
            iconLeft="mail"
            placeholder="Enter ClassID"
            onChangeText={setClassID}
          />
          <Text style={styles.text}>{`Class Roll No.`}</Text>
          <InputBox
            isNum={true}
            style={styles.input}
            iconLeft="mail"
            placeholder="Enter Your Roll No. in Class"
            onChangeText={setRollNo}
          />
          {err ? (
            <View style={styles.errorContainer}>
              <Icon name="circle-with-cross" size={20} color="#DB1F2D" />
              <Text style={styles.errorText}>{err}</Text>
            </View>
          ) : null}
          <Btn
            text="Submit"
            onPress={() => {
              joinClassFunc();
            }}
          />
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/images/fireworks.png')}
            style={styles.logo}
          />
          <Text
            style={[
              styles.Heading,
              {fontSize: 25, marginTop: 20, textAlign: 'center'},
            ]}>
            {className} Class Joined successfully!
          </Text>
          <Btn text="Done" onPress={() => navigation.navigate('student')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  Heading: {
    fontSize: 36,
    fontFamily: 'Jura-Regular',
    color: 'black',
  },
  button: {
    alignSelf: 'center',
    width: '55%',
    height: 45,
    marginRight: 15,
    marginTop: 20,
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
  text: {
    fontFamily: 'AbrilFatface-Regular',
    fontSize: 16,
    color: '#52504F',
    paddingVertical: 5,
  },
  logo: {
    width: 128,
    height: 128,
  },
  errorText: {
    color: '#DB1F2D',
    marginBottom: 0,
    marginLeft: 10,
    fontFamily: 'AbrilFatface-Regular',
    fontWeight: 'bold',
  },
  errorContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    marginLeft: 10,
  },
});

export default JoinClass;
