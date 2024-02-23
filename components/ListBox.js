import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Table, Row, Rows} from 'react-native-table-component';
import getapiClient from '../api/apiClient';

const ListBox = ({tableHeaders, classID}) => {
  const [tableData, setTableData] = useState([]);

  const getList = async () => {
    console.log(classID);
    let dataList = [];
    const apiClient = await getapiClient();
    const resp = await apiClient.get(`/class/getStudentsList/${classID}`);
    console.log(resp.data);
    const studentList = resp.data;

    const fetchStudentData = async (studentID, rollNo) => {
      const response = await apiClient.get(
        `/student/getData?studentID=${studentID}`,
      );
      console.log('bauaa');
      console.log(response.data);
      return [rollNo, response.data.name, response.data.instituteID];
    };

    for (let i = 0; i < studentList.length; i++) {
      const rollNo = studentList[i].rollNo;
      const studentID = studentList[i].studentID;
      console.log(rollNo);
      const dt = await fetchStudentData(studentID, rollNo);
      dataList.push(dt);
    }
    setTableData(dataList);
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <View style={styles.container}>
      <Table>
        <Row
          data={tableHeaders}
          style={styles.head}
          textStyle={[
            styles.text,
            {color: 'white', fontFamily: 'AbrilFatface-Regular'},
          ]}
        />
        <ScrollView>
          <Rows
            data={tableData}
            textStyle={[styles.text, {fontWeight: 'bold'}]}
          />
        </ScrollView>
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingTop: 10,
    //backgroundColor: '#2D9DAC',
    height: '82%',
    borderRadius: 2,
  },
  head: {height: 40, backgroundColor: '#2D9DAC', borderRadius: 5},
  text: {
    margin: 6,
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
});

export default ListBox;
