import React,{useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View} from 'react-native';

//Create a new variable named originalData
let originalData = [];

const App = () => {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
      //Add fetch() - Exercise 1A
      fetch("https://jsonplaceholder.typicode.com/albums")
          .then((response) => {
              return response.json()
          })
          .then((myJSON) => {
              if(originalData.length < 1) {
                  setMyData(myJSON);
                  originalData = myJSON;
              }
          })
  }, []);

  const FilterData = (text) => {
      if(text!='') {
          let myFilteredData = originalData.filter((item) =>
              item.title.includes(text));
          setMyData(myFilteredData);
      }
      else {
          setMyData(originalData);
      }
  }
  const renderItem = ({item, index}) => {
    return (
    <View>
    <Text style={{borderWidth:1}}>{item.title}</Text>
    </View>
    );
  };

  return (
    <View>
      <StatusBar/>
      <Text>Search:</Text>
      <TextInput style={{borderWidth:1}} onChangeText={(text) => {FilterData(text)}}/>
      <FlatList data={myData} renderItem={renderItem} />
    </View>
  );
}

export default App;
