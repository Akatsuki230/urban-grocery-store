import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css'
import { navbar } from '@/components/navbar'
import { useEffect, useRef, useState } from 'react'
import { itemList } from '@/components/itemList'
import { get, getAll } from '@vercel/edge-config'
import { GetServerSidePropsContext } from 'next'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const ugs = await get('ugs') as { open: boolean }
  return {
    props: {
      open: ugs.open
    }
  }
}

export default function Home(props: { open: boolean }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('All')
  const [itemsInCart, setItemsInCart] = useState<string[]>([])
  const hasLoaded = useRef(false)

  let categories: string[] = []
  categories.push('All')
  for (let item in itemList) {
    if (!categories.includes(itemList[item].category)) {
      categories.push(itemList[item].category)
    }
  }
  let price = 0
  for (let item in itemsInCart) {
    const item2 = itemList.find((item2) => item2.name === itemsInCart[item])
    if (item2) {
      price += item2.price
    }
  }

  useEffect(() => {
    if (!hasLoaded.current) {
      const items = sessionStorage.getItem('items')
      if (items) {
        const itemsArray: string[] = JSON.parse(items)
        setItemsInCart(itemsArray)
      }
      hasLoaded.current = true
    }
  }, [])

  return (
    <main className={inter.className}>
      {navbar()}
      {!props.open && <div className="container">
        <div className='alert alert-danger'>
          <h1>Sorry, we are closed</h1>
        </div>
      </div>}
      {props.open && <div className="container">
        <div className='row'>
          <div className='col'>
            <h1>URBAN GROCERY STORE</h1>
          </div>
          {/* add to right side a shopping cart icon */}
          <div className='col'>
            <a href="/cart">Cart - {itemsInCart.length} - ${price}</a>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <input type="text" className='form-control' placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className='col'>
            <select className='form-control' value={category} onChange={(e) => setCategory(e.target.value)}>
              {
                categories.map((category, index) => {
                  return (
                    <option value={category} key={index}>{category}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        {
          itemList.map((item, index) => {
            const addToCart = () => {
              // add to array 'items' in sessionStorage
              const items = sessionStorage.getItem('items')
              if (items) {
                // if items already exists in session storage
                const itemsArray: string[] = JSON.parse(items)
                itemsArray.push(item.name)
                sessionStorage.setItem('items', JSON.stringify(itemsArray))
                setItemsInCart(itemsArray)
              }
              else {
                // if items doesn't exist in session storage
                const itemsArray: string[] = []
                itemsArray.push(item.name)
                sessionStorage.setItem('items', JSON.stringify(itemsArray))
                setItemsInCart(itemsArray)
              }

            }

            if (item.name.toLowerCase().includes(searchTerm.toLowerCase()) && (category === 'All' || category === item.category))
              return (
                <div className="row" key={index}>
                  <div className="col-6">
                    <p>{item.name}</p>
                  </div>
                  <div className='col-3'>
                    <span>${item.price}</span>
                  </div>
                  <div className="col-3">
                    {/* button to add to cart */}
                    <button
                      className="btn btn-success"
                      onClick={addToCart}
                    >Add to cart</button>
                  </div>
                </div>
              )
          })
        }
      </div>}
    </main>
  )
}
