import React from 'react';
import Background from './assets/bg.jpeg';

import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={Background} style={styles.background}>
        <View style={styles.map}>
          <View style={styles.circle}/>
          <View>
            <View style={styles.crossLine}></View>
            <View style={[styles.crossLine, styles.crossLineReversed]}></View>
          </View>
        </View>
      </ImageBackground>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 10
  },

  crossLine: {
    position: 'absolute',
    width: 10,
    height: 75,
    backgroundColor: "white",
    transform: [
      {
        rotate: '45deg'
      }
    ]
  },
  crossLineReversed: {
    transform: [
      {
        rotate: '-45deg'
      }
    ]
  },
  map:{
    borderWidth: 1,
    borderColor:"white",
    width: "80%",
    aspectRatio: 1
  }

});

export default App;
