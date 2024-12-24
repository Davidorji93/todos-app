"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ToDoItem } from "./domain/models/todos";
import {
  Checkbox,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Stack,
} from "@mui/material";

export default function Home() {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<ToDoItem | null>(null);
  const [formState, setFormState] = useState({ content: "", dueDate: "" });

  useEffect(() => {
    axios.get("/api/todos").then((response) => setTodos(response.data));
  }, []);

  // Handle form state changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Open the dialog for creating a new todo
  const handleOpenCreate = () => {
    setEditingTodo(null);
    setFormState({ content: "", dueDate: "" });
    setOpen(true);
  };

  // Open the dialog for editing an existing todo
  const handleOpenEdit = (todo: ToDoItem) => {
    setEditingTodo(todo);
    setFormState({ content: todo.content, dueDate: todo.dueDate || "" });
    setOpen(true);
  };

  // Close the dialog
  const handleClose = () => {
    setOpen(false);
    setEditingTodo(null);
    setFormState({ content: "", dueDate: "" });
  };

  // Submit the form for creating or editing a todo
  const handleSubmit = async () => {
    if (editingTodo) {
      // Editing an existing todo
      const updatedTodo = { ...editingTodo, ...formState };
      await axios.put(`/api/todos/${editingTodo.id}`, updatedTodo);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === editingTodo.id ? updatedTodo : todo))
      );
    } else {
      // Creating a new todo
      const newTodo: ToDoItem = {
        id: Date.now().toString(),
        content: formState.content,
        dueDate: formState.dueDate,
        status: "unfinished",
      };
      await axios.post("/api/todos", newTodo);
      setTodos((prev) => [...prev, newTodo]);
    }
    handleClose();
  };

  // Delete a todo
  const handleDelete = async (id: string) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      {/* Header Section */}
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: 3 }}
      >
        <h1>To-Do List</h1>
        <Button variant="contained" onClick={handleOpenCreate}>
          Add Item
        </Button>
      </Stack>

      {/* To-Do List */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Checkbox checked={todo.status === "done"} />
            {todo.content}
            <Button onClick={() => handleOpenEdit(todo)}>Edit</Button>
            <Button onClick={() => handleDelete(todo.id)}>Delete</Button>
          </li>
        ))}
      </ul>

      {/* Form Dialog for Create/Edit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingTodo ? "Edit To-Do Item" : "Add To-Do Item"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Content"
            name="content"
            value={formState.content}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Due Date"
            name="dueDate"
            type="date"
            value={formState.dueDate}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingTodo ? "Save Changes" : "Add Item"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
