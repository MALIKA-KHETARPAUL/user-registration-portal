import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const AddTeacher = () =>{
    const [name,setName] = useState("");
    const [mail,setMail] = useState("");
    const [password,setPassword] = useState("");
    const [age,setAge] = useState("");
    const [department,setDepartment] = useState("");
    const [address,setAddress] = useState("");

    const navigate = useNavigate();

    const collectData = async () =>{
        console.log(name+" "+mail+" "+password+" "+age+" "+department+" "+address);
        let result = await fetch('http://localhost:9000/teacher',{
            method:'post',
            body:JSON.stringify({name,mail,password,age,department,address}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        if(result){
            alert("Data added");
            navigate('/');    // navigate to home.
        }
    }

    return (
       <div>
            <input className="input-sec" value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder="Enter Name" />
            <input className="input-sec" value={mail} onChange={(e)=>setMail(e.target.value)} type="text" placeholder="Enter Mail" />
            <input className="input-sec" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter password" />
            <input className="input-sec" value={age} onChange={(e)=>setAge(e.target.value)} type="number" placeholder="Enter age" />
            <input className="input-sec" value={department} onChange={(e)=>setDepartment(e.target.value)} type="text" placeholder="Enter department" />
            <input className="input-sec" value={address} onChange={(e)=>setAddress(e.target.value)} type="text" placeholder="Enter address" />
            <button onClick={collectData} className="input-btn" type="button"> Sign Up </button>
       </div> 
    )
}

export default AddTeacher;