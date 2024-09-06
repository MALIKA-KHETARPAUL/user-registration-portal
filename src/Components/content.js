import React, { useState, useEffect} from 'react';

const Content = ()=>{
    
    const [data,setData] = useState([]);

    useEffect(()=>{
        getData();
    },[])

    const getData = async()=>{
        let result = await fetch('http://localhost:9000/');
        result = await result.json();
        setData(result);
    }

    console.log("DATA "+ data);

    return(
        <div>
           <h3> TEACHERS LIST : </h3> 
           <ul className="list-ul">
             <li> S No </li>
             <li> Name  </li>
             <li> Mail </li>
             <li> Age </li>
             <li> Department </li>
             <li> Address </li>
           </ul>
            {
                data.map((item,index)=>
                    <ul>
                        <li> {index+1} </li>
                        <li> {item.name} </li>
                        <li> {item.mail} </li>
                        <li> {item.age} </li>
                        <li> {item.department} </li>
                        <li> {item.address} </li>
                    </ul>
                )
            }
        </div>
    )
}

export default Content;