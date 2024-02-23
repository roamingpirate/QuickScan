import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';

const StudentCircle = ({studentData, presentStudentList}) => {
    console.log("jello")
  console.log(presentStudentList);
  const isMarked = presentStudentList.includes(studentData.studentID);
  return (
    <View style={[styles.circle, isMarked ? {backgroundColor: '#10c440'} : {}]}>
      <Text style={[styles.text, isMarked ? {color: 'white'} : {}]}>
        {studentData.rollNo}
      </Text>
    </View>
  );
};

const StudentCircleRow = ({studentsList, presentStudentList}) => {
  return (
    <View style={styles.row}>
      {studentsList.map((studentData, index) => (
        <StudentCircle
          key={index}
          studentData={studentData}
          presentStudentList={presentStudentList}
        />
      ))}
    </View>
  );
};

const StudentCircleGrid = ({studentsList, presentStudentList}) => {
  return (
    <View style={styles.gridContainer}>
      {studentsList.map((row, index) => (
        <StudentCircleRow
          key={index}
          studentsList={row}
          presentStudentList={presentStudentList}
        />
      ))}
    </View>
  );
};

const StudentStatusBox = ({studentsList, presentStudentList}) => {
  console.log(studentsList);

  const circlesPerRow = 5;
  const circlesPerGrid = 25;
  const numGrids = Math.ceil(studentsList.length / circlesPerGrid);
  const scroll = studentsList.length > 25;

  const grids = [];
  for (let i = 0; i < numGrids; i++) {
    const startIndex = i * circlesPerGrid;
    const endIndex = Math.min(startIndex + circlesPerGrid, studentsList.length);
    const studentsInGrid = studentsList.slice(startIndex, endIndex);
    const rows = [];
    for (let j = 0; j < studentsInGrid.length; j += circlesPerRow) {
      rows.push(studentsInGrid.slice(j, j + circlesPerRow));
    }
    grids.push(
      <StudentCircleGrid
        key={i}
        studentsList={rows}
        presentStudentList={presentStudentList}
      />,
    );
  }

  return (
    <ScrollView horizontal scrollEnabled={scroll}>
      {grids}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'column',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    height: 270,
    width: 300,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  circle: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
});

export default StudentStatusBox;
