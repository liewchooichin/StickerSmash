import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

function pressAlert(){
    alert("You pressed a button.");
}


type Props = {
    label: string;
    theme?: 'primary';
    onPress?: ()=> void;
};

export default function Button({ label, theme, onPress }: Props){
    // theme is primary
    if(theme === "primary"){
        return (
            <View
                style={[styles.buttonContainer, styles.buttonContainerPrimary]}
            >
                <Pressable
                    style={[styles.button, styles.backgroundColorPrimary]}
                    onPress={onPress}
                >
                    <FontAwesome 
                        name="picture-o" 
                        size={18}
                        color="#25292e"
                        style={styles.buttonIcon}
                    ></FontAwesome>
                    <Text style={[styles.buttonLabel, styles.buttonColorPrimary]}>
                        { label }
                    </Text>
                </Pressable>
            </View>
        );
    }

    // no theme is defined
    return(
        <View style={styles.buttonContainer}>
            <Pressable
                style={styles.button}
                onPress={()=>pressAlert()}
            >
                <Text 
                    style={[styles.buttonLabel]}
                >{label}
                </Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    buttonContainerPrimary: {
        borderWidth: 4,
        borderColor: '#ffd33d',
        borderRadius: 18,
    },
    backgroundColorPrimary: {
        backgroundColor: '#ffffff',
    },
    button: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    buttonColorPrimary: {
        color: '#25292e',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: "#ffffff",
        fontSize: 16,
    },
});