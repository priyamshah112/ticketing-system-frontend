import React from "react";

import { Collapse } from 'antd';

function Faq(props) {

    const { data } = props;
    const { Panel } = Collapse;

    function callback(key) {
        //console.log(key);
    }
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
    return (
        <div className="card">
            <div className="card-head">
            </div>
            <div className="card-body">
                <div className="card-title mb-3">Faq's</div>
                <Collapse onChange={callback} accordion>
                    {
                        data && data.map((x, i) => (
                            <Panel header={x.question} key={i}>
                                <p>{x.answer}</p>
                            </Panel>
                        ))
                    }

                </Collapse>
            </div>
        </div>
    )

}

export default Faq;