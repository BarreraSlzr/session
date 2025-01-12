import { headers } from 'next/headers';
import content from '../content.json';
import { latinAmericanCountries } from '@/app/(internetfriends)/lib/latinAmericanCountries';
import { Availability } from './availability';

export default async function CompanyInfo() {
  const headersList = await headers()
  const country = headersList.get('X-Vercel-IP-Country') || 'default'
  const isFromLatinAmerica = latinAmericanCountries.includes(country.toUpperCase())
  const address = isFromLatinAmerica ? 'Working Remote 🌐' 
  : content.companyInfo.address2

  return (
    <section className="sm:px-6 px-2 md:px-8 pb-2 pt-2">
      <div className="flex flex-col">
        <h1 className="text-lg font-medium h-5">{content.companyInfo.title}</h1>
        <p>{content.companyInfo.address1}</p>
        <p>{address}</p>
        <Availability className='pt-12'/>
      </div>
    </section>
  );
}