import React from 'react';

import{
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';

import { Gravatar } from 'react-native-gravatar';

const UserProfile = props =>{
    
    const options = { email: props.email, secure:true }

    return(
        <View style={styles.container}>
            <Gravatar options={options} style={styles.avatar}/>
            <View style={styles.userInfoContainer}>
                <Text style={styles.styleText}>{props.name} {props.lastname}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-between',
        alignItems:'center',
        width: '100%'
    },
    styleText:{
        fontSize: 20,
        fontFamily: 'roboto-regular',
        alignItems: 'center'
    },
    avatar:{
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 20,
        marginBottom: 20,
    },
    userInfoContainer:{
        width: Dimensions.get('window').width,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default UserProfile;