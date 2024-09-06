import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () =>{
    return (
        <div>
            <ul className='nav-ul'>
                <li> <Link className="nav-link" to="/"> WELCOME TO TEACHERS DASHBOARD </Link>  </li>
                <li> <Link className="nav-link" to="/"> Teachers </Link> </li>
                <li> <Link className="nav-link" to="/add"> Add Teacher </Link>  </li>
                <li> <Link className="nav-link" to="/get"> Get Teacher </Link> </li>
                <li> <Link className="nav-link" to="/update"> Update Teacher </Link> </li>
                <li> <Link className="nav-link" to="/delete"> Delete Teacher </Link> </li>
            </ul>
        </div>
    )
}

export default  Nav;