import { useEffect, useState} from "react";

import { useNavigate } from "react-router-dom";

import { addClientUsername } from "../Redux/actions";

import { useDispatch, useSelector } from "react-redux";

export const Login = () => {

    const [userfind, setUserFind] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const clientusername = useSelector((store) => store.clientusername)
    console.log('clientusername:', clientusername)
    
    console.log('username:', username)
    console.log('password:', password)
    useEffect(() =>{
        getData();
    },[]);

    async function getData(){

        const data = await fetch("http://localhost:8080/users").then((data) =>
            data.json()
        )
        setUserFind(data);
    }
    console.log('userfind:', userfind)

    const navigate = useNavigate();


    const handleSubmit = () => {
        if(username === "admin") {
            if(password === userfind[0].pass) {
                
                navigate("/orders", { replace : false })
            }
            else {
                alert("Admin Username and Password Incorrect");
            }
        }
        else {
            dispatch(addClientUsername(username))
            navigate("/neworder", { replace : false })
        }
    }

    return (
      <div>
        <input
        
            value={username}
            onChange={(event) => {
                setUserName(event.target.value);
            }}
          className="username"
          type="text"
          name="username"
          placeholder="Enter Username"
        />
        <input

            value={password}
            onChange={(event) => {
                setPassword(event.target.value);
            }}
          className="password"
          type="password"
          name="password"
          placeholder="Enter password"
        />
        {/* On this button click make network req to find user with same username and password */}
        {/* get his role, if role is `admin` take him to `/orders` page otherwise take him to `/neworder` */}
        <button className="submit" onClick={handleSubmit}>Login</button>
      </div>
    );
  };