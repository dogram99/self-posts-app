import React, {useRef, useState} from 'react'
import {View, TextInput, ScrollView, TouchableWithoutFeedback, Button, Keyboard, StyleSheet} from 'react-native';
import {useDispatch} from "react-redux";
import {THEME} from "../theme";
import {AppText} from "../components/ui/AppText";
import {AppButton} from "../components/ui/AppButton";
import {PhotoPicker} from "../components/PhotoPicker";

export const CreateScreen = ({navigation, route}) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const imgRef = useRef();

    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: imgRef.current,
            booked: false
        }
        dispatch(addPost(post))
        navigation.navigate('Главная')
    }

    const photoPickHandler = uri => {
        imgRef.current = uri
    }

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.container}>
                    <AppText style={styles.title}>Создать новый пост</AppText>
                    <TextInput style={styles.textarea}
                               placeholder="Введите текст для заметки"
                               value={text}
                               onChangeText={setText}
                               multiline/>
                    <PhotoPicker style={styles.photoPicker}
                                 onPick={photoPickHandler}/>
                    <View style={styles.createButtonWrap}>
                        <Button title='Создать пост'
                                color={THEME.MAIN_COLOR}
                                onPress={saveHandler}
                                disabled={!text}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20
    },
    textarea: {
        marginBottom: 20
    },
    photoPicker: {
        marginVertical: 15
    },
    createButtonWrap: {
        marginTop: 15
    }
})
