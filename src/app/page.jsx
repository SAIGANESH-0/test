"use client";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: todo,
    };
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setTodos((oldTodos) => [...oldTodos, data]))
      .catch((error) => {
        console.error("Error:", error);
      });

    setTodo("");
  };
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>NextJS Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <form className="flex mt-10" onSubmit={handleSubmit}>
          <input
            className="flex-grow focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-l-md border border-gray-300 px-4 py-2 mr-0"
            type="text"
            value={todo}
            onChange={handleInputChange}
            placeholder="Add a todo"
          />
          <button
            className="flex-none rounded-r-md border border-gray-300 bg-blue-500 text-white px-4 py-2"
            type="submit"
          >
            Add Todo
          </button>
        </form>
        {todos?.map((todo, i) => {
          return (
            <div key={i} className="border-b-2 border-gray-300 py-4">
              {todo.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
