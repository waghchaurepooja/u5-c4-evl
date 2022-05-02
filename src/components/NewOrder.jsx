import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";

import { addClientProblems, addErase } from "../Redux/actions";

export const NewOrder = () => {

    const clientusername = useSelector((store) => store.clientusername)
    const clientproblems = useSelector((store) => store.clientproblems)
    console.log('clientproblems:', clientproblems)
    console.log('clientusernameorder:', clientusername)
    const [clientlist, setClientList] = useState("");
    const [problem, setProblem] = useState();
    const [brand, setBrand] = useState();
    console.log('clientlist:', clientlist)

    const dispatch = useDispatch();
    // Get data of only this user. store it in redux
    // GET /orders?owner_name=john will give you all order of user john
    //  on submit click create a new order, new order has status `Not Accepted`

    const handleAdd = () => {
        const payload = {
            problem : problem,
            owner_name : clientusername,
            brand : brand,
            status : "Not Accepted",
            cost : ""
        }
        console.log('payload:', payload)
        fetch("http://localhost:8080/orders",{
            method : "POST",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(payload)
        })
        .then(getData());
    };

    useEffect(() => {
        getData();
    },[]);

    async function getData(){
        dispatch(addErase([]));
        const data = await fetch("http://localhost:8080/orders").then((data) =>
            data.json()
        )
        console.log(data);
        for(var i = 0; i<data.length; i++) {
            if(data[i].owner_name === clientusername) {
                dispatch(addClientProblems(data[i]));
            }
        }
    }

    return (
      <div>
        <div className="form">
          <input
            onChange={(event) => {
                setProblem(event.target.value);
            }}
            className="new-problem"
            type="text"
            name="problem"
            placeholder="Enter problem"
          />
          {/* This input is readonly, it's coming from redux */}
          <input
            value = {clientusername}
            className="owner-name"
            type="text"
            name="owner_name"
            placeholder="yourname"
            readOnly
          />
          <input
            onChange={(event) => {

                setBrand(event.target.value);
            }}
            className="brand"
            type="text"
            name="brand"
            placeholder="Enter brand name"
          />
          {/* Create new problem, show it in below form immediately */}
          <button className="submit" onClick={handleAdd}>submit</button>
        </div>
  
        <div className="pastOrders">
          {/* this button filters the data below. */}
          {/* it's just a toggle of redux state something like `showUnfinished`  */}
          <button className="filter">
            {/* Text should change like:   Show {showUnfinished ? "all" : "Only unfinished"} */}
          </button>
  
          {/* Here create a div for every oreder, filter them before based on `showUnfinished` */}
          {clientproblems.map((element) => {
              return (
                <div className="past-orders">
                    <span className="id">{element.id}</span>. <span className="problem">{element.problem}</span>{" "}
                    <span className="cost">
                        {element.status !== "Not Accepted" ? element.cost : null}
                    {/* if status is not accepted then keep it empty otherwise show cost like $1234 */}
                    </span>
                    <p className="status">Status: {element.status}</p>
                    <hr />
                </div>
              )
          })}
        </div>
      </div>
    );
  }