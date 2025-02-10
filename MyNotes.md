
# My notes

## Reference:
https://docs.expo.dev/tutorial

## Gesture

Gestures are a great way to provide an intuitive user experience in an app. The React Native Gesture Handler library provides built-in native components that can handle gestures. It recognizes pan, tap, rotation, and other gestures using the platform's native touch handling system.

https://docs.expo.dev/tutorial/gestures/

`<GestureHandlerRootView>`

- Double tap to scale the size of the emoji sticker and reduce the scale when double tapped again.
- Pan to move the emoji sticker around the screen so that the user can place the sticker anywhere on the image.

- Animated components `<Animated.Image>` 
  - Double tap to scale the size to `components/EmojiSticker.tsx`. Using `scaleImage` and `withSpring`.
  - Pan gesture to recognize a dragging gesture on the sticker and to track its movement, we'll use a pan gesture. Using `translateX` and `translateY`.
  - `<GestureDetector>` can be added in different places.

The images cannot work with `svg`. It need to be in `png` format.

## Take a screenshot

- Use `react-native-view-shot` to take a screenshot 
- Use `expo-media-library` to save an image on device's media library

### Permissions to use information

An app that requires sensitive information, such as accessing a device's media library, has to prompt permission to allow or deny access. Using `usePermissions()` hook from `expo-media-library`, we can use the permission `status` and `requestPermission()` method to ask for access.

When the app loads for the first time and the permission status is neither granted nor denied, the value of the `status` is null. When asked for permission, a user can either grant the permission or deny it. We can add a condition to check if it is null, and if it is, trigger the `requestPermission()` method. After getting the access, the value of the `status` changes to `granted`.


## To check phone connectivity

```
sudo arp-scan -l -r 3 | grep {Phone Static Assigned IP} 
```

## void

In JavaScript, void is an operator.  It's a unary operator, meaning it operates on a single operand. 1   Its primary purpose is to evaluate an expression and then return undefined, regardless of the expression's result.

The void operator is often used merely to obtain the undefined primitive value, usually using void(0) (which is equivalent to void 0).

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/void



## Modal

Modals are used to draw a user's attention toward critical information or guide them to take action.


## Image object from ImagePicker.

```
  /*
   * Example of result object:
{
  "assets": [
    {
      "assetId": null,
      "base64": null,
      "duration": null,
      "exif": null,
      "fileName": "ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
      "fileSize": 4513577,
      "height": 4570,
      "mimeType": "image/jpeg",
      "rotation": null,
      "type": "image",
      "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FStickerSmash-13f21121-fc9d-4ec6-bf89-bf7d6165eb69/ImagePicker/ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
      "width": 2854
    }
  ],
  "canceled": false
}
   */
```