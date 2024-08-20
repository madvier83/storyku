import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import the Quill styles

const QuillEditor = () => {
  const quillRef = useRef(null);

  useEffect(() => {
    const quillInstance = new Quill(quillRef.current, {
      theme: "snow", // or 'bubble'
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["image", "code-block"],
        ],
      },
    });

    return () => {
      quillInstance.off();
    };
  }, []);

  return <div ref={quillRef} />;
};

export default QuillEditor;
