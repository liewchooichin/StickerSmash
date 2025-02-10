import { View, StyleSheet } from "react-native";
import { type ImageSource } from "expo-image";
import { Gesture, GestureDetector, GestureStateChangeEvent, TapGestureHandlerEventPayload } from "react-native-gesture-handler";
import Animated, 
    {SharedValue,
useAnimatedStyle, useSharedValue, withSpring } 
    from "react-native-reanimated";

type Props = {
    imageSize: number;
    stickerSource: ImageSource;
};

export default function EmojiSticker({imageSize, stickerSource}: Props){
    const scaleImage = useSharedValue(imageSize);
    
    // handle double tap
    function handleDoubleTap(){
        if(scaleImage.value !== imageSize*2){
            scaleImage.value = scaleImage.value *2;
        } else {
            scaleImage.value = Math.round(scaleImage.value /2);
        }
    }
    // handle spring
    function handleSpring(){
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    }

    // When the function handlers are moved outside,
    // the app will just stop, exit.
    //QUESTION: Why are the function handler cannot
    // be moved outside?
    // double tap
    const doubleTap = 
        Gesture.Tap()
            .numberOfTaps(2)
            .onStart(() => {
                if(scaleImage.value !== imageSize*2){
                    scaleImage.value = scaleImage.value *2;
                } else {
                    scaleImage.value = Math.round(scaleImage.value /2);
                }
            });
    // animated spring
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });


    return (
        <View style={styles.emojiStickerContainer} >
            <GestureDetector gesture={doubleTap}>
            <Animated.Image 
                source={stickerSource} 
                resizeMode="contain"
                style={[imageStyle, {width: imageSize, height: imageSize}]}
            />
            </GestureDetector>
        </View>
    )
}

const styles = StyleSheet.create({
    emojiStickerContainer: {
        top: -350,
    },
});