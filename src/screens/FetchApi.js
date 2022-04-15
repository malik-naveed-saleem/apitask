import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from '../style/FetchApiStyles';

App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reactnative.dev/movies.json');
      const json = await response.json();
      console.log(json);
      setData(json.movies);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  // const addData = () => {
  //   fetch('https://reactnative.dev/movies.json', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       firstParam: 'yourValue',
  //       secondParam: 'yourOtherValue',
  //     }),
  //   });
  // };
  // console.log(json);

  return (
    <View style={[styles.viewStyle]}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}, index) => id}
          renderItem={({item}) => (
            <>
              <Text style={[styles.idStyle]}>id is {item.id}</Text>
              <Text style={[styles.txtStyle]}>
                {item.title}, {item.releaseYear}
              </Text>
            </>
          )}
        />
      )}
      {/* <TouchableOpacity onPress={addData}>
        <Text>Touch me</Text>
      </TouchableOpacity> */}
    </View>
  );
};
export default App;
