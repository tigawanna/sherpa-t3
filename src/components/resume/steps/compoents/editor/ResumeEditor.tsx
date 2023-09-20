import Cherry from 'cherry-markdown';
import { useRef, useEffect } from 'react'
import { ResumeTemplate } from '../ResumeTemplate';
import ReactDOMServer from 'react-dom/server';
import APIs from './apis';
interface ResumeEditorProps {

}

export function ResumeEditor({}:ResumeEditorProps){
      const cherry = useRef<Cherry | null>(null);
      const text = ReactDOMServer.renderToString(<ResumeTemplate />);
      useEffect(() => {
        cherry.current = new Cherry({
          id: "cherry-markdown",
          value:text,
          locale: "en_US",
        });
      }, []);
return (
  <div className="flex h-full w-full items-center justify-center">
    <APIs cherry={cherry} />
    <div id="cherry-markdown" />
  </div>
);
}
