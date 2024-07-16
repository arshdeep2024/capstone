import React from 'react'
import Card from '../Card/Card'
import { cardData } from './cards'
import authService from '../appwrite/auth'

function Shop() {

  return (
    <div className='flex flex-wrap justify-center'>
      <div className='flex flex-wrap mx-auto w-1/2'>
        {
          cardData.map((data) => (
            <Card 
            key={data.id}
            price={data.price} 
            test={data.name} 
            img={data.img}
            itemId={data.id}
            itemName={data.name}
            />
          ))
        }
      </div>
      
    </div>
  )
}

export default Shop