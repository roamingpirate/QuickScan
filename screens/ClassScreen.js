import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import InputBox from '../components/InputBox';
import getapiClient from '../api/apiClient';
import {MissingIcon} from '@react-navigation/elements';
import Icon from 'react-native-vector-icons/AntDesign';
import Calendar from 'react-native-calendars/src/calendar';
import AttendenceBox from '../components/AttendenceBox';
import ListBox from '../components/ListBox';

const Btn = ({text, onPress}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const ClassScreen = ({route, navigation}) => {
  console.log(route);
  const teacherID = route.params.teacherID;
  const className = route.params.className;
  const classCode = route.params.classCode;
  const subject = route.params.subject;
  const classID = route.params.classID;
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );
  const [isARView, setIsARView] = useState(true);
  const tableHeaders = ['Roll No', 'Name', 'InstituteID'];

  const ARView = () => {
    const ModifiedDate = date => {
      const month = [
        '',
        'January',
        'Feburay',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const [Y, M, D] = date.split('-');

      return D + ' ' + month[parseInt(M)] + ' ' + Y;
    };
    const [present, setPresent] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      const fetchData = async () => {
        const apiClient = await getapiClient();
        let t = (
          await apiClient.get(`/attendence/getClassTotalStudent/${classID}`)
        ).data;
        let p = (
          await apiClient.get(
            `/attendence/getClassPresentStudent/${classID}?date=${selectedDate}`,
          )
        ).data;
        console.log('baba ' + selectedDate + ' ' + p);
        setPresent(parseInt(p));
        setTotal(parseInt(t));
      };
      fetchData();
    }, [selectedDate]);

    return (
      <View>
        <Text style={{fontSize: 30, color: 'black', marginTop: 15}}>
          Attendence Record
        </Text>
        <Calendar
          style={{
            marginTop: 20,
            borderRadius: 12,
            borderWidth: 0.5,
            borderColor: 'grey',
          }}
          current={selectedDate} // Set the current visible month based on selectedDate
          onDayPress={day => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {selected: true, selectedColor: '#2D9DAC'},
          }}
        />
        <Text style={{fontSize: 20, color: 'black', marginTop: 15}}>
          {ModifiedDate(selectedDate)}
        </Text>
        <AttendenceBox present={present} total={total} />
        <Btn text="View Record" />
      </View>
    );
  };

  const StudentListView = () => {
    return (
      <View>
        <Text style={{fontSize: 26, color: 'black', marginTop: 15}}>
          Students List
        </Text>
        <ListBox tableHeaders={tableHeaders} classID={classID} />
      </View>
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setIsARView(true)}>
          <Icon name="calendar" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsARView(false)}>
          <Icon name="user" size={28} color="black" />
        </TouchableOpacity>
      </View>
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
        {isARView ? <ARView /> : <StudentListView />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  Heading: {
    fontSize: 26,
    fontFamily: 'Jura-Regular',
    color: 'black',
  },
  button: {
    alignSelf: 'center',
    width: '40%',
    height: 45,
    marginRight: 15,
    marginTop: 20,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'grey',
    paddingVertical: 10,
    position: 'absolute',
    marginBottom: 5,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default ClassScreen;
