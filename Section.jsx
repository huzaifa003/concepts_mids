import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button, FlatList, SectionList } from 'react-native';
export default Section = (props) => {

    console.log("These props are being passed from Movies to this section")
    console.log(props.list);
    

    useEffect(()=>{
        return ()=>{
            console.log("Section COMPONENT Unmounted")
        }
    },[])

    
    return (
        <View style={{ flex: 0.23, backgroundColor: 'yellow', alignItems: 'center' }}>
            <Text>Component Mounted - Check Console for Data representation</Text>

            
            
        </View>
    )
}