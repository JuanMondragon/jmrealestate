
import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box , Text, Button } from '@chakra-ui/react'

import {baseUrl, fetchApi} from '../utils/fetchApi'
import Property from '../components/Property'

///NOTE - create a reusable banner here that passes props 
///!SECTION to render the images change the nextconfig files to an object with the correct domain name


const Banner =({purpose, title, title2, desc1, desc2, buttonText, linkName, imageURL}) => (
<Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
  <Image src={imageURL} width={500} height={300} alt='banner' />
  <Box p='5'>
    <Text color='gray.500' fontSize='sm' fontWeight='medium' >{purpose}</Text>
    <Text  fontSize='3xl' fontWeight='bold' >{title} <br/>{title2}</Text>
    <Text color='gray.700' fontSize='xl'paddingTop='3' paddingBottom='3'>{desc1} <br/>{desc2}</Text>
    <Button  fontSize='xl'>

    <Link  href={linkName} > {buttonText}</Link>
    </Button>
  </Box>
</Flex>
)

export default function Home({propertiesForRent,propertiesForSale}) {
  console.log(propertiesForRent,propertiesForSale)
  return (
    <Box >
      
      <Banner
        purpose='Rent A HOME'
        title='Rental Homes For'
        title2='Everyone'
        desc1='Explore Aparments, Villas, Homes' 
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageURL="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />
      <Flex flexWrap='wrap'>
        {/*!SECTION fetch the props and map over them...*/ }
        {propertiesForRent.map((property)=> <Property property={property} key={property.id}/>)}
      </Flex>
      <Banner
        purpose='Buy A HOME'
        title='Find, Buy & Own Your'
        title2='Dream Home'
        desc1='Explore Aparments, Villas, Homes' 
        desc2='and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageURL='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
      />
      {/*!SECTION fetch the props and map over them...*/ }
      <Flex flexWrap='wrap'>
      {propertiesForSale.map((property)=> <Property property={property} key={property.id}/>)}

      </Flex>
      
    </Box>
  )
}
//NOTE - returning the props below allows you to pass the properties into the app above , automactically adds to the props on top 
export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)


  return {
    props:{
      propertiesForSale:propertyForSale?.hits,
      propertiesForRent:propertyForRent?.hits,
    }
  }
}
