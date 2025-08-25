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
  documents: ['shopify/utils/query/**/*.ts'],
  generates: {
    'shopify/types/graphql.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        dedupeOperationSuffix: true,
        omitOperationSuffix: false,
        exportFragmentSpreadSubTypes: true,
        onlyOperationTypes: true,
        scalars: {
          DateTime: 'string',
          Decimal: 'string',
          HTML: 'string',
          JSON: 'any',
          Money: 'string',
          URL: 'string',
        },
        enumsAsTypes: true,
        skipTypename: true,
        pureMagicComment: true,
      },
    },
  },
  ignoreNoDocuments: true,
}

export default config
