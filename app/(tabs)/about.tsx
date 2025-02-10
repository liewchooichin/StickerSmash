import { Text, View, StyleSheet } from 'react-native';



export default function AboutScreen(){
    return (
        <View style={styles.container}>
            <Text style={styles.text}>About</Text>
            <Text style={styles.text}>Tutorial using Expo</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#ffffff'
    },
});
