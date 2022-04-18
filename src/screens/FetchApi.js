import React, {useEffect, useState} from 'react';

import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import styles from '../style/FetchApiStyles';

App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users');
      const json = await response.json();
      console.log(json.data);
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

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
              <Text style={[styles.idStyle]}>{`id ${item.id} detail`}</Text>

              <View style={styles.main_view}>
                <Text style={[styles.txtStyle]}>
                  {`First name => ${item.first_name}`}
                </Text>
                <Text style={[styles.txtStyle]}>
                  {`last name => ${item.last_name}`}
                </Text>
                <Text style={[styles.txtStyle]}>{item.email}</Text>
              </View>
            </>
          )}
        />
      )}
    </View>
  );
};
export default App;
