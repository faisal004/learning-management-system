import Image from 'next/image'

const Logo = () => {
  return (
    <div>
      <Image height={13} width={13} alt="Logo" src="/logo.svg" />
    </div>
  )
}

export default Logo
