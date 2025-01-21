import {Fragment, useEffect, useState} from "react";


const updateDescription = async (params) => {
    try {
        const body = { description:params.description };
        const response = await fetch(
            `http://localhost:4000/todos/${params.todo_id}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        );
    } catch (err) {
        console.error(err.message);
    }
};

const deleteTodo = async id => {
    try {
        const deleteTodo = await fetch(`http://localhost:4000/todos/${id}`, {
            method: "DELETE"
        });
    } catch (err) {
        console.error(err.message);
    }
};

const ListTodos = (props) => {

    const [todos, setTodos] = useState([]);
    const [currentRowData, setCurrentRowData] = useState({
        todo_id:0,
        description:''
    });

    const getTodos = async () => {
        try {
            const response = await fetch("http://localhost:4000/todos");
            const jsonData = await response.json();

            setTodos(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };


    useEffect(() => {
        getTodos();
    }, [props.moment]);


    useEffect(() => {

        if(currentRowData.todo_id !== 0){}
        {
            console.log(currentRowData)
            updateDescription({
                description:currentRowData.description,
                todo_id:currentRowData.todo_id
            }).then(()=>{
                getTodos()
            })
        }
    }, [currentRowData]);

    return(
        <Fragment>
            <table className="table mt-5 text-center">
                <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>

                <tbody>
                {todos.map((todo) => (
                    <tr key={todo.todo_id}>
                        <td style={{textAlign:'start',verticalAlign:'middle'}}>{todo.description}</td>
                        <td>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={todo.description}
                                    onChange={e => {
                                        setCurrentRowData((prevState)=>{
                                            return {...prevState,
                                                description: e.target.value,
                                                todo_id: todo.todo_id
                                            };
                                        })
                                    }}
                                />
                            </div>
                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() =>
                                    deleteTodo(todo.todo_id)
                                        .then(()=>{
                                            getTodos()
                                        })
                            }
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
            <div>{JSON.stringify(currentRowData)}</div>
        </Fragment>
    )
}

export default ListTodos
