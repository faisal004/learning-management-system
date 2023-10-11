
import { UserButton } from "@clerk/nextjs"
export default function Home() {
  return (
    <div className='text-8xl'> <UserButton afterSignOutUrl="/"/></div>
  )
}
