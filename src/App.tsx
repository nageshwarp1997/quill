import React, { FormEvent, useRef } from "react";
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
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!quillRef.current) return;

    const quill = quillRef.current;
    let content = quill.root.innerHTML; // Get the current Quill content
    console.log("Before Upload - Content:", content);

    // Map each blob URL to Cloudinary upload and get URLs
    const uploadPromises = blobUrlsRef.current.map(async (blobUrl, index) => {
      try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const file = new File([blob], `image-${index}.png`, {
          type: blob.type,
        });

        console.log("file", file);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("folderName", "Blog_Images"); // Replace with your Cloudinary preset

        const resp = await fetch("http://localhost:8080/api/upload/image", {
          method: "POST",
          body: formData,
        });

        const data = await resp.json();
        console.log("Uploaded Image URL:", data);

        // return data.cloudUrl;

        // console.log(`Uploaded Image ${index}:`, data.secure_url);

        return { blobUrl, cloudUrl: data.cloudUrl };
      } catch (error) {
        console.error("Upload error:", error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);

    console.log("uploadedImages", uploadedImages);

    // Filter out null values to ensure type safety
    const validUploadedImages = uploadedImages.filter(
      (img): img is { blobUrl: string; cloudUrl: string } => img !== null
    );

    validUploadedImages.forEach(({ blobUrl, cloudUrl }) => {
      content = content.replace(blobUrl, cloudUrl);
    });

    console.log("After Upload - Updated Content:", content);

    // Update Quill editor with the new content
    quill.root.innerHTML = content;

    // Clear blob URL references
    blobUrlsRef.current = [];
  };

  return (
    <div style={{ padding: "20px" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
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
