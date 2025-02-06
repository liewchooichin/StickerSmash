import { Text, View, StyleSheet } from "react-native";
//import { Link } from "expo-router";
import { useState } from "react";
import { type ImageSource } from "expo-image";

import * as ImagePicker from "expo-image-picker"
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";


const PlaceholderImage = require("@/assets/images/tutorial/background-image.png");

export default function Index() {

  // select an image from the gallery
  const[selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  // show these options after an image is picked/selected
  const[showAppOptions, setShowAppOptions] = useState<boolean>(false);
  // when user press the Add moji sticker, the state will become true
  const[isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // show the row of emojis that a user can pick
  const[pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);


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

  // handler for app option buttons
  
  // reset the view
  function onReset(){
    setShowAppOptions(false);
  }
  // add a sticker
  function onAddSticker(){
    // show the emoji picker modal
    setIsModalVisible(true);
  }
  // close the modal
  function onModalClose(){
    // reset the emoji picker modal
    setIsModalVisible(false);
  }
  // save image
  function onSaveImageAsync(){
    // later
  }


  // the view to show depending on the Use this photo
  let viewToShow;
  let viewOptions;


  // Show app options if false, no extra
  // button to display.
  if(showAppOptions)
   viewOptions = (
      <View style={[styles.optionsContainer]}>
        <View style={[styles.optionsRow]}>
          <IconButton icon="refresh" label="Reset" onPress={onReset} />
          <CircleButton onPress={onAddSticker} />
          <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
        </View>
      </View>
  );
  if(!showAppOptions)
    viewOptions = (
      <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
      </View>
  )

  // Show app options if true, extra
  // button to display.
    viewToShow = (
     <View style={styles.container}>
       <View style={styles.imageContainer}>
         <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
         {pickedEmoji && (<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />)}
       </View>     
      { viewOptions }
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
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
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
