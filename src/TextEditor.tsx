// import React, { useState } from "react";
// import ReactQuill from "react-quill";
// // import "quill/dist/quill.snow.css";
// import "quill/dist/quill.core.css";

// const TextEditor: React.FC = () => {
//   const [content, setContent] = useState("");

//   return (
//     <div>
//       <ReactQuill value={content} onChange={setContent} theme="snow" />
//       <div className="preview">
//         <h3>Preview:</h3>
//         <div dangerouslySetInnerHTML={{ __html: content }} />
//       </div>
//     </div>
//   );
// };

// export default TextEditor;

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css"; // Use snow theme for full toolbar support

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Header options
    ["bold", "italic", "underline", "strike"], // Text styles
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
    [{ indent: "-1" }, { indent: "+1" }], // Indentation
    [{ direction: "rtl" }], // Text direction
    [{ size: ["small", false, "large", "huge"] }], // Font sizes
    [{ color: [] }, { background: [] }], // Colors
    [{ font: [] }], // Font family
    [{ align: [] }], // Alignments
    ["link", "image"], // Media options
    ["clean"], // Remove formatting
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "script",
  "indent",
  "direction",
  "size",
  "color",
  "background",
  "font",
  "align",
  "link",
  "image",
];

const TextEditor: React.FC = () => {
  const [content, setContent] = useState("");

  console.log("content", content);

  

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        theme="snow"
      />
      <div className="preview">
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default TextEditor;
