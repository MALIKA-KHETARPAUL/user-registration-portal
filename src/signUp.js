import React,{ useState } from 'react';

const AddStaff = ()=>{
    var [name,setName] = useState("");
    const collectData = async()=>{
        console.log(name);
        // let result = await fetch('http://localhost:9000/',{
        //     mode:'cors',
        //     method:'GET',
        //     headers:{
        //         'Content-Type':'application/json'
        //     }
        // })
        let result = await fetch('http://localhost:9000/teacher',{
            mode:'cors',
            method:'POST',
            body:JSON.stringify({name}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result=await JSON.parse(result);
        console.log("RESULT :: "+result);
    }

    return (
        <div>
            <label> FullName : </label>
            <input name="name" value={name} onChange={(e)=>setName(e.target.value)} required/>
            <button type="submit" onClick={collectData}> Submit </button>
        </div>
    );
}

export default AddStaff;