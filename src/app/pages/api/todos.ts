import { ToDoItem } from "@/app/domain/models/todos";
import { NextApiRequest, NextApiResponse } from "next";

let todos: ToDoItem[] = [];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      res.status(200).json(todos);
      break;

    case "POST":
      const newTodo = req.body;
      todos.push(newTodo);
      res.status(201).json(newTodo);
      break;

    case "PUT":
      const updatedTodo = req.body;
      todos = todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo));
      res.status(200).json(updatedTodo);
      break;

    case "DELETE":
      const { id } = req.query;
      todos = todos.filter((todo) => todo.id !== id);
      res.status(200).json({ message: "Deleted successfully" });
      break;

    default:
      res.status(405).end();
  }
}
