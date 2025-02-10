import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View, StyleSheet } from "react-native";
//import { Link } from "expo-router";
import { useState, useRef } from "react";
import { type ImageSource } from "expo-image";

import * as ImagePicker from "expo-image-picker"
import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";


//const PlaceholderImage = require("@/assets/images/tutorial/background-image.png");
const PlaceholderImage = require("@/assets/images/tutorial/background-image.jpg");
export default function Index() {

  // request permission to access the device's media libary
  const[status, requestPermission] = MediaLibrary.usePermissions();
  // ref to the image captured
  const imageRef = useRef<View>(null);
  // select an image from the gallery
  const[selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  // show these options after an image is picked/selected
  const[showAppOptions, setShowAppOptions] = useState<boolean>(false);
  // when user press the Add moji sticker, the state will become true
  const[isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // show the row of emojis that a user can pick
  const[pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

  // check the permission to use the media library
  if(status === null){
    requestPermission();
  }

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

  // save the image
  async function saveImage(){
    try{
      const localUri = await captureRef(
        imageRef,
        {
          height: 440,
          quality: 1,
        }
      );
      await MediaLibrary.saveToLibraryAsync(localUri);
      if(localUri){
        alert("Saved.");
      }
    } catch(e){
      console.log(e);
    }
  }

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
    saveImage();
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
     <GestureHandlerRootView style={styles.container}>
       <View style={styles.imageContainer}>
          <View ref={imageRef} collapsable={false}>
            <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
              {pickedEmoji && (<EmojiSticker imageSize={40} stickerSource={pickedEmoji} />)}
          </View>
       </View>     
      { viewOptions }
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
     </GestureHandlerRootView>
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
    color: '#ffffff',
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
