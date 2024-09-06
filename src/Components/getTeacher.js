import React,{useEffect, useState} from "react";
// import {Link} from "react-router-dom";
// import {useParams} from "react-router-dom";

// const GetTeacher = () =>{
//     // const params= useParams();   // to fetch params
//     // console.log("PARAMS " + params);
//     // const [data,setData] = useState([]);
//     const [mail,setMail] = useState("");

//     // let flag=false;

//     // useEffect(()=>{
//     //     getData();
//     // },[getData,setMail]);

//     // const getData = async() => {
//     //     console.log("MAIL : "+mail);
//     //     console.log("PARAMS : "+params);
//     //     let result =await fetch(`http://localhost/9000/get/${params.mail}`);
//     //     result = await fetch.json();
//     //     // if(result){
//     //     //     flag=true;
//     //     // }
//     //     console.log("RESULT : "+result);
//     //     setData(result);
//     // }

//     // console.log("DATA" + data);

//     return (
//         <div>
//             <input className="input-sec" value={mail} onChange={(e)=>setMail(e.target.value)} type="text" placeholder="ENTER MAIL ID"/>
//             <button className="input-btn" type="button"> <Link to={"/get/" + mail}> FETCH TEACHER DATA  </Link> </button>
//             {/* <h3> Teacher Details </h3>
//             {
//                 <ul className="list-ul">
//                 <li> Name : </li>
//                 <li> Mail : </li>
//                 <li> Age : </li>
//                 <li> Department : </li>
//                 <li> Address : </li>
//               </ul>  /* will show only if flag is true!!! 
//              } */}
//         </div>
//     )
// }


const GetTeacher = ()=> {
    const [mail,setMail] = useState("");
    const [data,setData] = useState("");
    const [flag,setFlag] = useState(false);
    const [wrongField,setWrongField] = useState(false);

    // useEffect(()=>{
    //     getData();
    // },[flag])

    const getData = async()=>{
        try{
            let request = await fetch(`http://localhost:9000/get/${mail}`);
            request = await request.json();
            console.log(request);
            if(request){
                setData(request);
                console.log(data);
                setFlag(true);
                setWrongField(false);
            }
            else{
                setFlag(false);
                setWrongField(true);
            }
        }   
        catch(error){
            setFlag(false);
            setWrongField(true);
        }
    }

    return (
        <div> 
             <input className="input-sec" value={mail} onChange={(e)=>setMail(e.target.value)} type="text" placeholder="ENTER MAIL ID"/>
             <button className="input-btn" type="button" onClick={getData}> FETCH TEACHER DATA  </button>
             <h3> Teacher Details </h3>
             {  flag &&
                 <ul className="list-ul">
                 <li> Name : {data.name} </li>
                 <li> Age : {data.age} </li>
                <li> Department : {data.department} </li>
                <li> Address : {data.address} </li>
              </ul>  /* will show only if flag is true!!! */
             }
             {
               wrongField && <h4> WRONG MAIL ID !!!!! NO MATCH FOUND </h4>  
             }
        </div>
    )

}



export default GetTeacher;