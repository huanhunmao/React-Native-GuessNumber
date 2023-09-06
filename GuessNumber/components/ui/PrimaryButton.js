import {View, Text, Pressable, StyleSheet} from 'react-native'
import Color from "../../constants/color";

function PrimaryButton({children, onPress}){

    return (
        <View style={styles.buttonOuterContainer}>
        <Pressable 
        style={({pressed}) => pressed ? [styles.buttonInnerContainer,styles.pressed] : styles.buttonInnerContainer} 
        onPress={onPress} 
        android_ripple={{color:Color.primary500}}>
            <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer:{
        borderRadius: 28,
        margin:4,
        overflow: 'hidden',
    },
    buttonInnerContainer:{
        backgroundColor: Color.primary500,
        paddingVertical: 8, // 纵向
        paddingHorizontal:16, // 横向
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed:{
        opacity:0.75
    }
})