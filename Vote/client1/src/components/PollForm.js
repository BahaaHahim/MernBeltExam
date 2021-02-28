import React, { useState } from 'react';

import axios from 'axios';

import Alert from 'react-bootstrap/Alert';

export default (props) => {
    const { setPage } = props;
    //keep track of what is being typed via useState hook
    const [question, setQuestion] = useState(""); 
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    // error message
    const [message, setMessage] = useState("")

    //handler when the form is submitted
    const onSubmitHandler = e => {
        //prevent default behavior of the submit
        e.preventDefault();
       
        //make a post request to create a new poll
        const options = [ ];
        if (option1 !== "")
            options.push(option1);
        if (option2 !== "")
            options.push(option2);
        if (option3 !== "")
            options.push(option3);
        if (option4 !== "")
            options.push(option4);
        if (question.length < 10) {
            return setMessage("Question must be at least 10 characters long");
        }
        if (options.length < 2) {
            return setMessage("Options must be at least 2");
        }
        const votes = [], number_of_votes = 0;
        setMessage("");
        axios.post('http://localhost:8000/api/polls', {
            question,
            options,
            votes,
            number_of_votes
        }).then((res) => setPage(["home", {}])
        ).catch( (error) => setMessage(error.message) )
    }
    //onChange to update firstName and lastName
    return (
        <>
        {
            message !== "" && <Alert variant="danger"><p>{ message }</p></Alert>
        }
        <div className="row">
            <div className="col"></div>
            <div className="col clearfix">
                <button type="button" className="btn btn-primary float-right" onClick={ (e) => props.setPage(["home", {}])}>back to home</button>
            </div>
        </div>
        <form onSubmit={onSubmitHandler}>
            <div className="row">
                <div className="col">
                    <div className="form-group">
                        <label >Your Question: </label>
                        <input type="textarea" className="form-control" id="questionTextArea" rows="3" onChange={(e) => setQuestion(e.target.value)} />
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="option1Text">Option 1:*</label>
                        <input type="text" className="form-control" id="option1Text" onChange={(e) => setOption1(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="option2Text">Option 2:* </label>
                        <input type="text" className="form-control" id="option2Text" onChange={(e) => setOption2(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="option3Text">Option 3: </label>
                        <input type="text" className="form-control" id="option3Text" onChange={(e) => setOption3(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
            
                    <button type="submit" className="btn btn-primary" style={{width: 350 , backgroundColor: " rgb(157, 219, 121)"}}  >Submit Poll</button>
                    <br />
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="option4Text">Option 4: </label>
                        <input type="text" className="form-control" id="option4Text" onChange={(e) => setOption4(e.target.value)} />
                    </div>
                </div>
            </div>
        </form>
        </>
    )
}