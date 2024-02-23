import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Login from '../components/Login';
import getapiClient from '../api/apiClient';
import {saveTokenToStorage} from '../Utils/TokenStorage';
import {useIsFocused} from '@react-navigation/native';
import UserDetailBox from '../components/UserDetailBox';
import FixedAddBtn from '../components/FixedAddBtn';
import ClassroomBox from '../components/ClassroomBox';
import QrScanBtn from '../components/QrScanBtn';

const StudentDashboard = ({navigation}) => {
  const [studentData, setStudentData] = useState('');
  const [classList, setClassList] = useState([]);
  const isFocused = useIsFocused();

  const getStudentData = async () => {
    const apiClient = await getapiClient();
    const response = await apiClient.get('/student/getData');
    const studentData = response.data;
    setStudentData(studentData);
    setClassList(studentData.classesJoined);
    console.log(studentData);
  };

  useEffect(() => {
    getStudentData();
  }, [isFocused]);

  return (
    <View>
      <UserDetailBox
        name={studentData ? studentData.name : ''}
        email={studentData ? studentData.email : ''}
        accountType="Student"
      />
      <FixedAddBtn
        isStudent={true}
        onPress={() =>
          navigation.navigate('JoinClass', {studentID: studentData.studentID})
        }
      />
      {studentData && (
        <QrScanBtn
          onPress={() =>
            navigation.navigate('QRScan', {studentID: studentData.studentID})
          }
        />
      )}
      <ScrollView style={{height: '75%'}}>
        {classList.map((classID, index) => (
          <ClassroomBox
            classID={classID}
            navigation={navigation}
            isStudent={true}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default StudentDashboard;
