import dynamic from "next/dynamic";

interface indexProps {

}
const Editor = dynamic(
  () => import("~/components/shared/editor/CherryEditor"),
  { ssr: false },
);

export  default function EditorPage({}:indexProps){
return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
    <h2 className="text-2xl font-bold">Editor page</h2>
    <Editor/>

</div>
);
}


