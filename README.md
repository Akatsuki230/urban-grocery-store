# urban-grocery-store
This is the ordering system for the Urban Grocery Store. It is a web application that allows customers to order groceries from the store. The application is built using the Next.js framework and is deployed on Vercel. The application is available at https://urban-alcohol-store.vercel.app/ and https://ugs.mldkyt.com/.

## Features
- Customers can order groceries from the store.
- Customers can view their cart and checkout.
- Sends into a Discord channel when an order is placed.

## Installation
1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env.local` file and add the following environment variables:
```
DISCORD_WEBHOOK_URL=
```
4. If you haven't done so, create a Vercel account.
5. Create a key-value database on Vercel and connect it to the application.
6. Build the application using `npm run build`.
7. Start the application using `npm run start`.
8. Navigate to `http://localhost/` to view the application.
