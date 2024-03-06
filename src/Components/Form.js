import React from 'react';
import axios from 'axios';

// this component manage form 
const Form = ({ componentData, setComponentData, setDisplayForm, displayForm, setApiCallCount }) => {
    const url = process.env.REACT_APP_BACKEND_URL;
    // handle form submit
    const submit_form = async (e) => {
        e.preventDefault();
        // get value from form
        const { heading, paragraph } = e.target;
        // update value in database
        await axios.put(url + "update", { _id: componentData[0]._id, heading: heading.value, paragraph: paragraph.value })
            .then((res) => {
                setComponentData(res.data);   // update the componentData useState
            })
            .catch((err) => {
                console.log(err);
            })
        setDisplayForm({ show: false });       //close form
        setApiCallCount(prev => prev + 1);    // increase counter on api call
    }
    return (
        <div className='form_parent'>
            <span className='close' onClick={() => { setDisplayForm({ show: false }) }}>x</span>
            <form className='form' onSubmit={submit_form}>
                <label>Heading : </label>
                <input type='text' name='heading' placeholder='Heading' defaultValue={displayForm.option === "update" ? componentData[0].heading : ""} required></input>
                <label>Paragraph : </label>
                <textarea cols={10} rows={10} name='paragraph' placeholder='Paragraph' defaultValue={displayForm.option === "update" ? componentData[0].paragraph : ""} required></textarea>
                <button type='submit' className='form_btn'>Submit</button>
            </form>
        </div>
    )
}

export default Form