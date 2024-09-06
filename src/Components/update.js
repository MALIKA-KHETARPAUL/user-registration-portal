import React,{useEffect, useState} from 'react';
import {useNavigate } from 'react-router-dom';

const UpdateTeacher = () => {

    const [mail,setMail] = useState("");
    const [password,setPassword] = useState("");
    const [flag,setFlag] = useState(false);
    const [data,setData] = useState("");

    const[name,setName] = useState("");
    const[age,setAge] = useState("");
    const[department,setDepartment] = useState("");
    const[address,setAddress] = useState("");


    const navigate = useNavigate();

    // useEffect(()=>{
    //     getData();
    //     updateData();
    // },[setFlag])


    const getData = async()=>{
        try{
            let result = await fetch(`http://localhost:9000/get/${mail}/${password}`);
            result = await result.json();
            console.log(result);
            if(result){
                setData(result);
                setFlag(true);
                setName(result.name);
                setAge(result.age);
                setAddress(result.address);
                setDepartment(result.department);
            }
        }
        catch(error){
            setFlag(false);
        }
    }


    const updateData = async()=>{
        console.log("Mail : " + mail);
        console.log("Password : " + password);
        // console.log("NAME : "+name);
        let result = await fetch(`http://localhost:9000/update/${mail}/${password}`,{
            method:'PUT',
            body:JSON.stringify({name,age,address,department}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        alert("Data updated ");
        navigate('/');
    }


    return(
        <div>
            <input value={mail} onChange={(e)=>setMail(e.target.value)} className="input-sec" type="text" placeholder="Enter mail"/> 
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className="input-sec" type="password" placeholder="Enter password"/>
            <button className='input-btn'  onClick={getData} type="button"> Fetch Teacher </button>

            {
                flag && <div>
                    <input className='input-sec' value={name} type="text" onChange={(e)=>setName(e.target.value)}/>
                    <input className='input-sec' value={age} type="text" onChange={(e)=>setAge(e.target.value)}/>
                    <input className='input-sec' value={department} type="text" onChange={(e)=>setDepartment(e.target.value)}/>
                    <input className='input-sec' value={address} type="text" onChange={(e)=>setAddress(e.target.value)}/>
                    <button className='input-btn' onClick={updateData}> Update Data </button>
                </div>
            }

        </div>
    )
}

export default UpdateTeacher;