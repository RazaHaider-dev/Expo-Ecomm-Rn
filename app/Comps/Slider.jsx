import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, FlatList, View, TouchableOpacity, Image, Animated } from 'react-native';

const { height, width } = Dimensions.get('window');

function Slider({image1,image2,image3}) {
    const [data, setData] = useState([
    image1,
    image2,
    image3
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Animated values for each dot
    const scaleAnimations = data.map(() => useRef(new Animated.Value(1)).current);

    useEffect(() => {
        scaleAnimations.forEach((anim, index) => {
            if (index === currentIndex) {
                Animated.spring(anim, {
                    toValue: 1.5, // Increase the size
                    useNativeDriver: true,
                }).start();
            } else {
                Animated.spring(anim, {
                    toValue: 1, // Reset size for non-active dots
                    useNativeDriver: true,
                }).start();
            }
        });
    }, [currentIndex]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <View>
                <FlatList
                    horizontal
                    onScroll={e => {
                        const x = e.nativeEvent.contentOffset.x;
                        setCurrentIndex(Math.floor(x / width));
                    }}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: width, height: height / 2, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity disabled={true} style={{ width: '90%', height: '90%', borderRadius: 10 }}>
                                    <Image 
                                        source={{ uri: item }} 
                                        style={{ width: '100%', height: '100%', borderRadius: 10 }} 
                                        resizeMode="cover"
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row', width: width, justifyContent: 'center', alignItems: 'center' }}>
                {data.map((_, index) => {
                    return (
                        <Animated.View
                            key={index}
                            style={{
                                width: 8,
                                height: 8,
                                transform: [{ scale: scaleAnimations[index] }],
                                borderRadius: 4,
                                backgroundColor: currentIndex === index ? 'white' : 'gray',
                                marginLeft: 5,
                            }}
                        />
                    );
                })}
            </View>
        </View>
    );
}

export default Slider;
