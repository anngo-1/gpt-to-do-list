
import React, { useState, ChangeEvent } from 'react';
import Generate from './generate';
import { OpenAI } from "langchain/llms/openai";


export interface Props {
    num: number;
    steps: string[]
}

const Task = () => {
  let generated: string[] = [];
  const [content, setContent] = useState<JSX.Element>(<div></div>);
  const [componentVisible, setComponentVisible] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [textareaValue, setTextareaValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  const deleteTask = () => {
    setComponentVisible(false);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const generateClick = async() => {
    const model = new OpenAI({ openAIApiKey: "", temperature: 0.9 });
    
    if (textareaValue != "") {
    console.log("generating...")
    const temp: JSX.Element = <p>attempting to generate action steps... (may take a second)</p>
    setContent(temp);

    const res = await model.call(
        `Generate a numbered list of action steps for this task: ${textareaValue}`
    );
    
    if(res == null || res == "") {
        alert("failed to generate action steps.")
        return;
    }

    // putting GPT generated list into an array
    const lines = res.split(/\d+\.\s+/);
    lines.shift();
    generated = lines.map((line) => line.replace("\n", ""))
    const newTask: JSX.Element = <Generate num={generated.length} steps={generated}/>
    setContent(newTask);
    
    } else {
        alert("cannot generate steps for an empty task")
    }
    
  };
  if (!componentVisible) {
    return null; // return null to hide the component when it's not visible
  }

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          style={{ transform: 'scale(2)' }}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>
        <textarea
          className={isChecked ? 'ml-3 h-auto align-top text-2xl line-through resize-none' : 'ml-3 h-auto align-top text-2xl resize-none'}
          placeholder="Enter a task"
          value={textareaValue}
          onChange={handleChange}
        />
      </td>
      <td>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2 mt-5" onClick={deleteTask}>
          Delete
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2" onClick = {generateClick}>
          Generate action steps
        </button>
      </td>
      {content}


    </tr>

  );
};

export default Task;
