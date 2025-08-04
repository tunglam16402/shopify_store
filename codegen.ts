// // codegen.ts
// import type { CodegenConfig } from '@graphql-codegen/cli'
// import 'dotenv/config'
// import dotenv from 'dotenv'
// dotenv.config({ path: '.env.local' })

// export const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
// export const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!

// const config: CodegenConfig = {
//   schema: {
//     [`https://${SHOPIFY_DOMAIN}/api/2025-07/graphql.json`]: {
//       headers: {
//         'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
//         'Content-Type': 'application/json',
//       },
//     },
//   },
//   documents: ['graphql/**/*.ts'],
//   generates: {
//     'types/shopify/': {
//       preset: 'client',
//       plugins: ['typescript', 'typescript-operations'],
//       presetConfig: {
//         gqlImport: 'graphql-request#graphql',
//       },
//     },
//   },
//   ignoreNoDocuments: true,
// }

// export default config

// codegen.ts
import type { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

export const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
export const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!

const config: CodegenConfig = {
  schema: {
    [`https://${SHOPIFY_DOMAIN}/api/2025-01/graphql.json`]: {
      headers: {
        'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
        'Content-Type': 'application/json',
      },
    },
  },
  documents: ['graphql/**/*.ts'], // Đổi từ .ts sang .graphql
  generates: {
    'types/shopify/graphql.ts': {
      // Chỉ định file cụ thể thay vì folder
      plugins: ['typescript', 'typescript-operations'],
      config: {
        // Tối ưu hóa để giảm duplicate
        dedupeOperationSuffix: true,
        omitOperationSuffix: false,
        exportFragmentSpreadSubTypes: true,
        // Chỉ generate những type cần thiết
        onlyOperationTypes: true,
        // Tránh generate scalar types không cần thiết
        scalars: {
          DateTime: 'string',
          Decimal: 'string',
          HTML: 'string',
          JSON: 'any',
          Money: 'string',
          URL: 'string',
        },
        // Tối ưu enum
        enumsAsTypes: true,
        // Giảm thiểu type definitions
        skipTypename: true,
        // Chỉ export những type được sử dụng
        pureMagicComment: true,
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
