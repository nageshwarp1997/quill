import React, { useRef } from "react";
import "quill/dist/quill.snow.css";
import NewEditor from "./NewEditor";
import Quill, { Delta, Range } from "quill";

const App: React.FC = () => {
  const blobUrlsRef = useRef<string[]>([]); // Store blob URLs for cleanup
  const quillRef = useRef<Quill | null>(null);
  const contentRef = useRef("");

  const handleTextChange = () => {
    if (quillRef.current) {
      contentRef.current = quillRef.current.root.innerHTML; // Storing HTML content
      console.log("Updated Content:", contentRef.current);
    }
  };

  const handleSelectionChange = (
    range: Range | null,
    oldRange: Range | null,
    source: string
  ) => {
    if (!range) return;
    console.log("Old Selection:", oldRange);
    console.log("New Selection:", range);
    console.log("Source:", source);
  };

  return (
    <div style={{ padding: "20px" }}>
      <form style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Title"
          style={{ border: "1px solid red" }}
        />
        <NewEditor
          ref={quillRef}
          defaultValue={new Delta().insert("Hello, world!\n")}
          blobUrlsRef={blobUrlsRef}
          onTextChange={handleTextChange}
          onSelectionChange={handleSelectionChange}
        />
        <input
          type="submit"
          value="Submit"
          style={{ border: "1px solid pink", width: "100px" }}
        />
      </form>
    </div>
  );
};

export default App;
