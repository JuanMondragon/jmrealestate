import axios from 'axios' 

export const baseUrl ='https://bayut.p.rapidapi.com'
//!SECTION export the base url so it can be used in the other files as well.


export const fetchApi = async (url) => {
    const {data} = await axios.get((url),{
        headers: {
            'X-RapidAPI-Key': '4c1d128c8dmshee7a0aaeec66bbdp1ec3d5jsn531190f862da',
            'X-RapidAPI-Host': 'bayut.p.rapidapi.com'

        }
    });
    return data;
}