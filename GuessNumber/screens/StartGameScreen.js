import { TextInput,Text, View, StyleSheet, Alert, useWindowDimensions, KeyboardAvoidingView, ScrollView}  from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import { useState } from "react";
import Color from "../constants/color";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({onPress}){
    const [inputText, setInputText] = useState('')
    const { width, height } = useWindowDimensions()

    function inputChangeHandler(input){
        setInputText(input)
    }

    function confirmHandler(){
        verifyInput()
    }

    function resetHandler(){
        setInputText('')
    }

    function verifyInput(){
        const number = Number(inputText)

        if(isNaN(number) || number <= 0 || number > 99){
            Alert.alert(
                'Invalid number!',
                'Please enter a valid number between 1 and 99',
                [{
                    text:'ok',
                    style:'destructive',
                    onPress: resetHandler,
                }]
            )

            return 
        }

        onPress(number)
    }

    const marginTopDistance = height < 380 ? 30 : 100

    return (
        <ScrollView style={styles.screen}> 
        <KeyboardAvoidingView style={styles.screen} behavior="position">
            <View style={[styles.rootContainer,{ marginTop: marginTopDistance}]}>
            <Title style={styles.title}>Guess My Number</Title>
            <Card>
                <InstructionText>Enter a number</InstructionText>
            <TextInput 
            style={styles.numberInput} 
            maxLength={2} 
            keyboardType="number-pad"
            autoCapitalize="none" // 自动大写
            autoCorrect={false} // 自动更正
            value={inputText}
            onChangeText={inputChangeHandler}
            />
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={resetHandler}>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                <PrimaryButton onPress={confirmHandler}>Confirm</PrimaryButton>
                </View>
            </View>
        </Card>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    screen:{
        flex: 1,
    },
    rootContainer:{
        // marginTop: deviceHight < 380 ? 30 : 100,
        alignItems: 'center',
    },
    title:{
        flex: 1,
    },  
    numberInput:{
        height:50,
        width:50,
        fontSize:32,
        borderBottomColor: Color.accent500,
        borderBottomWidth: 2,
        color: Color.accent500,
        marginVertical:8,
        fontWeight:'bold',
        textAlign:'center'
    },
    buttonsContainer:{
        flexDirection:'row'
    },
    buttonContainer: {
        flex:1
    }
});