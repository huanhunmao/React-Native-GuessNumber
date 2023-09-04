import { View,StyleSheet } from "react-native"
import Color from "../../constants/color"

function Card({children}){
    return (
        <View style={styles.card}>{children}</View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignItems:'center',
        marginTop: 26,
        marginHorizontal:24, // 横向
        padding:16,
        backgroundColor: Color.primary700,
        borderRadius:8,
        elevation:4, // 安卓 shadow
        shadowColor: "black",
        shadowOffset:{width:0, height:2},
        shadowRadius:6,
        shadowOpacity:0.25
    },
})