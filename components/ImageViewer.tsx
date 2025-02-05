import { StyleSheet } from 'react-native';
import { Image, type ImageSource } from 'expo-image';

type Props = {
    imgSource: ImageSource;
    selectedImage?: string;
}

export default function ImageViewer({imgSource, selectedImage}: Props){
    // The picked image is a uri string, not a local asset like 
    // the placeholder image.
    // the uri here must be uri -- the same as the object from ImagePicker.
    // the creation of the { uri: selectedImage } object, which is the 
    // format expo-image expects for remote images.
    const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

    return (<Image source={imageSource} style={styles.image} />);
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
})