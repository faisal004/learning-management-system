import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <div>
      <Link href={"/"}>
      <Image height={40} width={40} alt="Logo" src="/logo.svg" />
      
      </Link>
      
    </div>
  )
}

export default Logo
