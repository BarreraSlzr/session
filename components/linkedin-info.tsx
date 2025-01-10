import Image from 'next/image'

interface LinkedInInfoProps {
  className?: string
  children?: any
}

export function LinkedInInfo({ className, children }: LinkedInInfoProps) {
  return (
    <div
      className={`flex items-center space-x-3 my-3 ${className}`}
    >
      <Image
        src="https://github.com/BarreraSlzr.png"
        alt="Emmanuel Barrera"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className='text-left'>
        <h2 className="font-semibold">Emmanuel Barrera</h2>
        <p className="text-sm">Sofia - AI Engineer</p>
        {children}    
      </div>
    </div>
  )
}

