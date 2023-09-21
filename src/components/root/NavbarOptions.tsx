import { ThemeToggle } from "../theme/ThemeToggle";
import { AuthShowcase } from "./AuthShowcase";

interface NavbarOptionsProps {

}

export function NavbarOptions({}:NavbarOptionsProps){
return (
 <div className='w-full h-full flex gap-3 items-center justify-center'>
    <AuthShowcase />
    <ThemeToggle />
 </div>
);
}
