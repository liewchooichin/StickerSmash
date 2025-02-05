import { View, StyleSheet } from "react-native";
//import { Link } from "expo-router";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker"
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";


const PlaceholderImage = require("@/assets/images/tutorial/background-image.png");

export default function Index() {

  const[selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  async function pickImageAsync() {
    // launch image gallery
    let pickerOptions: ImagePicker.ImagePickerOptions;
    pickerOptions = {
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    };
    let result = await ImagePicker.launchImageLibraryAsync(pickerOptions);
    // choosing is cancelled
    if(!result.canceled){
      console.log(result);
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any images.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer 
          imgSource={PlaceholderImage} 
          selectedImage={selectedImage} 
        />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
        <Button label="Use this photo" />
      </View>
    </View>
  );
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#ffffff'
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
