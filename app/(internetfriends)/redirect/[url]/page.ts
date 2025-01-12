import { platformUrls } from '@/app/(internetfriends)/lib/platformURLs'
import { redirect } from 'next/navigation'

type ParamProps = {
  url: string
}

export default async function RedirectPage(props: { params: Promise<ParamProps> }) {
  const params = await props.params;
  const url = platformUrls[params.url.toLowerCase()]

  if (url) {
    redirect(url)
  } else {
    if( params.url ){
      redirect(`https://${params.url}`)
    } else {
      redirect('/')  // Redirect to homepage if platform is not found
    }
  }
}

