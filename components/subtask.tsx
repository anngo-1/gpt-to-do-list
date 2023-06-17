import React, { ChangeEvent, useState } from 'react';

const Subtask = (Subtaskprops:any) => {
  
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

  if (!componentVisible) {
    return null; // Return null to hide the component when it's not visible
  }

  return (
    <tr>
      <td>
        <input type="checkbox" style={{ transform: "scale(1.5)" }} checked={isChecked} onChange={handleCheckboxChange} />
      </td>
      <td>
        <textarea readOnly className={isChecked ? "ml-3 h-auto align-top text-l line-through resize-none" : "ml-3 h-auto align-top text-l resize-none"}onChange={handleChange}>{Subtaskprops.content}</textarea>
      </td>
      <td>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-0.5 px-1 rounded ml-2" onClick={deleteTask}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Subtask;
