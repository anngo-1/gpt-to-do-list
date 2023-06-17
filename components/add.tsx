'use client';
import Task from './task';
import {useState} from 'react';
function AddButton() {
  const [content, setContent] = useState<React.JSX.Element[]>([]);

    const createTask = () => {
      const newTask: JSX.Element = <Task />
      setContent(prevContent => [...prevContent, newTask]);
    };


    return (
      <div>
      <div className = "text-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick = {createTask}>Add task</button>
      </div>
      <div className = "flex flex-col h-1/2 z-0 mt-5">
      {content}
      </div>
      </div>
    );
  }

  export default AddButton;