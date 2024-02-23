import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Login from '../components/Login';
import InputBox from '../components/InputBox';
import ComboBox from '../components/ComboBox';
import DurationPicker from '../components/DurationPicker';
import getapiClient from '../api/apiClient';
import CountdownTimer from '../components/Timer';
import StudentStatusBox from '../components/StudentStatusBox';

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
    day < 10 ? '0' : ''
  }${day}`;
  return formattedDate;
}

const Btn = ({text, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const TextBox = ({value}) => {
  return (
    <View>
      <View style={styles.inputContainer}>
        <Icon name={'mail'} size={20} color="grey" style={styles.icon} />
        <Text style={styles.input}>{value}</Text>
      </View>
    </View>
  );
};

const AttendenceScreen = ({route, navigation}) => {
  const teacherID = route.params.teacherID;
  const className = route.params.className;
  const classCode = route.params.classCode;
  const subject = route.params.subject;
  const ClassID = route.params.classID;
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [active, setActive] = useState(false);
  const [classData, setClassData] = useState(null);
  const [studentsList, setStudentsList] = useState(null);
  const [presentStudentList, setPresentStudentList] = useState([]);

  const incrementDuration = () => {
    setDuration(duration + 1);
  };

  const decrementDuration = () => {
    if (duration > 1) {
      setDuration(duration - 1);
    }
  };

  const ActivateQR = async () => {
    const apiClient = await getapiClient();
    const response = await apiClient.get(
      'class/ActivateQR/' + ClassID + '?duration=' + duration,
    );
    console.log(response.data);
    setClassData(response.data);
    const resStudentList = await apiClient.get(
      `/class/getStudentsList/${response.data.classID}`,
    );
    setStudentsList(resStudentList.data);
    setActive(true);
  };

  const DeactivateQR = async () => {
    const apiClient = await getapiClient();
    const response = await apiClient.get('class/deactivateQR/' + ClassID);
    setActive(false);
    navigation.navigate('teacher');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = getCurrentDate();
        const apiClient = await getapiClient();
        const response = await apiClient.get(
          `/attendence/getClassAttendence/${ClassID}?date=${currentDate}`,
        );
        console.log(response.data);
        setPresentStudentList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 15000);
    return () => clearInterval(intervalId);
  }, []);

  const checkQRStatus = async () => {
    const apiClient = await getapiClient();
    const response = await apiClient.get('/class/' + ClassID);

    console.log('pompom');
    console.log(response.data.QRStatus);
    if (response.data.QRStatus === 'active') {
      setClassData(response.data);
      const resStudentList = await apiClient.get(
        `/class/getStudentsList/${response.data.classID}`,
      );
      setStudentsList(resStudentList.data);
      setActive(true);
    } else {
      setActive(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkQRStatus();
  }, []);

  const Heading = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Icon
            name="arrowleft"
            size={30}
            color="black"
            style={{width: 30, height: 30, marginTop: 5, marginRight: 10}}
          />
          <Text style={styles.Heading}>{className}</Text>
        </View>
        <View style={{marginTop: 15}}>
          <Text
            style={{
              fontSize: 30,
              color: 'black',
              fontWeight: 'bold',
            }}>
            QR Attendence
          </Text>
        </View>
      </View>
    );
  };

  const LinkText = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.LinkText}>Open</Text>
        <Text style={[styles.LinkText, {color: 'blue', fontWeight: 'bold'}]}>
          www.QuickScanQR.com
        </Text>
        <Text style={styles.LinkText}>To Display QR To Class</Text>
      </View>
    );
  };

  const SetupView = () => {
    return (
      <View>
        <View style={{}}>
          <TextBox value={className} />
          <TextBox value={classCode} />
          <TextBox value={subject} />
        </View>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            marginTop: 10,
            marginLeft: 15,
            fontWeight: 'bold',
          }}>
          Duration
        </Text>
        <View style={styles.container}>
          <TouchableOpacity onPress={decrementDuration} style={styles.button}>
            <Icon name={'minus'} size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.durationText}>{duration} min</Text>
          <TouchableOpacity onPress={incrementDuration} style={styles.button}>
            <Icon name={'plus'} size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Btn text="Activate QR" onPress={ActivateQR} style={{marginTop: 10}} />
      </View>
    );
  };

  const AttendenceView = () => {
    return (
      <ScrollView>
        <View>
          <View style={{}}>
            <TextBox value={className} />
          </View>
          <View style={{}}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '600',
                marginHorizontal: 15,
                marginBottom: 10,
              }}>
              Students Status
            </Text>
            {studentsList && (
              <StudentStatusBox
                studentsList={studentsList}
                presentStudentList={presentStudentList}
              />
            )}
            <CountdownTimer
              startTime={classData.QRActivationTime}
              duration={classData.duration}
            />
            <Text
              style={[
                styles.textstyle,
                {
                  fontWeight: 'regular',
                  fontSize: 16,
                  fontWeight: '500',
                  color: '#cf4a36',
                },
              ]}>
              ClassID : {ClassID}
            </Text>
            <Text style={styles.textstyle}>QR Code is active now!</Text>
            <LinkText />
            <Text
              style={[styles.textstyle, {fontWeight: 'regular', fontSize: 16}]}>
              Students can scan it to mark there Attendence
            </Text>
          </View>
          <TouchableOpacity
            style={styles.bton}
            onPress={() => {
              DeactivateQR();
            }}>
            <Text style={styles.buttonText}>Finalize Attendence</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <ScrollView>
      <View style={{marginTop: 5, marginHorizontal: 10}}>
        <Heading />
        <View>
          {loading ? (
            <ActivityIndicator
              style={{marginTop: 40}}
              size="large"
              color="#2D9DAC"
            />
          ) : (
            <View>{!active ? <SetupView /> : <AttendenceView />}</View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Heading: {
    fontSize: 26,
    fontFamily: 'Jura-Regular',
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 10,
    width: '95%',
    padding: 20,
    paddingLeft: 20,
    marginVertical: 15,
    paddingHorizontal: 5,
  },
  input: {
    flex: 1,
    fontFamily: 'AbrilFatface-Regular',
    paddingLeft: 10,
    paddingRight: 10,
    color: 'grey',
  },
  bton: {
    alignSelf: 'center',
    width: '60%',
    height: 45,
    marginRight: 5,
    marginTop: 30,
    backgroundColor: '#2D9DAC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '40%',
    height: 45,
    marginRight: 5,
    marginTop: 90,
    backgroundColor: '#2D9DAC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'AbrilFatface-Regular',
  },
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
  textstyle: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  LinkText: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 5,
  },
});

export default AttendenceScreen;
