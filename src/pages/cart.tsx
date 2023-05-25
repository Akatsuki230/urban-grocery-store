import { navbar } from "@/components/navbar"
import { useEffect, useRef, useState } from "react"
import { itemList } from "@/components/itemList"

export default function Cart() {
    const [itemsInCart, setItemsInCart] = useState<string[]>([])
    const hasLoaded = useRef(false)

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
        <main>
            {navbar()}
            <div className="container">
                <button className="btn btn-primary" onClick={() => {
                    window.location.href = '/'
                }}>Back</button>
                <h1>Cart - {itemsInCart.length} - ${price}</h1>
                <div className="row">
                    <div className="col">
                        {
                            itemsInCart.map((item, index) => {
                                const removeItem = () => {
                                    // remove item at index
                                    const newItems = [...itemsInCart]
                                    newItems.splice(index, 1)
                                    setItemsInCart(newItems)
                                    sessionStorage.setItem('items', JSON.stringify(newItems))
                                }

                                return (
                                    <div className="card" key={index}>
                                        <div className="card-body">
                                            <h5 className="card-title">{item}</h5>
                                            <a href="#" className="btn btn-primary" onClick={removeItem}>Remove</a>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* green button on the right side saying order */}
                <br />
                <div className="row">
                    <div className="col">
                        <button className="btn btn-success" onClick={() => {
                            window.location.href = '/order'
                        }}>Order</button>
                    </div>
                </div>
            </div>
        </main>
    )
}