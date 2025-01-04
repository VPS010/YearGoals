import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState({
    username: "",
    title: "",
    description: "",
    dedline: "",
    completed: false,
  });

  const TaskHandle = (e) => {
    const { name, value } = e.target;

    setTask((task) => ({
      ...task,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/goals/")
      .then((result) => setTodos(result.data))
      .catch((e) => console.log(e));
  }, []);

  const CreateTask = () => {
    if (!task.username || !task.title || !task.description || !task.dedline) {
      alert("All fields are required.");
      return;
    }
    axios
      .post("http://localhost:3000/goals/add", task)
      .then((result) => {
        setTodos((todos) => [...todos, result.data]);
        console.log("Data sent");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const DoneHandler = (id) => {
    axios
      .put("http://localhost:3000/goals/" + id)
      .then((result) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
          )
        );
        console.log("Done" + id);
      })
      .catch((e) => console.log(e));
  };

  const DeleteHandler = (id) => {
    axios
      .delete("http://localhost:3000/goals/" + id)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        console.log("Deleted");
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <h1 className="Heading">YearGoals</h1>
      <div className="form">
        <div className="input-group">
          <label className="input-label">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={TaskHandle}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Goal Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Goal Title"
            onChange={TaskHandle}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Goal Description"
            onChange={TaskHandle}
            className="input-field"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Deadline:</label>
          <input
            type="date"
            name="dedline"
            id="dedline"
            onChange={TaskHandle}
            className="input-field"
          />
        </div>

        <button onClick={CreateTask} className="submit-button">
          Add Goal
        </button>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <div className="no-records">
            <h2>No Records</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className={`todo-item ${todo.completed ? "Completed" : ""}`}
            >
              <div className="todo-detail title">{todo.title}</div>
              <div className="todo-detail description">{todo.description}</div>
              <div className="todo-detail addedon">Added on: {todo.addedon}</div>
              <div className="todo-detail dedline">Deadline: {todo.dedline}</div>
              <div className="todo-detail username">{todo.username}</div>
              <div className="todo-actions">
                <button
                  className={`${
                    todo.completed ? "incomplete-button" : "completed-button"
                  }`}
                  onClick={() => DoneHandler(todo._id)}
                >
                  {`${todo.completed ? "Mark InComplete" : "Completed"}`}
                </button>
                <button>Edit</button>
                <button
                  className="delete-button"
                  onClick={() => DeleteHandler(todo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
