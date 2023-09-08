import { View,StyleSheet, Dimensions } from "react-native"
import Color from "../../constants/color"

function Card({children}){
    return (
        <View style={styles.card}>{children}</View>
    )
}

export default Card

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    card: {
        justifyContent: "center",
        alignItems:'center',
        marginTop: deviceWidth < 380 ? 18 : 36,
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