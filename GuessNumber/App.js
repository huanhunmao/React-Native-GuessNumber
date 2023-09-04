import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen'
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import Color from './constants/color';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [gameOver, setGameOver] = useState(true)

  function pickedUserNumber(pickedNumber) {
    setUserNumber(pickedNumber)
    setGameOver(false)
  }

  function onGameOverHandler(){
    setGameOver(true)
  }

  let screen = <StartGameScreen  onPress={pickedUserNumber}/>

  if(userNumber){
    screen = <GameScreen userNumber={userNumber}  onGameOver={onGameOverHandler}/>
  }

  if(gameOver && userNumber){
    screen = <GameOverScreen/>
  }

  return (
    <LinearGradient 
    style={styles.rootScreen}
    colors={[Color.primary700, Color.accent500]}
    >
        <ImageBackground 
        source={require('./assets/images/background.png')}
        resizeMode='cover' 
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
        >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    rootScreen:{
        flex:1, // 占据的空间 
    },
    backgroundImage:{
        opacity:0.15
    }
});
