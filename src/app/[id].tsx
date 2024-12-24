 
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState({
    content: '',
    dueDate: '',
    status: 'unfinished',
  });

  useEffect(() => {
    if (id) {
      axios.get(`/api/todos/${id}`).then(response => {
        setTodo(response.data);
      });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`/api/todos/${id}`, todo);
    router.push('/'); // Redirect to home page after editing the item
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1>Edit To-Do Item</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Content"
          name="content"
          value={todo.content}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Due Date"
          name="dueDate"
          type="date"
          value={todo.dueDate}
          onChange={handleChange}
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
