import { SignIn } from "@clerk/nextjs";
 
export default function Page() {

  return <div className="flex flex-col md:flex-row items-center">
  <SignIn />
  <div className="bg-slate-300 p-3 rounded-md flex flex-col text-center font-serif">
    Don&apos;t want to signin? try this with test user
    <span className="text-2xl">test99user88@gmail.com</span>
    <span className="text-2xl">Password - test99user88</span>
  </div>
  </div>
}