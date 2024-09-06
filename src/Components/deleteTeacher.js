import React,{ useState} from "react";
import {useNavigate} from "react-router-dom";
//import {useParams} from "react-router-dom";

const DeleteTeacher = () =>{
    const navigate = useNavigate();
    const [mail,setMail] = useState("");
    const [password,setPassword] = useState("");
    const [data,setData] = useState("");
    const [flag,setFlag] = useState(false);

    // useEffect(()=>{
    //     getData()
    // },[setFlag])

    const getData = async() =>{
        console.log(mail);
        console.log(password);
        try{
            let result = await fetch(`http://localhost:9000/get/${mail}/${password}`);
            result = await result.json();
            if(result){
                setData(result);
                setFlag(true);
                console.log("INSIDE IF...");
                console.log(result);
                console.log(data);
                // console.log("NAME : " + data.name);
                console.log(result.name);
            }
            else{
                setFlag(false);
                console.log("NO MATCH FOUND !!!!! ");
            }
        }
        catch(error){
            setFlag(false);
            console.log("NO MATCH FOUND");
        }
    }


    // delete data from db:
    const deleteData = async() => {
        let result = await fetch(`http://localhost:9000/delete/${mail}/${password}`,{
            method:'Delete',
            headers:{
                'Content-Type':'application/json'
            }
        });
        // result = await result.json();
        alert("DATA IS DELETED  !!!!!!!");
        navigate('/');
        console.log(result);
    }



    // console.log(data);
    // console.log("NAME : " + data.name);

    return (
        <div>
            <input className="input-sec" value={mail} onChange={(e)=>setMail(e.target.value)} type="text" placeholder="ENTER MAIL ID"/>
            <input className="input-sec" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="ENTER PASSWORD "/>
            <button className="input-btn" type="button" onClick={getData}> FETCH DATA </button>
            {  flag &&    /* Showing details only when flag is true... */
             <div style={{marginLeft:"20%"}}>
                    <ul className="list-ul">
                        <li> Name : {data.name} </li>
                        <li> Age : {data.age} </li>
                        <li> Department : {data.department} </li>
                        <li> Address : {data.address} </li>
                    </ul>  
                    {/* <Link to="/"> DELETE TEACHER </Link> */}
                    <button style={{marginLeft:"5%",width:"10rem",height:"2rem"}} type="button" onClick={deleteData}> DELETE TEACHER </button>
             </div>
            }
            {
                !flag && <h2 style={{marginLeft:"20%"}}> Enter correct mail & password </h2>
            }
        </div>
    )
}

export default DeleteTeacher;