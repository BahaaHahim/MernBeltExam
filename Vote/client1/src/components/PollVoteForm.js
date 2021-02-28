import React, { useState } from 'react';

import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

export default (props) => {
    // error message
    const [message, setMessage] = useState("")

    const { poll, setPage } = props;

    //handler when a button is clicked
    const onClickHandler = (e, option) => {
        //prevent default behavior of the submit
        e.preventDefault();
        //make a post request to submit a vote
        axios.post(`http://localhost:8000/api/poll/${poll._id}/vote`, {
            option
        })
        .then((res) => {
            setPage(["result", { poll: res.data }]);
        })
        .catch( (error) => setMessage(error.message) )
    }

    const buttons = ['btn-primary', 'btn-secondary', 'btn-success', 'btn-info'];

    //onChange to update firstName and lastName
    return (
        <>
        {
            message !== "" && <Alert variant="danger"><p>{ message }</p></Alert>
        }
        <div className="row">
            <div className="col">
            </div>
        
        </div>
        <div className="row">
            <div className="col">
                <h2>{ poll.question }</h2>
            </div>
        </div>
        <div className="d-flex flex-wrap">
        {
            poll.options.map( (item, index) => {
                return (
                <div key={index} className="card" style={{ width: "40%", margin: "1% 5%" }}>
                    <div className="card-body">
                        <h5 className="card-title" >{ item }</h5>
                    </div>
                    <div className="card-footer">
                        <button onClick={ (e) => { onClickHandler(e, item) }} className={`btn ${buttons[index]}`} style={{ backgroundColor: "rgb(245, 143, 96)"}}>Vote { item }</button>
                    </div>
                </div>
                )
            })
        }
        </div>
        </>
    )
}