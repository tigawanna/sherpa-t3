import { ResumeFields } from "./ResumeMutiStepForm";
import { ResumeTemplate } from "./compoents/ResumeTemplate";

interface FinalResumeProps {
  user_id: string;
  input: ResumeFields;
  setInput: React.Dispatch<React.SetStateAction<ResumeFields>>;
  handleChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export function FinalResume({input}:FinalResumeProps){
  
return (
 <div className='w-full h-full flex items-center justify-center'>
    <ResumeTemplate resume={input}/>
 </div>
);
}
