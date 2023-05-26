import { navbar } from "@/components/navbar";

export default function SuccessfullOrder() {
    return (
        <main>
            {navbar()}
            <div className="container">
                <h1>Order sent!</h1>
                <p>Your order has been sent to the store. You will retreive your order in the store now.</p>
                {/* add a reminder to +rep the owners and the shop on the Discord servers */}
                <div className="alert alert-info" role="alert">
                    <h3>Make sure to +rep mldkyt and TanZan on the UrbanRP Discord server for their amazing work!</h3>
                    {/* heart */}
                    <p style={{color: 'red'}}>We love you &hearts;</p>
                    <hr />
                    <p>You can also subscribe to our YouTube channels:</p>
                    <div className="btn-group" role="group" aria-label="YouTube channels">
                        <a href="https://www.youtube.com/channel/UC7JMha1kjOS7gsJXwNtosNw" className="btn btn-primary">mldkyt</a>
                        <a href="https://www.youtube.com/@tanzanovodoupe1875" className="btn btn-primary">TanZan</a>
                    </div>
                </div>
                <a href="/" className="btn btn-primary">Go back to shop</a>
            </div>
        </main>
    )
}