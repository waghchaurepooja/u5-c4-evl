import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect } from "react";

import { addClientProblems, addErase, addAdmin } from "../Redux/actions";

export const Orders = () => {
    //  Get all data when admin logs in and populate it
    // store it in redux

    const admin = useSelector((store) => store.admin)
    
    console.log('admin:', admin)

    useEffect(() => {
        getData();
    },[]);

    const dispatch = useDispatch();

    async function getData(){
        const data = await fetch("http://localhost:8080/orders").then((data) =>
            data.json()
        )
        console.log(data);
        
        dispatch(addAdmin(data));
    }
  
    return (
      <div>
        <div>
          <div>
            <select className="controls" name="progress" id="progress">
              <option value="id">ID</option>
              <option value="status">Status</option>
              <option value="cost">Cost</option>
            </select>
          </div>
          <table className="orders">
            <thead>
              <tr>
                <th>ID</th>
                <th>Problem</th>
                <th>Client Name</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Change Status</th>
                <th>Accept</th>
              </tr>
            </thead>
            <tbody>
                {admin.map((element) => {
                    return (
                        <tr className="orders-row">
                            <td className="id">{element.id}</td>
                            <td className="problem">{element.problem}</td>
                            <td className="owner">{element.owner_name}</td>
                            <td className="status">{element.status}</td>
                            <td className="cost">{element.cost}</td>
                            <td className="change-status">
                            {/* Show select dropdown only if status is Not Accepted */}
                            <select className="changeStatus" name="changeStatus">
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                                <option value="Not Accepted">Not Accepted</option>
                            </select>
                            </td>
                            <td className="accept">
                            {/* Show this button only if status is Not Accepted */}
                            {/* on change make request to update it in db, and show changed status in table */}
                            <button>Accept</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };