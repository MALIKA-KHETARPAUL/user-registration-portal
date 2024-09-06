import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const ParticularContent = ()=>{
    const params = useParams();
    const [data,setData] = useState([]);

    useEffect(()=>{
        getData();
    },[]);

    let flag=false;

    const getData = async()=>{
        let result = await fetch(`http://localhost:9000/get/${params.mail}`);
        result = await result.json();
        if(result){
            flag=true;
        }
        console.log("RESULT "+ result);
        setData(result);
    }

    // console.log("RESULT "+ result);
    // console.log("DATA" + JSON.stringify(data));

    return(
        <div>
            {
                data.map((item,index)=>
                    <ul>
                        <li> Name : {item.name} </li>
                        <li> Mail : {item.mail} </li>
                        <li> Age : {item.age} </li>
                        <li> Department : {item.department} </li>
                        <li> Address : {item.address} </li>
                    </ul>
                )
            }
        </div>
    )


//     if(!flag){
//             return(
//                 <div>
//                 <h3> TEACHER DETAIL : </h3> 
//                 <h2> LOADING ...... </h2>
//                 </div>
//             )
//    }else{
//             return(
//                 <div>
//                 <h3> TEACHER DETAIL : </h3> 
//                 {flag && <ul className="list-ul">
//                     <li> Name: ${data.name}  </li>
//                     <li> Mail: ${data.mail}  </li>
//                     <li> Age: ${data.age}  </li>
//                     <li> Department: ${data.department}  </li>
//                     <li> Address: ${data.address}  </li>
//                 </ul>}
//                 </div>
//             )
//    }        
}

export default ParticularContent;