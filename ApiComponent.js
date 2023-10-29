import axios from "axios"


const getApi = async ()=>{
    const resposnse = await axios.get("https://reactnative.dev/movies.json")
    return resposnse.data
}

export default getApi;