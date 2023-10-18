import Image from 'next/image'

const Logo = () => {
  return (
    <div>
      <Image height={40} width={40} alt="Logo" src="/logo.svg" />
    </div>
  )
}

export default Logo
