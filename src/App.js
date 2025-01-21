
import React, { Fragment } from "react";
import "./App.css";

import { useEffect, useState } from "react";

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {

    const [state, setState] = useState({
        moment:0
    });

    useEffect(() => {

        console.log("=== moment",state.moment)

        return () => {

        };
    }, [state.moment]);


    return (
      <Fragment>
        <div className="container">
          <InputTodo callAfterAdd={()=>{ setState({moment:Date.now()})}}/>
          <ListTodos moment={state.moment} />
        </div>
      </Fragment>
  );
}

export default App;
