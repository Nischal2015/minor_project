import React, {useState} from 'react'
import Button from '../../components/UI/Button/Button'
// import {useSelector} from 'react-redux'



const Message = () => {
    const [accessToken,setAccessToken] = useState(localStorage.getItem('access'))
  
    const fetchData = async (e) =>{
        e.preventDefault()
        console.log('fetchdata page')

        let response = await fetch('api/room/',{
            method : 'GET',
            headers : {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${String(accessToken)}`
            },
            
          })
      
      
          let data =  await response.json()
          console.log(data)
    }

  return (
    <Button onClick = {fetchData}>Fetch Data</Button>
  )
}

export default Message