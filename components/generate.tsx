import { useState, useEffect } from "react";
import Subtask from "./subtask";

interface GenerateProps {
  steps: string[];
  num: number;
}

function Generate(props: GenerateProps) {
  const [showing, setShowing] = useState(false);
  const [content, setContent] = useState<JSX.Element[]>([]);

  const toggleShow = () => {
    if (!showing) {
      props.steps.forEach((step: string) => {
        const newTask: JSX.Element = <Subtask content={step} />;
        setContent((prevContent) => [...prevContent, newTask]);
      });
    } else {
      setContent([]);
    }
    setShowing((prevShowing) => !prevShowing);
  };

  const buttonText = showing
    ? `Hide action steps (${props.num})`
    : `Show action steps (${props.num})`;

  useEffect(() => {
    // Resize text areas when content changes
    const resizeTextAreas = () => {
      const textAreas = document.querySelectorAll("textarea");
      textAreas.forEach((textArea) => {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
      });
    };

    resizeTextAreas();

    // Clean up event listener
    return () => {
      window.removeEventListener("resize", resizeTextAreas);
    };
  }, [content]);

  useEffect(() => {
    // Resize text areas on component mount
    const resizeTextAreas = () => {
      const textAreas = document.querySelectorAll("textarea");
      textAreas.forEach((textArea) => {
        textArea.style.height = "auto";
        textArea.style.height = `${textArea.scrollHeight}px`;
      });
    };

    resizeTextAreas();

    window.addEventListener("resize", resizeTextAreas);

    return () => {
      // Clean up event listener
      window.removeEventListener("resize", resizeTextAreas);
    };
  }, []);

  return (
    <div className="pl-11">
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-0.5 px-1 rounded ml-2 mt-2 mb-5"
        onClick={toggleShow}
      >
        {buttonText}
      </button>
      {content}
    </div>
  );
}

export default Generate;
