import { Text, View, StyleSheet,Alert } from "react-native"
import Title from "../components/ui/Title"
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer"
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";

let minBoundary = 1
let maxBoundary = 100

function generateRandomBetweenMaxAndMin(min, max, exclude){
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if(rndNum === exclude){
        return generateRandomBetweenMaxAndMin(min, max, exclude); 
    }else {
        return rndNum
    }
 }

function GameScreen({userNumber, onGameOver}){
    const initialGuess = generateRandomBetweenMaxAndMin(1,100,userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver()
        }
    },[currentGuess, userNumber,onGameOver])

    function nextGuessHandler(direction){
        // 添加边界条件 
        if(direction === 'lower' && currentGuess < userNumber || 
        direction === 'greater' && currentGuess > userNumber
        ){
            // 错误提示 
            Alert.alert("Don't lie!", "You know that this is wrong..."),
            [{
                text:'Sorry',
                style:'cancel'
            }]
            return
        }


        if(direction === 'lower'){
            maxBoundary = currentGuess
        }else{
            minBoundary = currentGuess + 1
        }

        const newNumber = generateRandomBetweenMaxAndMin(minBoundary, maxBoundary, currentGuess)

        setCurrentGuess(newNumber)
     }

    return <View style={styles.container}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText>Higher or lower?</InstructionText>
            <View>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>-</PrimaryButton>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>+</PrimaryButton>
            </View>
        </Card>
    </View>
}

export default GameScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
    }
})