import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Footer from "./Footer";

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
        setTask({
          username: "",
          title: "",
          description: "",
          dedline: "",
          completed: false,
        });
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

  const EditHandler = (id) => {
    const task = todos.find((todo) => todo._id === id);
    setTask({
      _id: task._id,
      username: task.username,
      title: task.title,
      description: task.description,
      completed: false,
    });
  };

  const EditTask = (id) => {
    axios
      .put("http://localhost:3000/goals/edit/" + id, task)
      .then((result) => {
        setTodos((Todos) =>
          Todos.map((todo) => (todo._id === id ? { ...todo, ...task } : todo))
        );
        console.log("Edited goal");
        setTask({
          username: "",
          title: "",
          description: "",
          dedline: "",
          completed: false,
        });
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
      {/* form */}
      <div className="form">
        <div className="input-group">
          <label className="input-label">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={task.username}
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
            value={task.title}
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
            value={task.description}
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
            value={task.dedline}
            id="dedline"
            onChange={TaskHandle}
            className="input-field"
          />
        </div>

        <button
          onClick={() => (task._id ? EditTask(task._id) : CreateTask())}
          className="submit-button"
        >
          {`${task._id ? "Edit Goal" : "Add Goal"}`}
        </button>
      </div>
      {/* goals */}
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
              <div className="todo-detail addedon">
                Added on: {todo.addedon}
              </div>
              <div className="todo-detail dedline">
                Deadline: {todo.dedline}
              </div>
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
                <button className="edit-button" onClick={() => EditHandler(todo._id)}>Edit</button>
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
      <Footer />
    </>
  );
}

export default App;
