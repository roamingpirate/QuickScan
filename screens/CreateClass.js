import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import InputBox from '../components/InputBox';
import getapiClient from '../api/apiClient';

const Btn = ({text, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const CreateClass = ({route, navigation}) => {
  const [className, setClassName] = useState('AI');
  const [classCode, setClassCode] = useState('');
  const [subject, setSubject] = useState('');
  const teacherID = route.params.teacherID;
  const [isCreated, setIsCreated] = useState(false);

  const createNewClass = async () => {
    const apiClient = await getapiClient();

    const data = {
      className: className,
      classCode: classCode,
      subject: subject,
      teacherID: teacherID,
    };
    console.log(data);

    const response = await apiClient.post('/class/create', data);
    console.log(response.data);
    setIsCreated(true);
  };

  return (
    <View style={styles.Container}>
      {!isCreated ? (
        <View>
          <Text style={styles.Heading}>Create Class</Text>
          <Text style={[styles.Heading, {fontSize: 25, marginBottom: 15}]}>
            Enter Details
          </Text>
          <Text style={styles.text}>{` Class Name`}</Text>
          <InputBox
            style={styles.input}
            iconLeft="mail"
            placeholder="Enter Class Name"
            onChangeText={setClassName}
          />
          <Text style={styles.text}>{` Class Code`}</Text>
          <InputBox
            style={styles.input}
            iconLeft="mail"
            placeholder="Enter Class Code"
            onChangeText={setClassCode}
          />
          <Text style={styles.text}>{` Subject`}</Text>
          <InputBox
            style={styles.input}
            iconLeft="mail"
            placeholder="Enter Subject"
            onChangeText={setSubject}
          />
          <Btn text="Submit" onPress={createNewClass} />
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
            {className} Class created successfully!
          </Text>
          <Btn text="Done" onPress={() => navigation.navigate('teacher')} />
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
});

export default CreateClass;
