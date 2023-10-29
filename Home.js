import { useEffect, useState } from "react"
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { TouchableOpacity } from "react-native/Libraries/Components/Touchable/TouchableOpacity";


export default Home = () => {

    const navigation = useNavigation();
    
    const [text, setText] = useState('')
    const [savedText, setSavedText] = useState('')
    useEffect(() => {
        
        const savedData = () => {
      
            AsyncStorage.getItem("data").then((res) => {
                
                if (res !== null) {
                    const data = JSON.parse(res); //TO RETREIVE OBJECT WE MUST PARSE IT
                    setSavedText(data.text);
                }
                else{
                    setSavedText("No Data Saved");
                }
            }).catch(err=>{
                console.log(err);
            })
        }


        savedData();

    
        




    }, []) // This will only run once the component loads due to single bracket.


    useEffect(() => {
        console.log("Hi I only run when you change savedText hook cause my [savedData] has savedData in it  " + text);
    }, [savedText])

    useEffect(() => {
        console.log("I keep running whenever anything is changed cause I don't have a []")
    })


   

    const savedData = async () => {

        const save =  await AsyncStorage.setItem("data", JSON.stringify({ "text": text }));
        
        
        //TO SAVE OBJECT IN Storage use JSON.Stringify same goes for array
        setSavedText(text)
    }

    /*
        Layout designing as per quiz
         -------------------
         |         =        |
         |==================|   
         |  =             = |
         |==================|
         |         =        |
         |------------------|

    */
    return (
        <View style={styles.parent}>
            <View style={styles.childTop}>
                {/* Text Size will change on return to screen */}
                <Text style={{ fontSize: 24 }}> This item is justified in center </Text>
            </View>
            <View style={styles.childIgnored}>
                <View style={styles.subChild}>
                    <TextInput style={styles.input}
                        onChangeText={setText}
                        value={text}

                    >

                    </TextInput>
                </View>

                <View style={styles.subChild2}>
                    <Text> {savedText}</Text>

                    <Button title="Click to Save Text" onPress={savedData}> </Button>
                </View>
            </View>

            <View style={styles.childBottom}>


                <Button title="Click Me to show movies" onPress={()=>{navigation.navigate("Movies");}}>  </Button>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    parent: {
        flex: 1, //if we don't specify this it will occupy same dimensions as children provided children has widht height specified.
        flexDirection: 'column', //default is also column, other option is row.
        backgroundColor: 'orange'
    },

    childTop: {
        flex: '50%',
        backgroundColor: 'blue',
        justifyContent: 'center', //justifies the content inside (children) as per parent,
        alignItems: 'center',
    },

    childIgnored: {
        flex: '100%',
        backgroundColor: 'red',
        flexDirection: 'row',
        // alignItems: 'center', try uncommenting this to see the difference 

    },

    subChild: {
        flex: '50%',
        backgroundColor: 'pink',
        justifyContent: 'center'
    },

    subChild2: {
        flex: '50%',
        alignItems: 'flex-end',
        justifyContent: 'center',

    },

    childBottom: {
        justifyContent: 'center',
        flex: '50%',
        backgroundColor: 'yellow'
    },


    input: {
        height: 40,
        width: 150,
        borderWidth: 1,
        padding: 10,
    },




})