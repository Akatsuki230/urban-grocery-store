import { navbar } from "@/components/navbar";

export default function SuccessfullOrder() {
    return (
        <main>
            {navbar()}
            <div className="container">
                <h1>Order sent!</h1>
                <p>Your order has been sent to the store. You will retreive your order in the store now.</p>
                <a href="/" className="btn btn-primary">Go back to shop</a>
            </div>
        </main>
    )
}