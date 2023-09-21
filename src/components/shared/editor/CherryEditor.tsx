import { useRef, useEffect, useLayoutEffect } from "react";
import Cherry from "cherry-markdown/dist/cherry-markdown.core";

interface CherryEditorProps {

}

export default function CherryEditor({}:CherryEditorProps){
  const cherry = useRef<Cherry | null>(null);
  useLayoutEffect(() => {
    if (!cherry.current) {
      cherry.current = new Cherry({
        id: "cherry-markdown",
        value: "# Hello World",
        locale: "en_US",
      });
    }
  }, []);

  return (
    <div className="home">
      {/* <APIs cherry={cherry} /> */}
      <div id="cherry-markdown" />
    </div>
  );
}
