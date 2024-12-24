
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

export default function Create() {
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newToDo = {
      id: Date.now().toString(), 
      content,
      dueDate,
      status: 'unfinished',
    };

    await axios.post('/api/todos', newToDo);
    router.push('/'); 
  };

  return (
    <div>
      <h1>Add To-Do Item</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" fullWidth>
          Add Item
        </Button>
      </form>
    </div>
  );
}
