import { useState } from "react";
import { StyleSheet, FlatList, Platform, Pressable } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
    onSelect: (image: ImageSource) => void;
    onCloseModal: () => void;
};

export default function EmojiList({onSelect, onCloseModal}: Props){
    // emojis
    const [emoji] = useState<ImageSource[]>([
        require("../assets/images/tutorial/emoji1.png"),
        require("../assets/images/tutorial/emoji2.png"),
        require("../assets/images/tutorial/emoji3.png"),
        require("../assets/images/tutorial/emoji4.png"),
        require("../assets/images/tutorial/emoji5.png"),
        require("../assets/images/tutorial/emoji6.png"),
    ]);

    // Press emojis
    function onPressEmojis(item: ImageSource){
        onSelect(item);
        onCloseModal();
    }

    // Render emojis
    function renderEmojis(item: ImageSource, index: number){
        return (
            <Pressable
                onPress={() => onPressEmojis(item) }
            >
                <Image source={item} key={index} style={styles.image} />
            </Pressable>
        )
    }

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === "web"}
            data={emoji}
            contentContainerStyle={styles.listContainer}
            renderItem={({item, index}) => renderEmojis(item, index)}
        />
    )

}

const styles = StyleSheet.create({
    listContainer: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 20,
    }
});