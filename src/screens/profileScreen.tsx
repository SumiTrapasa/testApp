import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomButton from '../components/ButtonComp';
import { handleLogout } from '../services/api';
import { useNavigation } from '@react-navigation/native';

function ProfileScreen() {
    const navigation = useNavigation();

    const onLogOutPress = () => {
        handleLogout();
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            <CustomButton title="Logout" onPress={onLogOutPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{ flex:1, alignItems: 'center', justifyContent: 'center' },
});

export default ProfileScreen;
