

import Link from 'next/link'
import { Features } from './Features'
import { Dots } from './Dots';


interface WelcomePageProps {}

export function WelcomeSection({}: WelcomePageProps) {

  return (
    <div className="hero min-h-screen bg-base-200 relative">
      <div className="hero-content text-center">
        {/* <div className="absolute top-5 right-10">
          <Link href="/login" className="btn btn-secondary-focus ">
            Login
          </Link>
        </div> */}
        <div className="flex min-h-[200px] flex-col items-center justify-evenly gap-5 z-50">
          <h1 className="text-5xl font-bold">Welcome To Sherpa</h1>
          <p className="text-2xl text-accent ">
            Your smart job application assistant
          </p>
          <Features />

          <div className="flex  gap-2 z-40">
            <Link href="/dashboard" className="btn-secondary-focus btn">
              Get Started
            </Link>
            <Link href="/login" className="btn-secondary-focus btn">
              Or login to continue
            </Link>
          </div>
        </div>

          <div className='flex gap-2 absolute z-20 bg-opacity-10 bg-base-200 bottom-[40%] left-[5%]'>
            <Dots className=""  />
            <Dots className=""  />
          </div>
          <div className='flex gap-2 absolute z-20 bg-opacity-10 bg-base-200 bottom-[40%] right-[5%]'>
            <Dots className=""  />
            <Dots className=""  />
          </div>
      </div>
    </div>
  );
}
