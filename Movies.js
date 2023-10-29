import { useEffect, useState } from "react"
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Text, View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getApi from "./ApiComponent";
import Section from "./Section";

export default Movies = () => {
    const [movies, setMovies] = useState([]) //States , mutable
    const [movie, setMovie] = useState();
    const [releaseYear, setReleaseYear] = useState();
    const [sect, setSect] = useState(false);

    const [list, setList] = useState();

    
    useEffect(() => {
        // getApi().then((data) => {
        //     setMovies(data.movies)
        //     console.log(data.movies)
        // }).catch(err=>{
        //     console.log(err)
        // })

        //commented API cause often requests cause API to reject request, so uncomment the beloew static data and try with it
        setMovies(
            [
                {
                    "id": "1",
                    "title": "Star Wars",
                    "releaseYear": "1977"
                },
                {
                    "id": "2",
                    "title": "Back to the Future",
                    "releaseYear": "1985"
                },
                {
                    "id": "3",
                    "title": "The Matrix",
                    "releaseYear": "1999"
                },
                {
                    "id": "4",
                    "title": "Inception",
                    "releaseYear": "2010"
                },
                {
                    "id": "5",
                    "title": "Interstellar",
                    "releaseYear": "2014"
                }
            ]
        )
        

        console.log("hello")
        
    },[])


    //------------IMPORTNAT THIS ONE WIL WORK IF YA DISABLE ABOVE USEFFECT AND ITS IN SIR LECTURE TOO---------
    // useEffect(()=>{
    //     const unsubscribe = ()=>{
    //         navigation.addListener('focus', ()=>{
    //             console.log("will run when returned to this screen")
    //         })

    //     }

    //     return unsubscribe;
    // }, [navigation])

    




    const navigation = useNavigation();

    const parseAsSectionList = ()=>{
        if (sect == true){
            console.log("hello")
            setSect(false);
            return
        }
        console.log(sect)
        
        let section = {}

        const sectionList = []
        for (let index = 0; index < movies.length; index++) {
            const element = movies[index];
            // console.log(element.releaseYear in section);
            if (element.releaseYear in section){
                section[element.releaseYear].push({"id": element.id, "title": element.title})
            } 
            else{
                section[element.releaseYear] = [{"id": element.id, "title": element.title}]
                
            }
        }

        for (let index = 0; index < Object.keys(section).length; index++) {
            const element = Object.keys(section)[index];
            sectionList.push({"title" : element, "data": section[element]})
        }
        
        setList(sectionList);
        setSect(true);
        
        
    }


    return (
        <View style={{ alignItems: 'center', height: '70%' }}>
            <FlatList
                keyExtractor={item => item.id} //key helps optimize performance by not rerendering items
                data={movies}
                renderItem={({ item }) => {
                    return (
                        <View style={{ flex: 1, alignItems: 'center', margin: 20 }}>
                            <Text>{item.releaseYear}</Text>
                            <Text>{item.title}</Text>
                            <Text>{item.id}</Text>
                        </View>
                    )
                }}
            >


            </FlatList>

            <View>
            <TextInput style={{
                height: 40,
                width: 150,
                borderWidth: 1,
                padding: 10,
            }}

                placeholder="Enter release year"
                onChangeText={setReleaseYear}
                
                


            > </TextInput>

            <TextInput style={{
                height: 40,
                width: 150,
                borderWidth: 1,
                padding: 10,
            }}

                placeholder="Enter Movie Title"
                onChangeText={setMovie}
                
            > </TextInput>
            
            {sect === true ? <View style={{flex: 1}}><Section list = {list} /></View>  : ""}
            

            </View>

            <Text>Try with similar years</Text>
            <Button title="Add Movie" onPress={() => {
                movies.push({ "id": movies.length + 1, "title": movie, "releaseYear": releaseYear })
              
            }}></Button>

            <Text>The above list is scrollable</Text>

            <Button title="Parse as section List" onPress={parseAsSectionList}>

            </Button>
            {/* props immutable */}
            
            
            
            

            
        </View>
    )
}