import 'moment-timezone';

import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { RadialChart } from 'react-vis';

export default (props) => {
    const { poll, setPage } = props;
    const colors = ['red', 'blue', 'orange', 'green'];
    return (
        <>
        <div className="row">
            <div className="col">
            </div>
            <div className="col clearfix">
                <button type="button" className="btn btn-primary float-right" onClick={ (e) => setPage(["home", {}])}>Go back</button>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Alert variant="success">Thanks for voting! Here are the results.</Alert>
                <h2>{ poll.question }</h2>
            </div>
        </div>
        <div className="row">
        
            <div className="col">
                {
                    poll.options.map( (item, index) => {
                        let count = poll.votes.reduce((accumulative, current) => (current.option === item) ? accumulative + 1 : accumulative, 0);
                        return (<div key={index} className="d-flex">
                            <div className="mr-auto p-2">{item}</div>
                            <div className="p-2">{count} votes</div>
                        </div>)
                    } ) 
                }
            </div>
            <div className="col">
            </div>
        </div>
        </>
    )
};