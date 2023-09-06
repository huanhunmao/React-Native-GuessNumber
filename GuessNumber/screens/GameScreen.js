import { Text, View, StyleSheet,Alert, FlatList } from "react-native"
import Title from "../components/ui/Title"
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer"
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";
import Card from "../components/ui/Card";
import Ionicons from '@expo/vector-icons/Ionicons';
import GuessLogItem from "../components/game/GuessLogItem";

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
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length)
        }
    },[currentGuess, userNumber,onGameOver])

    useEffect(() => {
        minBoundary = 1
        maxBoundary = 100
    },[])

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
        setGuessRounds(prevValue => [newNumber, ...prevValue ])
     }

     const guessRoundListLength = guessRounds.length

    return <View style={styles.container}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>
                Higher or lower?
            </InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </PrimaryButton>
                </View>
                <View  style={styles.buttonContainer}>
                <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name="md-add" size={24} color="white"/>
                </PrimaryButton>
                </View>
            </View>
        </Card>
        <View style={styles.listContainer}>
        <FlatList
            data = {guessRounds}
            renderItem = {
                ({item, index}) => <GuessLogItem roundNumber={guessRoundListLength - index } guess={item}>
                </GuessLogItem>
            }
            keyExtractor={item => item}
            />
        </View>
    </View>
}

export default GameScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
    },
    instructionText:{
        marginBottom: 12,
    },
    buttonsContainer:{
        flexDirection:'row'
    },
    buttonContainer: {
        flex:1
    },
    listContainer: {
        flex:1,
        padding: 16
    }
})