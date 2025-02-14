import { View, StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
    imageSize: number;
    stickerSource: ImageSource;
};

export default function EmojiSticker({imageSize, stickerSource}: Props){
    return (
        <View style={styles.emojiStickerContainer} >
            <Image 
                source={stickerSource} 
                style={{width: imageSize, height: imageSize}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    emojiStickerContainer: {
        top: -350,
    },
});