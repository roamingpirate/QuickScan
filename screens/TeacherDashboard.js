import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Login from '../components/Login';
import UserDetailBox from '../components/UserDetailBox';
import ClassroomBox from '../components/ClassroomBox';
import FixedAddBtn from '../components/FixedAddBtn';
import getapiClient from '../api/apiClient';
import {saveTokenToStorage} from '../Utils/TokenStorage';
import {useIsFocused} from '@react-navigation/native';

const TeacherDashboard = ({navigation}) => {
  const [teacherData, setTeacherData] = useState('');
  const [classList, setClassList] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(true);

  const getTeacherData = async () => {
    const apiClient = await getapiClient();
    const response = await apiClient.get('/teacher/getData');
    const teacherData = response.data;
    console.log(teacherData);
    setTeacherData(teacherData);
    setClassList(teacherData.classesCreated);
    setLoading(false);
  };

  useEffect(() => {
    getTeacherData();
  }, [isFocused]);

  return (
    <>
      {!isLoading ? (
        <View>
          <UserDetailBox
            name={teacherData ? teacherData.name : ''}
            email={teacherData ? teacherData.email : ''}
            accountType="teacher"
          />
          <FixedAddBtn
            onPress={() =>
              navigation.navigate('CreateClass', {
                teacherID: teacherData.teacherID,
              })
            }
          />
          <ScrollView style={{height: '75%'}}>
            {classList.map((classID, index) => (
              <ClassroomBox classID={classID} navigation={navigation} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={{justifyContent: 'center', flex: 1}}>
          <ActivityIndicator size={50} color="#2D9DAC" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default TeacherDashboard;
