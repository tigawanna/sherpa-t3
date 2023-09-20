

import Link from 'next/link'
import { Features } from './Features'


interface WelcomePageProps {}

export function WelcomeSection({}: WelcomePageProps) {

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        {/* <div className="absolute top-5 right-10">
          <Link href="/login" className="btn btn-secondary-focus ">
            Login
          </Link>
        </div> */}
        <div className="min-h-[200px] flex flex-col justify-evenly items-center gap-5">
          <h1 className="text-5xl font-bold">Welcome To Sherpa</h1>
          <p className="text-2xl text-accent ">
            Your smart job application assistant
          </p>
          <Features />

          <div className="flex  gap-2">
            <Link href="/dashboard" className="btn btn-secondary-focus">
              Get Started
            </Link>
            <Link href="/login" className="btn btn-secondary-focus">
              Or login to continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
