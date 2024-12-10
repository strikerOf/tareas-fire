
import axios from "axios";

const api_base = import.meta.env.VITE_API_URL;
export const getInfo= async (url:string)=>{
    try{
        const response =await axios.get (`${api_base}/${url}`);
        return response.data;
    } catch(error){
        
        console.log('Error en get');
        return null;
    }


}

export const sendData =async (url:string, formData:any)=>{
    try{
        const response = await axios.post(`${api_base}/${url}`,formData,{
            headers:{
                'Content-Type': 'application/json'
            }
        });
        {
           if(response.status==200) return true;
        }
    }catch(error){
        console.log('Error en post');
        return null;
    }
}

export const updateData = async (url: string, formData: any) => {
    try {
        const response = await axios.put(`${api_base}/${url}`, formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        {
            if (response.status == 200) return true;
        }
    } catch (error) {
        console.log('Error en post');
        return null;
    }
}

export const getfilterTareas = async (url:string,mystatus: string) => {
    try {
        const params = new URLSearchParams({ estado: mystatus });
        const response = await axios.get(`${ api_base }/${url}?${params.toString()}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return null;
    }
};

export const completeTarea = async (url:string,id:string)=>{
    try {
        const response = await axios.put(`${api_base}/${url}/${id}`);
        {
            if (response.status == 200) return true;
        }
    } catch (error) {
        console.log('Error en post');
        return null;
    }
}


export const deleteTarea = async (url: string, id: string) => {
    try {
        const response = await axios.delete(`${api_base}/${url}/${id}`);
        {
            if (response.status == 200) return true;
        }
    } catch (error) {
        console.log('Error en post');
        return null;
    }
}