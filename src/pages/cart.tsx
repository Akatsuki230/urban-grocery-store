import { navbar } from "@/components/navbar"
import { useEffect, useRef, useState } from "react"
import { itemList } from "@/components/itemList"

export default function Cart() {
    const [itemsInCart, setItemsInCart] = useState<string[]>([])
    const hasLoaded = useRef(false)

    let itemsGrouped: { [key: string]: number } = {}
    for (let item in itemsInCart) {
        const item2 = itemList.find((item2) => item2.name === itemsInCart[item])
        if (item2) {
            itemsGrouped[item2.name] = (itemsGrouped[item2.name] || 0) + 1
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
        <main>
            {navbar()}
            <div className="container">
                <button className="btn btn-primary" onClick={() => {
                    window.location.href = '/'
                }}>Back</button>
                <h1>Cart - {itemsInCart.length} - ${price}</h1>
                <ul className="list-group">
                    {Object.entries(itemsGrouped).map(([item, count], index) => {
                        const editCount = (newCount: number) => {
                            const newItemsInCart = [...itemsInCart]
                            for (let i = 0; i < newCount - count; i++) {
                                newItemsInCart.push(item)
                            }
                            for (let i = 0; i < count - newCount; i++) {
                                const index = newItemsInCart.lastIndexOf(item)
                                newItemsInCart.splice(index, 1)
                            }
                            setItemsInCart(newItemsInCart)
                            sessionStorage.setItem('items', JSON.stringify(newItemsInCart))
                        }

                        return (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                <span>{item}</span>
                                <div className="d-flex align-items-center">
                                    <span className="badge bg-primary rounded-pill">{count}</span>
                                    &nbsp;&nbsp;&nbsp;
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => {
                                            editCount(count + 1)
                                        }}>+</button>
                                        <button className="btn btn-primary" onClick={() => {
                                            editCount(count - 1)
                                        }}>-</button>
                                        {/* button for removal */}
                                        <button className="btn btn-danger" onClick={() => {
                                            editCount(0)
                                        }}>X</button>
                                    </div>
                                    {/* some space */}
                                </div>
                            </li>
                        )
                    })}
                </ul>
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

