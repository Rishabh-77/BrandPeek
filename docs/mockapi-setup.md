# MockAPI Setup Guide

## Step 1: Create MockAPI Account

1. Go to https://mockapi.io/
2. Sign up for a free account
3. Create a new project called "BrandPeek"

## Step 2: Create Brands Resource

1. In your MockAPI project, create a new resource called "brands"
2. Set the resource endpoint to `/brands`

## Step 3: Configure Brand Data Schema

Configure the following fields for your brands resource:

| Field Name      | Type   | Description           | Example                                                         |
| --------------- | ------ | --------------------- | --------------------------------------------------------------- |
| id              | String | Unique identifier     | "1"                                                             |
| name            | String | Brand name            | "Apple"                                                         |
| logo            | String | URL to brand logo     | "https://logo.clearbit.com/apple.com"                           |
| description     | String | One-liner description | "Think Different"                                               |
| fullDescription | String | Detailed description  | "Apple Inc. is an American multinational technology company..." |
| website         | String | Brand website URL     | "https://apple.com"                                             |
| category        | String | Brand category        | "Technology"                                                    |
| founded         | String | Year founded          | "1976"                                                          |
| headquarters    | String | Location              | "Cupertino, California"                                         |

## Step 4: Sample Brand Data

Use this sample data to populate your MockAPI:

### Brand 1 - Apple

```json
{
  "name": "Apple",
  "logo": "https://logo.clearbit.com/apple.com",
  "description": "Think Different",
  "fullDescription": "Apple Inc. is an American multinational technology company headquartered in Cupertino, California. Apple is the world's largest technology company by revenue and the world's most valuable company.",
  "website": "https://apple.com",
  "category": "Technology",
  "founded": "1976",
  "headquarters": "Cupertino, California"
}
```

### Brand 2 - Nike

```json
{
  "name": "Nike",
  "logo": "https://logo.clearbit.com/nike.com",
  "description": "Just Do It",
  "fullDescription": "Nike, Inc. is an American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services.",
  "website": "https://nike.com",
  "category": "Sports & Apparel",
  "founded": "1964",
  "headquarters": "Beaverton, Oregon"
}
```

### Brand 3 - Tesla

```json
{
  "name": "Tesla",
  "logo": "https://logo.clearbit.com/tesla.com",
  "description": "Accelerating the world's transition to sustainable energy",
  "fullDescription": "Tesla, Inc. is an American electric vehicle and clean energy company based in Austin, Texas. Tesla designs and manufactures electric cars, battery energy storage from home to grid-scale, solar panels and solar roof tiles, and related products and services.",
  "website": "https://tesla.com",
  "category": "Automotive",
  "founded": "2003",
  "headquarters": "Austin, Texas"
}
```

### Brand 4 - Spotify

```json
{
  "name": "Spotify",
  "logo": "https://logo.clearbit.com/spotify.com",
  "description": "Music for everyone",
  "fullDescription": "Spotify is a Swedish audio streaming and media services provider founded in 2006. It is one of the largest music streaming service providers, with over 456 million monthly active users, including 195 million paying subscribers.",
  "website": "https://spotify.com",
  "category": "Entertainment",
  "founded": "2006",
  "headquarters": "Stockholm, Sweden"
}
```

### Brand 5 - Airbnb

```json
{
  "name": "Airbnb",
  "logo": "https://logo.clearbit.com/airbnb.com",
  "description": "Belong anywhere",
  "fullDescription": "Airbnb, Inc. is an American San Francisco-based company operating an online marketplace for short- and long-term homestays and experiences. The company acts as a broker and charges a commission from each booking.",
  "website": "https://airbnb.com",
  "category": "Travel",
  "founded": "2008",
  "headquarters": "San Francisco, California"
}
```

### Brand 6 - Netflix

```json
{
  "name": "Netflix",
  "logo": "https://logo.clearbit.com/netflix.com",
  "description": "See what's next",
  "fullDescription": "Netflix, Inc. is an American subscription streaming service and production company based in Los Gatos, California. It offers a library of films and television series through distribution deals as well as its own productions, known as Netflix Originals.",
  "website": "https://netflix.com",
  "category": "Entertainment",
  "founded": "1997",
  "headquarters": "Los Gatos, California"
}
```

### Brand 7 - Uber

```json
{
  "name": "Uber",
  "logo": "https://logo.clearbit.com/uber.com",
  "description": "Move the way you want",
  "fullDescription": "Uber Technologies, Inc. is an American mobility as a service provider based in San Francisco, California. The company develops, markets and operates the Uber mobile app, which allows consumers to submit a trip request.",
  "website": "https://uber.com",
  "category": "Transportation",
  "founded": "2009",
  "headquarters": "San Francisco, California"
}
```

### Brand 8 - Amazon

```json
{
  "name": "Amazon",
  "logo": "https://logo.clearbit.com/amazon.com",
  "description": "Earth's Most Customer-Centric Company",
  "fullDescription": "Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, online advertising, digital streaming, and artificial intelligence.",
  "website": "https://amazon.com",
  "category": "E-commerce",
  "founded": "1994",
  "headquarters": "Seattle, Washington"
}
```

### Brand 9 - Google

```json
{
  "name": "Google",
  "logo": "https://logo.clearbit.com/google.com",
  "description": "Don't be evil",
  "fullDescription": "Google LLC is an American multinational technology company focusing on search engine technology, online advertising, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence, and consumer electronics.",
  "website": "https://google.com",
  "category": "Technology",
  "founded": "1998",
  "headquarters": "Mountain View, California"
}
```

### Brand 10 - Microsoft

```json
{
  "name": "Microsoft",
  "logo": "https://logo.clearbit.com/microsoft.com",
  "description": "Empower every person and organization on the planet to achieve more",
  "fullDescription": "Microsoft Corporation is an American multinational technology corporation producing computer software, consumer electronics, personal computers, and related services.",
  "website": "https://microsoft.com",
  "category": "Technology",
  "founded": "1975",
  "headquarters": "Redmond, Washington"
}
```

## Step 5: Update API Configuration

After creating your MockAPI project, update the `BASE_URL` in `BrandPeek/constants/api.js` with your MockAPI project URL.

Your MockAPI URL will look like: `https://[your-project-id].mockapi.io/api/v1`

## Step 6: Test Your API

You can test your API endpoints:

- GET all brands: `https://[your-project-id].mockapi.io/api/v1/brands`
- GET specific brand: `https://[your-project-id].mockapi.io/api/v1/brands/1`

## Expected Response Format

### GET /brands

```json
[
  {
    "id": "1",
    "name": "Apple",
    "logo": "https://logo.clearbit.com/apple.com",
    "description": "Think Different",
    "fullDescription": "Apple Inc. is an American multinational technology company...",
    "website": "https://apple.com",
    "category": "Technology",
    "founded": "1976",
    "headquarters": "Cupertino, California"
  }
]
```

### GET /brands/:id

```json
{
  "id": "1",
  "name": "Apple",
  "logo": "https://logo.clearbit.com/apple.com",
  "description": "Think Different",
  "fullDescription": "Apple Inc. is an American multinational technology company...",
  "website": "https://apple.com",
  "category": "Technology",
  "founded": "1976",
  "headquarters": "Cupertino, California"
}
```
