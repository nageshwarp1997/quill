import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill, { Delta, Range } from "quill";
import "quill/dist/quill.snow.css";

interface EditorProps {
  readOnly?: boolean;
  defaultValue?: Delta;
  onTextChange?: (delta: Delta, oldDelta: Delta, source: string) => void;
  onSelectionChange?: (
    range: Range | null,
    oldRange: Range | null,
    source: string
  ) => void;
}

const NewEditor = forwardRef<Quill | null, EditorProps>(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);
    const quillInstance = useRef<Quill | null>(null);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const editorContainer = document.createElement("div");
      container.innerHTML = ""; // Clear previous content
      container.appendChild(editorContainer);

      const quill = new Quill(editorContainer, {
        theme: "snow",
      });

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on("text-change", (delta, oldDelta, source) => {
        onTextChangeRef.current?.(delta, oldDelta, source);
      });

      quill.on("selection-change", (range, oldRange, source) => {
        onSelectionChangeRef.current?.(range, oldRange, source);
      });

      // Assign instance to ref
      quillInstance.current = quill;
      if (typeof ref === "function") {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      return () => {
        quillInstance.current = null;
        if (ref && "current" in ref) {
          ref.current = null;
        }
        container.innerHTML = ""; // Cleanup
      };
    }, [ref]);

    useEffect(() => {
      quillInstance.current?.enable(!readOnly);
    }, [readOnly]);

    return <div ref={containerRef} />;
  }
);

NewEditor.displayName = "Editor";

export default NewEditor;
