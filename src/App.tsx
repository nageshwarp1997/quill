import React, { useRef, useState } from "react";
import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
import NewEditor from "./NewEditor";
import Quill from "quill";

const App: React.FC = () => {
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef<Quill | null>(null);
  console.log("editorContent", editorContent);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Quill Text Editor</h1>
      <NewEditor
        ref={quillRef}
        onTextChange={() => {
          if (quillRef.current) {
            setEditorContent(quillRef.current.root.innerHTML); // ✅ Get HTML output
          }
        }}
      />
      <div className="preview">
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />{" "}
        {/* ✅ Render HTML safely */}
      </div>
    </div>
  );
};

export default App;
