import React, { useEffect, useState } from 'react'
import axios from 'axios'; 

import PollSummary from './PollSummary';
import Alert from 'react-bootstrap/Alert';

export default (props) => {

    const [message, setMessage] = useState("");
    const [top3, setTop3] = useState([]);
    const [recent, setRecent] = useState([]);

    useEffect(()=>{
        axios
        .get( "http://localhost:8000/api/polls" )
        .then( (res) => {
            const t3 = [...res.data].sort((a, b) => b.number_of_votes - a.number_of_votes).slice(0,3);
            setTop3( t3 );
            const r = [...res.data].filter((item) => t3.indexOf(item) === -1);
            setRecent(r);
        })
        .catch( (error) => setMessage(error) )
    }, []);

    return (
        <>
        {
            message !== "" && <Alert variant="danger"><p>{ message }</p></Alert>
        }
        <div className="row">
            <div className="col">
            </div>
            <div className="col clearfix">
                <button type="button" className="btn btn-primary float-right" onClick={ (e) => props.setPage(["create", {}])}>Create your own poll</button>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <h2>Top 3 polls</h2>
                <div className="content">
                    {
                        top3.length !== 0 && top3.map( (item, index) => {
                            return <PollSummary key={index} poll={item} setPage={props.setPage} />
                        } )
                    }
                    {
                        top3.length === 0 && <div>No poll available</div>
                    }
                </div>
            </div>
            <div className="col">
                <h2>Recent polls</h2>
                <div className="content">
                    {
                        recent.length !== 0 && recent.map( (item, index) => {
                            return <PollSummary key={index} poll={item} setPage={props.setPage} />
                        } )
                    }
                    {
                        recent.length === 0 && <div>No poll available</div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}