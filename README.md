Description

This project demonstrates how to use Shopify Storefront API with Next.js to build a headless Shopify storefront.
You can fetch products, collections, and manage the cart on the frontend without using Shopify’s default Liquid themes.

Requirements

Node.js >= 18

Next.js >= 14

A Shopify store with Storefront API access token

Yarn or npm

Installation

Clone the repository and install dependencies:

git clone <repo-url>
npm install  # or yarn


Create a .env.local file to store your Shopify store domain and Storefront API token.

Shopify Configuration

Create a Storefront API access token in Shopify Admin:

Go to Apps → Develop apps → Create App → Storefront API

Grant permissions for reading products, collections, and customers as needed.

Save the store domain and API token in environment variables to keep them secure.

Usage

Use GraphQL queries to fetch products, collections, and cart data from Shopify Storefront API.

Combine with Next.js App Router or pages for server-side rendering (SSR) or static site generation (SSG) to optimize performance and SEO.

Handle cart functionality and checkout links entirely on the frontend for a headless experience.

Tips

Always store sensitive tokens in environment variables.

Use caching or incremental static regeneration (ISR) for better performance.

Make sure your Storefront API token has the correct permissions for the data you need.

You can integrate headless cart and checkout with Shopify’s checkout URLs or the Cart API.

References

Shopify Storefront API

Next.js Documentation

GraphQL Basics