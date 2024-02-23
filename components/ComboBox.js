import React, {useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import Icon from 'react-native-vector-icons/Entypo';

const ComboBox = ({onChangeData, InData, placeholder}) => {
  const [selected, setSelected] = React.useState('');

  const data = [
    {key: '1', value: 'NIT Jalandhar'},
    {key: '2', value: 'LPU University'},
    {key: '3', value: 'Thapar University'},
    {key: '4', value: 'NIT Jaipur'},
    {key: '5', value: 'IIT Delhi'},
  ];

  return (
    <SelectList
      setSelected={val => setSelected(val)}
      data={InData ? InData : data}
      onSelect={() => onChangeData(selected)}
      arrowicon={<Icon name={'open-book'} size={20} color="black" />}
      placeholder={placeholder ? placeholder : 'Institute Name'}
      save="value"
    />
  );
};

export default ComboBox;
