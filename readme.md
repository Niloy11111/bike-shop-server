### rm -rf .git

### rm -rf .vercel

# Bike Store

#### Live Deployment Link

[https://bike-store-a2.vercel.app/](https://bike-store-a2.vercel.app/)

## Features

### 1. Create a Bike

Users can create a bike by providing the bike's name, brand, category, description, quantity, and stock status in the request body.

**Endpoint**: `/api/products`

### 2. Get All Bikes

Users can retrieve the list of all bikes.

**Endpoint**: `/api/products`

### 3. Get a Specific Bike

Users can retrieve details of a specific bike by providing the `productId`, which is the `_id` of the bike in the database.

**Endpoint**: `/api/products/:productId`

### 4. Update a Bike

Users can update an existing bike by providing a valid JSON payload in the request body. The `productId` refers to the `_id` of the bike document in the database.

**Endpoint**: `/api/products/:productId`

### 5. Delete a Bike

Users can delete a bike by providing the `productId`, which is the `_id` of the bike in the database.

**Endpoint**: `/api/products/:productId`

### 6. Order a Bike

Users can place an order for a bike by providing a valid JSON payload in the request body.

**Endpoint**: `/api/orders`

### 7. Calculate Revenue from Orders

This endpoint returns the total revenue, which is the sum of the `totalPrice` from all orders.

**Endpoint**: `/api/orders/revenue`

## Setup Instructions

### 1. Installation and Environment Setup

1. Add the following variables in your `.env` file:

   - `PORT`: The port number you want to run the application on.
   - `DATABASE_URL`: The MongoDB URI.

### 2. Install Dependencies

Run the following command to install the required npm dependencies:

```
npm install
```

### 3. Run the Project

Start the development server with the following command:

#### run project

```
npm run start:dev
```

#### Live Deployment Link

[https://bike-store-a2.vercel.app/](https://bike-store-a2.vercel.app/)
