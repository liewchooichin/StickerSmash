import { Text, View, StyleSheet } from "react-native";
//import { Link } from "expo-router";
import { useState } from "react";

import * as ImagePicker from "expo-image-picker"
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";


const PlaceholderImage = require("@/assets/images/tutorial/background-image.png");

export default function Index() {

  // select an image from the gallery
  const[selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  // show these options after an image is picked/selected
  const[showAppOptions, setShowAppOptions] = useState<boolean>(false);

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
      setShowAppOptions(true);
    } else {
      alert('You did not select any images.');
    }
  };

  // the view to show depending on the Use this photo
  let viewToShow;

  // Show app options if false, no extra
  // button to display.
  if(!showAppOptions)
   viewToShow = (
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
        <View>
          <Text style={styles.text}>Sticker Smash</Text>
        </View>
    </View>
  );

  // Show app options if true, extra
  // button to display.
  if(showAppOptions)
    viewToShow = (
     <View style={styles.container}>
       <View style={styles.imageContainer}>
         <ImageViewer 
           imgSource={PlaceholderImage} 
           selectedImage={selectedImage} 
         />
       </View>     
         <View style={styles.footerContainer}>
           <Button theme="primary" label="Choose a photo" onPress={pickImageAsync}/>
           <Button label="Use this photo" onPress={()=>setShowAppOptions(true)} />
         </View>
         <View>
           <Text style={styles.text}>Sticker Smash</Text>
         </View>
     </View>
   );
 

  // the view to show
  return viewToShow;
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
