import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";


export const AdminContext = createContext();

export const AdminContextProvider = ({children}) =>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [jewelleryData, setJewelleryData] = useState([])
    const [totalJewelleryData, setTotalJewelleryData] = useState(0)
    const [loading, setLoading] = useState(false)
    
    const getJewelleryData = async () => {
        try {
        setLoading(true)
        const {data} = await axios.get(backendUrl + "/products/get-product", {withCredentials: true})
        if(data.success){
            setJewelleryData(data.products)
            setTotalJewelleryData(data.totalProducts)
            setLoading(false)
        } else{
            console.log(data.message)
        }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getJewelleryData();
    }, [])

    const value = {
        backendUrl,
        loading,
        jewelleryData,
        totalJewelleryData
    }
    
    return(
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    )
}