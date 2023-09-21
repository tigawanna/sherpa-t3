import Link from 'next/link'
import { Features } from './Features'
import { Dots } from './Dots';


interface WelcomePageProps {}

export function WelcomeSection({}: WelcomePageProps) {

  return (
    <div className="hero relative min-h-screen bg-base-200">
      <div className="hero-content text-center">
        {/* <div className="absolute top-5 right-10">
          <Link href="/login" className="btn btn-secondary-focus ">
            Login
          </Link>
        </div> */}
        <div className="z-50 flex min-h-[200px] flex-col items-center justify-evenly gap-5">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome To Sherpa
          </h1>
          <p className="text-accent text-xl">
            Your smart job application assistant
          </p>
          <Features />

          <div className="z-40  flex gap-2">
            <Link href="/dashboard" className="btn-secondary-focus btn">
              Get Started
            </Link>
            <Link href="/login" className="btn-secondary-focus btn">
              Or login to continue
            </Link>
          </div>
        </div>

        <div className="absolute bottom-[40%] left-[5%] z-20 flex gap-2 bg-base-200 bg-opacity-10">
          <Dots className="" />
          <Dots className="" />
        </div>
        <div className="absolute bottom-[40%] right-[5%] z-20 flex gap-2 bg-base-200 bg-opacity-10">
          <Dots className="" />
          <Dots className="" />
        </div>
      </div>
    </div>
  );
}
