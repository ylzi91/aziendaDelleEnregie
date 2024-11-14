import { useEffect, useState } from "react"
import { PageAdmin } from "./PageAdmin"

export function Profilo(){
    const [profilo, setProfilo] = useState({})

    useEffect(() => {
        getProfile()
    }
      
    ,[])

    const getProfile = async() => {
        let token = localStorage.getItem('myToken')
        try{
            const response = await fetch('http://localhost:3001/utenti/me', 
                {
                    method: 'GET',
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            const myProfile = await response.json()
            setProfilo(myProfile)
        } catch{
            console.log('Errore nel profilo')

        }
    }


    return (
        <>
            {profilo?.ruoli?.some(role => role.nome == 'ADMIN') && <PageAdmin myProfile = {profilo}/>}  

        </>
    )
}