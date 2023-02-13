import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {BsFillCheckCircleFill} from "react-icons/bs"
import "./App.css";

const defaultState = {
  inputVal: "",
  tasks: [],
  isDuplicate: false,
  isEmpty: false,
};

export default function App() {
  const [state, setState] = useState(defaultState);

  function updateValue(e) {
    setState({ ...state, inputVal: e.target.value });
  }

  function addTask(e) {
    e.preventDefault();
    const temporary = [...state.tasks];

    // check if task is not empty string
    if (!state.inputVal.length) {
      setState({ ...state, isEmpty: true });
      return;
    }

    // check if task already exists
    if (temporary.some((item)=> item.content === state.inputVal)) {
      setState({ ...state, isDuplicate: true });
      return;
    }

    temporary.push({content: state.inputVal, done: false});
    setState({ ...state, tasks: temporary, inputVal: "" });

    console.log(state.tasks)
  }

  function setDone(i) {
    const updatedTasks = state.tasks.map((item, index) =>
      index === i ? { ...item, done: !item.done } : item
    );
    setState({ ...state, tasks: updatedTasks });
  }

  function deleteTask(index) {
    const tasks = state.tasks.filter((x, i) => index !== i);
    setState({ ...state, tasks });
  }

  function removeAlert(e) {
    setState({ ...state, isDuplicate: false, isEmpty: false });
  }

  return (
    <>
      <form onSubmit={addTask}>
        <div className="input-group mb-3 input-group-lg">
          <div className="input-group-prepend">
            <span className="input-group-text">Define your task</span>
          </div>
          <input
            type="text"
            className="form-control"
            onChange={updateValue}
            value={state.inputVal}
          />
          <button type="submit" className="btn btn-lg btn-primary">
            Add a task
          </button>
        </div>
      </form>

      {state.isDuplicate && (
        <div className="alert alert-danger">
          <strong>Failure!</strong> Task has been already defined!
          <button type="button" onClick={removeAlert} className="close">
            x
          </button>
        </div>
      )}

      {state.isEmpty && (
        <div className="alert alert-warning">
          <strong>Attention!</strong> Write something{" "}
          <button type="button" onClick={removeAlert} className="close">
            x
          </button>
        </div>
      )}

      <div className="container">
        <ul>
          {state.tasks.map((task, index) => (
            <li key={task.content} className="list-group-item">
              {task.content} {" "}
              {task.done && <BsFillCheckCircleFill color="green" />}
              <button
                onClick={() => setDone(index)}
                className="btn btn-warning float-right"
              >
                Set to Done
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="btn btn-danger float-right mx-3"
              >
                Delete task
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
