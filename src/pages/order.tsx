import { navbar } from "@/components/navbar"
import { useEffect, useRef, useState } from "react"
import { itemList } from "@/components/itemList"


export default function Order() {
    const [username, setUsername] = useState('')
    const [itemsInCart, setItemsInCart] = useState<string[]>([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
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
    })

    const order = async () => {
        setLoading(true)
        // check if cart and username are not empty
        if (itemsInCart.length == 0) {
            setError('Please add items to your cart!')
            return
        }
        if (username.length == 0) {
            setError('Please enter your username!')
            return
        }
        const request = await fetch('/api/order', {
            method: 'POST',
            body: JSON.stringify({
                username,
                items: itemsInCart
            }) 
        })
        const response = await request.json()
        if (response.message && response.message == 'Order sent!') {
            sessionStorage.clear()
            window.location.href = '/success'
        }
    }

    return(
        <main>
            {navbar()}
            <div className="container">
                <h1>Ordering {itemsInCart.length} item{itemsInCart.length == 1 ? '' : 's'} for {price}</h1>
                {/* ask for username */}
                <p>Please enter your in-game username so that we can identify you when you go pick up the order: </p>
                <input type="text" className="form-control" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                {/* green button on the right side saying order */}
                <br />
                <h2>Items in cart</h2>
                <ul className="list-group">
                    {
                        itemsInCart.map((item, index) => {
                            return (
                                <li className="list-group-item" key={index}>
                                    <div className="row">
                                        <div className="col">
                                            {item}
                                        </div>
                                        <div className="col">
                                            {/* price */}
                                            ${itemList.find((i) => i.name == item)?.price }
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <br />
                <button className="btn btn-success" onClick={order} disabled={loading}>
                    {
                        loading ? 
                            <div className="spinner-border" role="status" />
                        : 'Make the order'
                    }
                </button>
                {/* use an alert for the error */}
                <br />
                <br />
                {
                    error && <div className="alert alert-danger" role="alert">{error}</div>
                }
            </div>
        </main>
    )
}