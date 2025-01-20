
import React, { Fragment, useState } from "react";

const InputTodo = props => {

    const [description, setDescription] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        const body = {description}
        console.log("=== body1 ", body)
        const response = await fetch("http://localhost:5000/todos", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        })
        // console.log("=== Response: ", response)
    }

    return(
        <Fragment>
            <h1>ToDo List CRUD</h1>
                <form onSubmit={onSubmit} className={'d-flex mt-5'}>
                    <input type="text"
                           className={'form-control h-100 '}
                           value={description}
                           onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="btn btn-success h-100 ">Add</button>
                    {/*<div>description {description}</div>*/}
                </form>
        </Fragment>
    )

}

export default InputTodo
