import React, { useState } from "react";
import { Dimensions, Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";

export default function ContainerEmotion() {
    const [imageIndex, setImageIndex] = useState(0);

    const images = [
        require("../../assets/images/dinos/dino1.png"),
        require("../../assets/images/dinos/dino1-apagado.png"),
    ];

    const handlePress = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.txt}>Sad</Text>
            <View style={styles.retangulo} />
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={{flexDirection: "row"}} onPress={handlePress} activeOpacity={1}>
                    <Image
                        source={images[imageIndex]}
                        style={styles.img}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    txt: {
        color: "#EF5B6A",
        fontSize: width * 0.05,
        fontFamily: "Montserrat_700Bold"
    },
    retangulo: {
        backgroundColor: "#EF5B6A",
        width: width * 0.25,
        height: height * 0.02,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    img: {
        width: width * 0.35,
        aspectRatio: 1 / 1
    },
});
