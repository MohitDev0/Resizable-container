import React from 'react';
import { ResizableBox } from 'react-resizable'; //package for resizable 
import axios from 'axios';
import "./Resizable.css";

// this component render all the data

const Resizable = (props) => {

    const url = process.env.REACT_APP_BACKEND_URL;

    const handleButtonClick = async (elm, option,index) => {
        // to show form and set option which is add or update and send index to access the right data in form component
        props.setDisplayForm({ show: true, option ,index});
        // delete data from database when user click on add button
        if (option === 'add') {
            try {
                const res = await axios.put(url + 'delete', elm);
                props.setComponentData(res.data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className='parent_container'>
            {props.componentData.map((elm, i) => (
                <ResizableBox
                    className="resizable-container"
                    key={i}
                    width={200}    // initial width
                    height={200}   // initial height
                    resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}  // resizable sides
                >
                    <div>
                        <button onClick={() => handleButtonClick(elm, 'add', i)}>Add</button>
                        <button onClick={() => handleButtonClick(elm, "update", i)}>Update</button>
                        {/* show this line when there is no data present for component */}
                        {elm.heading === '' && elm.paragraph === '' && <div>Nothing Data to display</div>}
                        <h1 className="heading">{elm.heading}</h1>
                        <p className="paragraph">{elm.paragraph}</p>
                    </div>
                </ResizableBox>
            ))}
        </div>
    );
};

export default Resizable;
