import { View, StyleSheet, Pressable,ImageBackground, Alert, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Background from './assets/bg.jpeg';

const App = () => {

  const [current, setCurrent] = useState('x');

  const [multiArray, setMultiArray] = useState(
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]
  );

  useEffect(() => {
    if (current === "o") {
      botTurn();
    }
  }, [current])

  const onPressed = (rowIndex, columnIndex) => {

    if (multiArray[rowIndex][columnIndex]) {
      Alert.alert("Positon already occupied");
    } else {

      setMultiArray((multiArray) => {
        const updatedMap = [...multiArray];
        updatedMap[rowIndex][columnIndex] = current;
        return updatedMap;
      });

      setCurrent(current === 'x' ? 'o' : 'x');
    }

    const winner = getWinner();
    if (winner) {
      gameWon(winner);
    } else {
      checkTieState();
    }
  }

  const getWinner = () => {

    for (let row = 0; row < 3; row++) {
      const row_x_winner = multiArray[row].every((cell) => cell === 'x');
      const row_O_winner = multiArray[row].every((cell) => cell === 'o');


      if (row_x_winner) {
        return "X";
      }

      if (row_O_winner) {
        return "O";
      }

      const col_vlaue = multiArray[0][row];
      let col_winner = true;

      for (let col = 1; col < 3; col++) {
        if (multiArray[col][row] !== col_vlaue || col_vlaue === "") {
          col_winner = false;
          break;
        }
      }

      if (col_winner) {
        if (col_vlaue === 'x') {
          return 'X';
        } else {
          return 'O';
        }
      }

    }

    const diagonal_value = multiArray[0][0];
    let diagonal_winner = true;

    for (let k = 1; k < 3; k++) {

      if (multiArray[k][k] !== diagonal_value || diagonal_value === "") {
        diagonal_winner = false
        break
      }
    }

    if (diagonal_winner) {
      if (diagonal_value === 'x') {
        return 'X';
      } else {
        return 'O';
      }
    }

    const sub_diagonal_value = multiArray[0][2];
    let sub_diagonal_winner = true;

    for (let k = 1; k < 3; k++) {

      if (multiArray[k][2 - k] !== sub_diagonal_value || sub_diagonal_value === "") {
        sub_diagonal_winner = false
        break
      }
    }

    if (sub_diagonal_winner) {
      if (sub_diagonal_value === 'x') {
        return 'X';
      } else {
        return 'O';
      }
    }
  }

  const checkTieState = () => {

    let checkState = true

    for (let a = 0; a < 3; a++) {
      for (let b = 0; b < 3; b++) {
        if (multiArray[a][b] === "") {
          checkState = false
          break
        }
      }
      if (!checkState) {
        break
      }
    }

    if (checkState) {
      Alert.alert('It is a tie', 'tie', [
        {
          text: "Restart",
          onPress: resetGame
        }
      ]);
    }
  }


  const gameWon = (player) => {
    Alert.alert("Wow!", "Player " + player + " won.", [
      {
        text: 'Restart',
        onPress: resetGame
      }
    ]);
  }

  const resetGame = () => {
    setMultiArray(
      [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]
    )
    setCurrent("x")
  }

  const botTurn = () => {
    const possiblePositions = [];

    multiArray.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        if (column === "") {
          possiblePositions.push({ row: rowIndex, col: columnIndex });
        }
      })
    })

    const option = possiblePositions[Math.floor(Math.random() * possiblePositions.length)]
    onPressed(option.row, option.col)
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={Background} style={styles.background}>
        <Text style={styles.text}>Current Player : {current.toUpperCase()}</Text>
        <View style={styles.middle}>
          {
            multiArray.map((row, rowIndex) => (
              <View key={'row-' + rowIndex} style={styles.row}>
                {
                  row.map((column, columnIndex) => (
                    <Pressable onPress={() => onPressed(rowIndex, columnIndex)} key={'column-' + columnIndex} style={styles.cell}>
                      {
                        column === "o" && <View style={styles.circle} />
                      }

                      {
                        column === "x" &&
                        <View>
                          <View style={styles.cross} />
                          <View style={styles.crossLine} />
                        </View>
                      }
                    </Pressable>
                  ))
                }
              </View>
            ))
          }
        </View>
      </ImageBackground>
    </View >
  )
}

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
  middle: {
    width: '80%',
    aspectRatio: 1,
    // borderColor: '#fff',
    // borderWidth: 2
  },

  row: {
    flex: 1,
    flexDirection: 'row'
  },

  cell: {
    flex: 1,
    width: 100,
    height: 100,
    // borderColor: '#fff',
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    borderColor: '#fff',
    borderWidth: 2
  },
  cross: {
    height: 75,
    width: 5,
    backgroundColor: '#fff',
    transform: [
      {
        rotate: '45deg',
      }
    ]
  },

  crossLine: {
    position: 'absolute',
    height: 75,
    width: 5,
    backgroundColor: '#fff',
    transform: [
      {
        rotate: '-45deg',
      }
    ]
  },

  text: {
    position: 'absolute',
    top: 50,
    fontSize: 25,
    color: 'white',
  }
});

export default App