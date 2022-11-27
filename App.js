import React, { useState } from 'react';
import Background from './assets/bg.jpeg';

import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {


  const [map,setMap] = useState([
    ["o","",""],
    ["","x",""],
    ["","","x"],
  ]);

  return (
    <View style={styles.container}>
      <ImageBackground source={Background} style={styles.background}>
        <View style={styles.map}>
          {
            map.map((row)=>(
              <View style={styles.row}>
                {row.map((cell)=>(
                <View style={styles.cell}>
                  <View style={styles.circle}/>
                </View>
                ))}
              </View>
            ))
          }
          {/* <View style={styles.circle}/>
          <View style={styles.cross}>
            <View style={styles.crossLine}></View>
            <View style={[styles.crossLine, styles.crossLineReversed]}></View>
          </View> */}
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
    // position: 'absolute',
    // left: 1*100,
    // right: 1* 100,
    width: 75,
    height: 75,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 10,
    margin:10
  },

  cross:{
    backgroundColor:'red',
    width:75,
    height:75
  },

  crossLine: {
    position: 'absolute',
    left:32.5,
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
  },
  cell:{
    width:100,
    height:100,
    flex:1,
    borderColor:'red',
    borderWidth:1
  },

  row:{
    flex:1,
    flexDirection:'row',
    // borderColor:'red',
    // borderWidth: 2,
  }

});

export default App;
