export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Color: { input: any; output: any; }
  DateTime: { input: string; output: string; }
  Decimal: { input: string; output: string; }
  HTML: { input: string; output: string; }
  ISO8601DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
  URL: { input: string; output: string; }
  UnsignedInt64: { input: any; output: any; }
};

/**
 * The input fields for submitting Apple Pay payment method information for checkout.
 *
 */
export type ApplePayWalletContentInput = {
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
  /** The data for the Apple Pay wallet. */
  data: Scalars['String']['input'];
  /** The header data for the Apple Pay wallet. */
  header: ApplePayWalletHeaderInput;
  /** The last digits of the card used to create the payment. */
  lastDigits?: InputMaybe<Scalars['String']['input']>;
  /** The signature for the Apple Pay wallet. */
  signature: Scalars['String']['input'];
  /** The version for the Apple Pay wallet. */
  version: Scalars['String']['input'];
};

/**
 * The input fields for submitting wallet payment method information for checkout.
 *
 */
export type ApplePayWalletHeaderInput = {
  /** The application data for the Apple Pay wallet. */
  applicationData?: InputMaybe<Scalars['String']['input']>;
  /** The ephemeral public key for the Apple Pay wallet. */
  ephemeralPublicKey: Scalars['String']['input'];
  /** The public key hash for the Apple Pay wallet. */
  publicKeyHash: Scalars['String']['input'];
  /** The transaction ID for the Apple Pay wallet. */
  transactionId: Scalars['String']['input'];
};

/** The set of valid sort keys for the Article query. */
export type ArticleSortKeys =
  /** Sort by the `author` value. */
  | 'AUTHOR'
  /** Sort by the `blog_title` value. */
  | 'BLOG_TITLE'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `published_at` value. */
  | 'PUBLISHED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The input fields for an attribute. */
export type AttributeInput = {
  /** Key or name of the attribute. */
  key: Scalars['String']['input'];
  /** Value of the attribute. */
  value: Scalars['String']['input'];
};

/** The set of valid sort keys for the Blog query. */
export type BlogSortKeys =
  /** Sort by the `handle` value. */
  | 'HANDLE'
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE';

/**
 * The input fields for obtaining the buyer's identity.
 *
 */
export type BuyerInput = {
  /** The identifier of the company location. */
  companyLocationId?: InputMaybe<Scalars['ID']['input']>;
  /** The customer access token retrieved from the [Customer Accounts API](https://shopify.dev/docs/api/customer#step-obtain-access-token). */
  customerAccessToken: Scalars['String']['input'];
};

/** Card brand, such as Visa or Mastercard, which can be used for payments. */
export type CardBrand =
  /** American Express. */
  | 'AMERICAN_EXPRESS'
  /** Diners Club. */
  | 'DINERS_CLUB'
  /** Discover. */
  | 'DISCOVER'
  /** JCB. */
  | 'JCB'
  /** Mastercard. */
  | 'MASTERCARD'
  /** Visa. */
  | 'VISA';

/** The input fields to provide exactly one of a variety of delivery address types. */
export type CartAddressInput = {
  /** Copies details from the customer address to an address on this cart. */
  copyFromCustomerAddressId?: InputMaybe<Scalars['ID']['input']>;
  /** A delivery address stored on this cart. */
  deliveryAddress?: InputMaybe<CartDeliveryAddressInput>;
};

/**
 * Specifies the input fields to update the buyer information associated with a cart.
 * Buyer identity is used to determine
 * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * and should match the customer's shipping address.
 *
 */
export type CartBuyerIdentityInput = {
  /** The company location of the buyer that is interacting with the cart. */
  companyLocationId?: InputMaybe<Scalars['ID']['input']>;
  /** The country where the buyer is located. */
  countryCode?: InputMaybe<CountryCode>;
  /** The access token used to identify the customer associated with the cart. */
  customerAccessToken?: InputMaybe<Scalars['String']['input']>;
  /** The email address of the buyer that is interacting with the cart. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The phone number of the buyer that is interacting with the cart. */
  phone?: InputMaybe<Scalars['String']['input']>;
  /**
   * A set of preferences tied to the buyer interacting with the cart. Preferences are used to prefill fields in at checkout to streamline information collection.
   * Preferences are not synced back to the cart if they are overwritten.
   *
   */
  preferences?: InputMaybe<CartPreferencesInput>;
};

/**
 * Represents how credit card details are provided for a direct payment.
 *
 */
export type CartCardSource =
  /**
   * The credit card was provided by a third party and vaulted on their system.
   * Using this value requires a separate permission from Shopify.
   *
   */
  | 'SAVED_CREDIT_CARD';

/** The input fields to create or update a cart address. */
export type CartDeliveryAddressInput = {
  /**
   * The first line of the address. Typically the street address or PO Box number.
   *
   */
  address1?: InputMaybe<Scalars['String']['input']>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2?: InputMaybe<Scalars['String']['input']>;
  /**
   * The name of the city, district, village, or town.
   *
   */
  city?: InputMaybe<Scalars['String']['input']>;
  /**
   * The name of the customer's company or organization.
   *
   */
  company?: InputMaybe<Scalars['String']['input']>;
  /** The name of the country. */
  countryCode?: InputMaybe<CountryCode>;
  /** The first name of the customer. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The last name of the customer. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** The region of the address, such as the province, state, or district. */
  provinceCode?: InputMaybe<Scalars['String']['input']>;
  /** The zip or postal code of the address. */
  zip?: InputMaybe<Scalars['String']['input']>;
};

/** Preferred location used to find the closest pick up point based on coordinates. */
export type CartDeliveryCoordinatesPreferenceInput = {
  /**
   * The two-letter code for the country of the preferred location.
   *
   * For example, US.
   *
   */
  countryCode: CountryCode;
  /** The geographic latitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  latitude: Scalars['Float']['input'];
  /** The geographic longitude for a given location. Coordinates are required in order to set pickUpHandle for pickup points. */
  longitude: Scalars['Float']['input'];
};

/**
 * Defines what type of merchandise is in the delivery group.
 *
 */
export type CartDeliveryGroupType =
  /**
   * The delivery group only contains merchandise that is either a one time purchase or a first delivery of
   * subscription merchandise.
   *
   */
  | 'ONE_TIME_PURCHASE'
  /** The delivery group only contains subscription merchandise. */
  | 'SUBSCRIPTION';

/** The input fields for the cart's delivery properties. */
export type CartDeliveryInput = {
  /**
   * Selectable addresses to present to the buyer on the cart.
   *
   * The input must not contain more than `250` values.
   */
  addresses?: InputMaybe<Array<CartSelectableAddressInput>>;
};

/** Delivery preferences can be used to prefill the delivery section at checkout. */
export type CartDeliveryPreferenceInput = {
  /** The coordinates of a delivery location in order of preference. */
  coordinates?: InputMaybe<CartDeliveryCoordinatesPreferenceInput>;
  /**
   * The preferred delivery methods such as shipping, local pickup or through pickup points.
   *
   * The input must not contain more than `250` values.
   */
  deliveryMethod?: InputMaybe<Array<PreferenceDeliveryMethodType>>;
  /**
   * The pickup handle prefills checkout fields with the location for either local pickup or pickup points delivery methods.
   * It accepts both location ID for local pickup and external IDs for pickup points.
   *
   * The input must not contain more than `250` values.
   */
  pickupHandle?: InputMaybe<Array<Scalars['String']['input']>>;
};

/**
 * The input fields for submitting direct payment method information for checkout.
 *
 */
export type CartDirectPaymentMethodInput = {
  /** Indicates if the customer has accepted the subscription terms. Defaults to false. */
  acceptedSubscriptionTerms?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
  /** The source of the credit card payment. */
  cardSource?: InputMaybe<CartCardSource>;
  /** The session ID for the direct payment method used to create the payment. */
  sessionId: Scalars['String']['input'];
};

/** Possible error codes that can be returned by `CartUserError`. */
export type CartErrorCode =
  /** The specified address field contains emojis. */
  | 'ADDRESS_FIELD_CONTAINS_EMOJIS'
  /** The specified address field contains HTML tags. */
  | 'ADDRESS_FIELD_CONTAINS_HTML_TAGS'
  /** The specified address field contains a URL. */
  | 'ADDRESS_FIELD_CONTAINS_URL'
  /** The specified address field does not match the expected pattern. */
  | 'ADDRESS_FIELD_DOES_NOT_MATCH_EXPECTED_PATTERN'
  /** The specified address field is required. */
  | 'ADDRESS_FIELD_IS_REQUIRED'
  /** The specified address field is too long. */
  | 'ADDRESS_FIELD_IS_TOO_LONG'
  /** The input value is invalid. */
  | 'INVALID'
  /** Company location not found or not allowed. */
  | 'INVALID_COMPANY_LOCATION'
  /** The delivery address was not found. */
  | 'INVALID_DELIVERY_ADDRESS_ID'
  /** Delivery group was not found in cart. */
  | 'INVALID_DELIVERY_GROUP'
  /** Delivery option was not valid. */
  | 'INVALID_DELIVERY_OPTION'
  /** The quantity must be a multiple of the specified increment. */
  | 'INVALID_INCREMENT'
  /** Merchandise line was not found in cart. */
  | 'INVALID_MERCHANDISE_LINE'
  /** The metafields were not valid. */
  | 'INVALID_METAFIELDS'
  /** The payment wasn't valid. */
  | 'INVALID_PAYMENT'
  /** Cannot update payment on an empty cart */
  | 'INVALID_PAYMENT_EMPTY_CART'
  /** The given zip code is invalid for the provided country. */
  | 'INVALID_ZIP_CODE_FOR_COUNTRY'
  /** The given zip code is invalid for the provided province. */
  | 'INVALID_ZIP_CODE_FOR_PROVINCE'
  /** The input value should be less than the maximum value allowed. */
  | 'LESS_THAN'
  /** The quantity must be below the specified maximum for the item. */
  | 'MAXIMUM_EXCEEDED'
  /** The quantity must be above the specified minimum for the item. */
  | 'MINIMUM_NOT_MET'
  /** The customer access token is required when setting a company location. */
  | 'MISSING_CUSTOMER_ACCESS_TOKEN'
  /** Missing discount code. */
  | 'MISSING_DISCOUNT_CODE'
  /** Missing note. */
  | 'MISSING_NOTE'
  /** The note length must be below the specified maximum. */
  | 'NOTE_TOO_LONG'
  /** Only one delivery address can be selected. */
  | 'ONLY_ONE_DELIVERY_ADDRESS_CAN_BE_SELECTED'
  /** The payment method is not supported. */
  | 'PAYMENT_METHOD_NOT_SUPPORTED'
  /** The given province cannot be found. */
  | 'PROVINCE_NOT_FOUND'
  /** Too many delivery addresses on Cart. */
  | 'TOO_MANY_DELIVERY_ADDRESSES'
  /** A general error occurred during address validation. */
  | 'UNSPECIFIED_ADDRESS_ERROR'
  /** Validation failed. */
  | 'VALIDATION_CUSTOM'
  /** The given zip code is unsupported. */
  | 'ZIP_CODE_NOT_SUPPORTED';

/**
 * The input fields for submitting a billing address without a selected payment method.
 *
 */
export type CartFreePaymentMethodInput = {
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
};

/** The input fields to create a cart. */
export type CartInput = {
  /**
   * An array of key-value pairs that contains additional information about the cart.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: InputMaybe<Array<AttributeInput>>;
  /**
   * The customer associated with the cart. Used to determine [international pricing]
   * (https://shopify.dev/custom-storefronts/internationalization/international-pricing).
   * Buyer identity should match the customer's shipping address.
   *
   */
  buyerIdentity?: InputMaybe<CartBuyerIdentityInput>;
  /** The delivery-related fields for the cart. */
  delivery?: InputMaybe<CartDeliveryInput>;
  /**
   * The case-insensitive discount codes that the customer added at checkout.
   *
   * The input must not contain more than `250` values.
   */
  discountCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * The case-insensitive gift card codes.
   *
   * The input must not contain more than `250` values.
   */
  giftCardCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * A list of merchandise lines to add to the cart.
   *
   * The input must not contain more than `250` values.
   */
  lines?: InputMaybe<Array<CartLineInput>>;
  /**
   * The metafields to associate with this cart.
   *
   * The input must not contain more than `250` values.
   */
  metafields?: InputMaybe<Array<CartInputMetafieldInput>>;
  /**
   * A note that's associated with the cart. For example, the note can be a personalized message to the buyer.
   *
   */
  note?: InputMaybe<Scalars['String']['input']>;
};

/** The input fields for a cart metafield value to set. */
export type CartInputMetafieldInput = {
  /** The key name of the metafield. */
  key: Scalars['String']['input'];
  /**
   * The type of data that the cart metafield stores.
   * The type of data must be a [supported type](https://shopify.dev/apps/metafields/types).
   *
   */
  type: Scalars['String']['input'];
  /**
   * The data to store in the cart metafield. The data is always stored as a string, regardless of the metafield's type.
   *
   */
  value: Scalars['String']['input'];
};

/** The input fields to create a merchandise line on a cart. */
export type CartLineInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: InputMaybe<Array<AttributeInput>>;
  /** The ID of the merchandise that the buyer intends to purchase. */
  merchandiseId: Scalars['ID']['input'];
  /** The quantity of the merchandise. */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: InputMaybe<Scalars['ID']['input']>;
};

/** The input fields to update a line item on a cart. */
export type CartLineUpdateInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: InputMaybe<Array<AttributeInput>>;
  /** The ID of the merchandise line. */
  id: Scalars['ID']['input'];
  /** The ID of the merchandise for the line item. */
  merchandiseId?: InputMaybe<Scalars['ID']['input']>;
  /** The quantity of the line item. */
  quantity?: InputMaybe<Scalars['Int']['input']>;
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: InputMaybe<Scalars['ID']['input']>;
};

/** The input fields to delete a cart metafield. */
export type CartMetafieldDeleteInput = {
  /**
   * The key name of the cart metafield. Can either be a composite key (`namespace.key`) or a simple key
   *  that relies on the default app-reserved namespace.
   *
   */
  key: Scalars['String']['input'];
  /** The ID of the cart resource. */
  ownerId: Scalars['ID']['input'];
};

/** The input fields for a cart metafield value to set. */
export type CartMetafieldsSetInput = {
  /** The key name of the cart metafield. */
  key: Scalars['String']['input'];
  /** The ID of the cart resource. */
  ownerId: Scalars['ID']['input'];
  /**
   * The type of data that the cart metafield stores.
   * The type of data must be a [supported type](https://shopify.dev/apps/metafields/types).
   *
   */
  type: Scalars['String']['input'];
  /**
   * The data to store in the cart metafield. The data is always stored as a string, regardless of the metafield's type.
   *
   */
  value: Scalars['String']['input'];
};

/**
 * The input fields for updating the payment method that will be used to checkout.
 *
 */
export type CartPaymentInput = {
  /** The amount that the customer will be charged at checkout. */
  amount: MoneyInput;
  /**
   * The input fields to use when checking out a cart with a direct payment method (like a credit card).
   *
   */
  directPaymentMethod?: InputMaybe<CartDirectPaymentMethodInput>;
  /**
   * The input fields to use to checkout a cart without providing a payment method.
   * Use this payment method input if the total cost of the cart is 0.
   *
   */
  freePaymentMethod?: InputMaybe<CartFreePaymentMethodInput>;
  /**
   * An ID of the order placed on the originating platform.
   * Note that this value doesn't correspond to the Shopify Order ID.
   *
   */
  sourceIdentifier?: InputMaybe<Scalars['String']['input']>;
  /**
   * The input fields to use when checking out a cart with a wallet payment method (like Shop Pay or Apple Pay).
   *
   */
  walletPaymentMethod?: InputMaybe<CartWalletPaymentMethodInput>;
};

/** The input fields represent preferences for the buyer that is interacting with the cart. */
export type CartPreferencesInput = {
  /** Delivery preferences can be used to prefill the delivery section in at checkout. */
  delivery?: InputMaybe<CartDeliveryPreferenceInput>;
  /**
   * Wallet preferences are used to populate relevant payment fields in the checkout flow.
   * Accepted value: `["shop_pay"]`.
   *
   * The input must not contain more than `250` values.
   */
  wallet?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** The input fields for a selectable delivery address in a cart. */
export type CartSelectableAddressInput = {
  /** Exactly one kind of delivery address. */
  address: CartAddressInput;
  /** When true, this delivery address will not be associated with the buyer after a successful checkout. */
  oneTimeUse?: InputMaybe<Scalars['Boolean']['input']>;
  /** Sets exactly one address as pre-selected for the buyer. */
  selected?: InputMaybe<Scalars['Boolean']['input']>;
  /** Defines what kind of address validation is requested. */
  validationStrategy?: InputMaybe<DeliveryAddressValidationStrategy>;
};

/** The input fields to update a line item on a cart. */
export type CartSelectableAddressUpdateInput = {
  /** Exactly one kind of delivery address. */
  address?: InputMaybe<CartAddressInput>;
  /** The id of the selectable address. */
  id: Scalars['ID']['input'];
  /** When true, this delivery address will not be associated with the buyer after a successful checkout. */
  oneTimeUse?: InputMaybe<Scalars['Boolean']['input']>;
  /** Sets exactly one address as pre-selected for the buyer. */
  selected?: InputMaybe<Scalars['Boolean']['input']>;
  /** Defines what kind of address validation is requested. */
  validationStrategy?: InputMaybe<DeliveryAddressValidationStrategy>;
};

/**
 * The input fields for updating the selected delivery options for a delivery group.
 *
 */
export type CartSelectedDeliveryOptionInput = {
  /** The ID of the cart delivery group. */
  deliveryGroupId: Scalars['ID']['input'];
  /** The handle of the selected delivery option. */
  deliveryOptionHandle: Scalars['String']['input'];
};

/**
 * The input fields for submitting wallet payment method information for checkout.
 *
 */
export type CartWalletPaymentMethodInput = {
  /** The payment method information for the Apple Pay wallet. */
  applePayWalletContent?: InputMaybe<ApplePayWalletContentInput>;
  /** The payment method information for the Shop Pay wallet. */
  shopPayWalletContent?: InputMaybe<ShopPayWalletContentInput>;
};

/** The code for the cart warning. */
export type CartWarningCode =
  /** A delivery address with the same details already exists on this cart. */
  | 'DUPLICATE_DELIVERY_ADDRESS'
  /** The merchandise does not have enough stock. */
  | 'MERCHANDISE_NOT_ENOUGH_STOCK'
  /** The merchandise is out of stock. */
  | 'MERCHANDISE_OUT_OF_STOCK'
  /** Gift cards are not available as a payment method. */
  | 'PAYMENTS_GIFT_CARDS_UNAVAILABLE';

/**
 * A filter used to view a subset of products in a collection matching a specific category value.
 *
 */
export type CategoryFilter = {
  /** The id of the category to filter on. */
  id: Scalars['String']['input'];
};

/** The set of valid sort keys for the Collection query. */
export type CollectionSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** The code of the error that occurred during a cart completion attempt. */
export type CompletionErrorCode =
  | 'ERROR'
  | 'INVENTORY_RESERVATION_ERROR'
  | 'PAYMENT_AMOUNT_TOO_SMALL'
  | 'PAYMENT_CALL_ISSUER'
  | 'PAYMENT_CARD_DECLINED'
  | 'PAYMENT_ERROR'
  | 'PAYMENT_GATEWAY_NOT_ENABLED_ERROR'
  | 'PAYMENT_INSUFFICIENT_FUNDS'
  | 'PAYMENT_INVALID_BILLING_ADDRESS'
  | 'PAYMENT_INVALID_CREDIT_CARD'
  | 'PAYMENT_INVALID_CURRENCY'
  | 'PAYMENT_INVALID_PAYMENT_METHOD'
  | 'PAYMENT_TRANSIENT_ERROR';

/** The precision of the value returned by a count field. */
export type CountPrecision =
  /** The count is at least the value. A limit was reached. */
  | 'AT_LEAST'
  /** The count is exactly the value. */
  | 'EXACT';

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
 *
 */
export type CountryCode =
  /** Ascension Island. */
  | 'AC'
  /** Andorra. */
  | 'AD'
  /** United Arab Emirates. */
  | 'AE'
  /** Afghanistan. */
  | 'AF'
  /** Antigua & Barbuda. */
  | 'AG'
  /** Anguilla. */
  | 'AI'
  /** Albania. */
  | 'AL'
  /** Armenia. */
  | 'AM'
  /** Netherlands Antilles. */
  | 'AN'
  /** Angola. */
  | 'AO'
  /** Argentina. */
  | 'AR'
  /** Austria. */
  | 'AT'
  /** Australia. */
  | 'AU'
  /** Aruba. */
  | 'AW'
  /** Åland Islands. */
  | 'AX'
  /** Azerbaijan. */
  | 'AZ'
  /** Bosnia & Herzegovina. */
  | 'BA'
  /** Barbados. */
  | 'BB'
  /** Bangladesh. */
  | 'BD'
  /** Belgium. */
  | 'BE'
  /** Burkina Faso. */
  | 'BF'
  /** Bulgaria. */
  | 'BG'
  /** Bahrain. */
  | 'BH'
  /** Burundi. */
  | 'BI'
  /** Benin. */
  | 'BJ'
  /** St. Barthélemy. */
  | 'BL'
  /** Bermuda. */
  | 'BM'
  /** Brunei. */
  | 'BN'
  /** Bolivia. */
  | 'BO'
  /** Caribbean Netherlands. */
  | 'BQ'
  /** Brazil. */
  | 'BR'
  /** Bahamas. */
  | 'BS'
  /** Bhutan. */
  | 'BT'
  /** Bouvet Island. */
  | 'BV'
  /** Botswana. */
  | 'BW'
  /** Belarus. */
  | 'BY'
  /** Belize. */
  | 'BZ'
  /** Canada. */
  | 'CA'
  /** Cocos (Keeling) Islands. */
  | 'CC'
  /** Congo - Kinshasa. */
  | 'CD'
  /** Central African Republic. */
  | 'CF'
  /** Congo - Brazzaville. */
  | 'CG'
  /** Switzerland. */
  | 'CH'
  /** Côte d’Ivoire. */
  | 'CI'
  /** Cook Islands. */
  | 'CK'
  /** Chile. */
  | 'CL'
  /** Cameroon. */
  | 'CM'
  /** China. */
  | 'CN'
  /** Colombia. */
  | 'CO'
  /** Costa Rica. */
  | 'CR'
  /** Cuba. */
  | 'CU'
  /** Cape Verde. */
  | 'CV'
  /** Curaçao. */
  | 'CW'
  /** Christmas Island. */
  | 'CX'
  /** Cyprus. */
  | 'CY'
  /** Czechia. */
  | 'CZ'
  /** Germany. */
  | 'DE'
  /** Djibouti. */
  | 'DJ'
  /** Denmark. */
  | 'DK'
  /** Dominica. */
  | 'DM'
  /** Dominican Republic. */
  | 'DO'
  /** Algeria. */
  | 'DZ'
  /** Ecuador. */
  | 'EC'
  /** Estonia. */
  | 'EE'
  /** Egypt. */
  | 'EG'
  /** Western Sahara. */
  | 'EH'
  /** Eritrea. */
  | 'ER'
  /** Spain. */
  | 'ES'
  /** Ethiopia. */
  | 'ET'
  /** Finland. */
  | 'FI'
  /** Fiji. */
  | 'FJ'
  /** Falkland Islands. */
  | 'FK'
  /** Faroe Islands. */
  | 'FO'
  /** France. */
  | 'FR'
  /** Gabon. */
  | 'GA'
  /** United Kingdom. */
  | 'GB'
  /** Grenada. */
  | 'GD'
  /** Georgia. */
  | 'GE'
  /** French Guiana. */
  | 'GF'
  /** Guernsey. */
  | 'GG'
  /** Ghana. */
  | 'GH'
  /** Gibraltar. */
  | 'GI'
  /** Greenland. */
  | 'GL'
  /** Gambia. */
  | 'GM'
  /** Guinea. */
  | 'GN'
  /** Guadeloupe. */
  | 'GP'
  /** Equatorial Guinea. */
  | 'GQ'
  /** Greece. */
  | 'GR'
  /** South Georgia & South Sandwich Islands. */
  | 'GS'
  /** Guatemala. */
  | 'GT'
  /** Guinea-Bissau. */
  | 'GW'
  /** Guyana. */
  | 'GY'
  /** Hong Kong SAR. */
  | 'HK'
  /** Heard & McDonald Islands. */
  | 'HM'
  /** Honduras. */
  | 'HN'
  /** Croatia. */
  | 'HR'
  /** Haiti. */
  | 'HT'
  /** Hungary. */
  | 'HU'
  /** Indonesia. */
  | 'ID'
  /** Ireland. */
  | 'IE'
  /** Israel. */
  | 'IL'
  /** Isle of Man. */
  | 'IM'
  /** India. */
  | 'IN'
  /** British Indian Ocean Territory. */
  | 'IO'
  /** Iraq. */
  | 'IQ'
  /** Iran. */
  | 'IR'
  /** Iceland. */
  | 'IS'
  /** Italy. */
  | 'IT'
  /** Jersey. */
  | 'JE'
  /** Jamaica. */
  | 'JM'
  /** Jordan. */
  | 'JO'
  /** Japan. */
  | 'JP'
  /** Kenya. */
  | 'KE'
  /** Kyrgyzstan. */
  | 'KG'
  /** Cambodia. */
  | 'KH'
  /** Kiribati. */
  | 'KI'
  /** Comoros. */
  | 'KM'
  /** St. Kitts & Nevis. */
  | 'KN'
  /** North Korea. */
  | 'KP'
  /** South Korea. */
  | 'KR'
  /** Kuwait. */
  | 'KW'
  /** Cayman Islands. */
  | 'KY'
  /** Kazakhstan. */
  | 'KZ'
  /** Laos. */
  | 'LA'
  /** Lebanon. */
  | 'LB'
  /** St. Lucia. */
  | 'LC'
  /** Liechtenstein. */
  | 'LI'
  /** Sri Lanka. */
  | 'LK'
  /** Liberia. */
  | 'LR'
  /** Lesotho. */
  | 'LS'
  /** Lithuania. */
  | 'LT'
  /** Luxembourg. */
  | 'LU'
  /** Latvia. */
  | 'LV'
  /** Libya. */
  | 'LY'
  /** Morocco. */
  | 'MA'
  /** Monaco. */
  | 'MC'
  /** Moldova. */
  | 'MD'
  /** Montenegro. */
  | 'ME'
  /** St. Martin. */
  | 'MF'
  /** Madagascar. */
  | 'MG'
  /** North Macedonia. */
  | 'MK'
  /** Mali. */
  | 'ML'
  /** Myanmar (Burma). */
  | 'MM'
  /** Mongolia. */
  | 'MN'
  /** Macao SAR. */
  | 'MO'
  /** Martinique. */
  | 'MQ'
  /** Mauritania. */
  | 'MR'
  /** Montserrat. */
  | 'MS'
  /** Malta. */
  | 'MT'
  /** Mauritius. */
  | 'MU'
  /** Maldives. */
  | 'MV'
  /** Malawi. */
  | 'MW'
  /** Mexico. */
  | 'MX'
  /** Malaysia. */
  | 'MY'
  /** Mozambique. */
  | 'MZ'
  /** Namibia. */
  | 'NA'
  /** New Caledonia. */
  | 'NC'
  /** Niger. */
  | 'NE'
  /** Norfolk Island. */
  | 'NF'
  /** Nigeria. */
  | 'NG'
  /** Nicaragua. */
  | 'NI'
  /** Netherlands. */
  | 'NL'
  /** Norway. */
  | 'NO'
  /** Nepal. */
  | 'NP'
  /** Nauru. */
  | 'NR'
  /** Niue. */
  | 'NU'
  /** New Zealand. */
  | 'NZ'
  /** Oman. */
  | 'OM'
  /** Panama. */
  | 'PA'
  /** Peru. */
  | 'PE'
  /** French Polynesia. */
  | 'PF'
  /** Papua New Guinea. */
  | 'PG'
  /** Philippines. */
  | 'PH'
  /** Pakistan. */
  | 'PK'
  /** Poland. */
  | 'PL'
  /** St. Pierre & Miquelon. */
  | 'PM'
  /** Pitcairn Islands. */
  | 'PN'
  /** Palestinian Territories. */
  | 'PS'
  /** Portugal. */
  | 'PT'
  /** Paraguay. */
  | 'PY'
  /** Qatar. */
  | 'QA'
  /** Réunion. */
  | 'RE'
  /** Romania. */
  | 'RO'
  /** Serbia. */
  | 'RS'
  /** Russia. */
  | 'RU'
  /** Rwanda. */
  | 'RW'
  /** Saudi Arabia. */
  | 'SA'
  /** Solomon Islands. */
  | 'SB'
  /** Seychelles. */
  | 'SC'
  /** Sudan. */
  | 'SD'
  /** Sweden. */
  | 'SE'
  /** Singapore. */
  | 'SG'
  /** St. Helena. */
  | 'SH'
  /** Slovenia. */
  | 'SI'
  /** Svalbard & Jan Mayen. */
  | 'SJ'
  /** Slovakia. */
  | 'SK'
  /** Sierra Leone. */
  | 'SL'
  /** San Marino. */
  | 'SM'
  /** Senegal. */
  | 'SN'
  /** Somalia. */
  | 'SO'
  /** Suriname. */
  | 'SR'
  /** South Sudan. */
  | 'SS'
  /** São Tomé & Príncipe. */
  | 'ST'
  /** El Salvador. */
  | 'SV'
  /** Sint Maarten. */
  | 'SX'
  /** Syria. */
  | 'SY'
  /** Eswatini. */
  | 'SZ'
  /** Tristan da Cunha. */
  | 'TA'
  /** Turks & Caicos Islands. */
  | 'TC'
  /** Chad. */
  | 'TD'
  /** French Southern Territories. */
  | 'TF'
  /** Togo. */
  | 'TG'
  /** Thailand. */
  | 'TH'
  /** Tajikistan. */
  | 'TJ'
  /** Tokelau. */
  | 'TK'
  /** Timor-Leste. */
  | 'TL'
  /** Turkmenistan. */
  | 'TM'
  /** Tunisia. */
  | 'TN'
  /** Tonga. */
  | 'TO'
  /** Türkiye. */
  | 'TR'
  /** Trinidad & Tobago. */
  | 'TT'
  /** Tuvalu. */
  | 'TV'
  /** Taiwan. */
  | 'TW'
  /** Tanzania. */
  | 'TZ'
  /** Ukraine. */
  | 'UA'
  /** Uganda. */
  | 'UG'
  /** U.S. Outlying Islands. */
  | 'UM'
  /** United States. */
  | 'US'
  /** Uruguay. */
  | 'UY'
  /** Uzbekistan. */
  | 'UZ'
  /** Vatican City. */
  | 'VA'
  /** St. Vincent & Grenadines. */
  | 'VC'
  /** Venezuela. */
  | 'VE'
  /** British Virgin Islands. */
  | 'VG'
  /** Vietnam. */
  | 'VN'
  /** Vanuatu. */
  | 'VU'
  /** Wallis & Futuna. */
  | 'WF'
  /** Samoa. */
  | 'WS'
  /** Kosovo. */
  | 'XK'
  /** Yemen. */
  | 'YE'
  /** Mayotte. */
  | 'YT'
  /** South Africa. */
  | 'ZA'
  /** Zambia. */
  | 'ZM'
  /** Zimbabwe. */
  | 'ZW'
  /** Unknown Region. */
  | 'ZZ';

/** The part of the image that should remain after cropping. */
export type CropRegion =
  /** Keep the bottom of the image. */
  | 'BOTTOM'
  /** Keep the center of the image. */
  | 'CENTER'
  /** Keep the left of the image. */
  | 'LEFT'
  /** Keep the right of the image. */
  | 'RIGHT'
  /** Keep the top of the image. */
  | 'TOP';

/**
 * The three-letter currency codes that represent the world currencies used in
 * stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 *
 */
export type CurrencyCode =
  /** United Arab Emirates Dirham (AED). */
  | 'AED'
  /** Afghan Afghani (AFN). */
  | 'AFN'
  /** Albanian Lek (ALL). */
  | 'ALL'
  /** Armenian Dram (AMD). */
  | 'AMD'
  /** Netherlands Antillean Guilder. */
  | 'ANG'
  /** Angolan Kwanza (AOA). */
  | 'AOA'
  /** Argentine Pesos (ARS). */
  | 'ARS'
  /** Australian Dollars (AUD). */
  | 'AUD'
  /** Aruban Florin (AWG). */
  | 'AWG'
  /** Azerbaijani Manat (AZN). */
  | 'AZN'
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  | 'BAM'
  /** Barbadian Dollar (BBD). */
  | 'BBD'
  /** Bangladesh Taka (BDT). */
  | 'BDT'
  /** Bulgarian Lev (BGN). */
  | 'BGN'
  /** Bahraini Dinar (BHD). */
  | 'BHD'
  /** Burundian Franc (BIF). */
  | 'BIF'
  /** Bermudian Dollar (BMD). */
  | 'BMD'
  /** Brunei Dollar (BND). */
  | 'BND'
  /** Bolivian Boliviano (BOB). */
  | 'BOB'
  /** Brazilian Real (BRL). */
  | 'BRL'
  /** Bahamian Dollar (BSD). */
  | 'BSD'
  /** Bhutanese Ngultrum (BTN). */
  | 'BTN'
  /** Botswana Pula (BWP). */
  | 'BWP'
  /** Belarusian Ruble (BYN). */
  | 'BYN'
  /** Belarusian Ruble (BYR). */
  | 'BYR'
  /** Belize Dollar (BZD). */
  | 'BZD'
  /** Canadian Dollars (CAD). */
  | 'CAD'
  /** Congolese franc (CDF). */
  | 'CDF'
  /** Swiss Francs (CHF). */
  | 'CHF'
  /** Chilean Peso (CLP). */
  | 'CLP'
  /** Chinese Yuan Renminbi (CNY). */
  | 'CNY'
  /** Colombian Peso (COP). */
  | 'COP'
  /** Costa Rican Colones (CRC). */
  | 'CRC'
  /** Cape Verdean escudo (CVE). */
  | 'CVE'
  /** Czech Koruny (CZK). */
  | 'CZK'
  /** Djiboutian Franc (DJF). */
  | 'DJF'
  /** Danish Kroner (DKK). */
  | 'DKK'
  /** Dominican Peso (DOP). */
  | 'DOP'
  /** Algerian Dinar (DZD). */
  | 'DZD'
  /** Egyptian Pound (EGP). */
  | 'EGP'
  /** Eritrean Nakfa (ERN). */
  | 'ERN'
  /** Ethiopian Birr (ETB). */
  | 'ETB'
  /** Euro (EUR). */
  | 'EUR'
  /** Fijian Dollars (FJD). */
  | 'FJD'
  /** Falkland Islands Pounds (FKP). */
  | 'FKP'
  /** United Kingdom Pounds (GBP). */
  | 'GBP'
  /** Georgian Lari (GEL). */
  | 'GEL'
  /** Ghanaian Cedi (GHS). */
  | 'GHS'
  /** Gibraltar Pounds (GIP). */
  | 'GIP'
  /** Gambian Dalasi (GMD). */
  | 'GMD'
  /** Guinean Franc (GNF). */
  | 'GNF'
  /** Guatemalan Quetzal (GTQ). */
  | 'GTQ'
  /** Guyanese Dollar (GYD). */
  | 'GYD'
  /** Hong Kong Dollars (HKD). */
  | 'HKD'
  /** Honduran Lempira (HNL). */
  | 'HNL'
  /** Croatian Kuna (HRK). */
  | 'HRK'
  /** Haitian Gourde (HTG). */
  | 'HTG'
  /** Hungarian Forint (HUF). */
  | 'HUF'
  /** Indonesian Rupiah (IDR). */
  | 'IDR'
  /** Israeli New Shekel (NIS). */
  | 'ILS'
  /** Indian Rupees (INR). */
  | 'INR'
  /** Iraqi Dinar (IQD). */
  | 'IQD'
  /** Iranian Rial (IRR). */
  | 'IRR'
  /** Icelandic Kronur (ISK). */
  | 'ISK'
  /** Jersey Pound. */
  | 'JEP'
  /** Jamaican Dollars (JMD). */
  | 'JMD'
  /** Jordanian Dinar (JOD). */
  | 'JOD'
  /** Japanese Yen (JPY). */
  | 'JPY'
  /** Kenyan Shilling (KES). */
  | 'KES'
  /** Kyrgyzstani Som (KGS). */
  | 'KGS'
  /** Cambodian Riel. */
  | 'KHR'
  /** Kiribati Dollar (KID). */
  | 'KID'
  /** Comorian Franc (KMF). */
  | 'KMF'
  /** South Korean Won (KRW). */
  | 'KRW'
  /** Kuwaiti Dinar (KWD). */
  | 'KWD'
  /** Cayman Dollars (KYD). */
  | 'KYD'
  /** Kazakhstani Tenge (KZT). */
  | 'KZT'
  /** Laotian Kip (LAK). */
  | 'LAK'
  /** Lebanese Pounds (LBP). */
  | 'LBP'
  /** Sri Lankan Rupees (LKR). */
  | 'LKR'
  /** Liberian Dollar (LRD). */
  | 'LRD'
  /** Lesotho Loti (LSL). */
  | 'LSL'
  /** Lithuanian Litai (LTL). */
  | 'LTL'
  /** Latvian Lati (LVL). */
  | 'LVL'
  /** Libyan Dinar (LYD). */
  | 'LYD'
  /** Moroccan Dirham. */
  | 'MAD'
  /** Moldovan Leu (MDL). */
  | 'MDL'
  /** Malagasy Ariary (MGA). */
  | 'MGA'
  /** Macedonia Denar (MKD). */
  | 'MKD'
  /** Burmese Kyat (MMK). */
  | 'MMK'
  /** Mongolian Tugrik. */
  | 'MNT'
  /** Macanese Pataca (MOP). */
  | 'MOP'
  /** Mauritanian Ouguiya (MRU). */
  | 'MRU'
  /** Mauritian Rupee (MUR). */
  | 'MUR'
  /** Maldivian Rufiyaa (MVR). */
  | 'MVR'
  /** Malawian Kwacha (MWK). */
  | 'MWK'
  /** Mexican Pesos (MXN). */
  | 'MXN'
  /** Malaysian Ringgits (MYR). */
  | 'MYR'
  /** Mozambican Metical. */
  | 'MZN'
  /** Namibian Dollar. */
  | 'NAD'
  /** Nigerian Naira (NGN). */
  | 'NGN'
  /** Nicaraguan Córdoba (NIO). */
  | 'NIO'
  /** Norwegian Kroner (NOK). */
  | 'NOK'
  /** Nepalese Rupee (NPR). */
  | 'NPR'
  /** New Zealand Dollars (NZD). */
  | 'NZD'
  /** Omani Rial (OMR). */
  | 'OMR'
  /** Panamian Balboa (PAB). */
  | 'PAB'
  /** Peruvian Nuevo Sol (PEN). */
  | 'PEN'
  /** Papua New Guinean Kina (PGK). */
  | 'PGK'
  /** Philippine Peso (PHP). */
  | 'PHP'
  /** Pakistani Rupee (PKR). */
  | 'PKR'
  /** Polish Zlotych (PLN). */
  | 'PLN'
  /** Paraguayan Guarani (PYG). */
  | 'PYG'
  /** Qatari Rial (QAR). */
  | 'QAR'
  /** Romanian Lei (RON). */
  | 'RON'
  /** Serbian dinar (RSD). */
  | 'RSD'
  /** Russian Rubles (RUB). */
  | 'RUB'
  /** Rwandan Franc (RWF). */
  | 'RWF'
  /** Saudi Riyal (SAR). */
  | 'SAR'
  /** Solomon Islands Dollar (SBD). */
  | 'SBD'
  /** Seychellois Rupee (SCR). */
  | 'SCR'
  /** Sudanese Pound (SDG). */
  | 'SDG'
  /** Swedish Kronor (SEK). */
  | 'SEK'
  /** Singapore Dollars (SGD). */
  | 'SGD'
  /** Saint Helena Pounds (SHP). */
  | 'SHP'
  /** Sierra Leonean Leone (SLL). */
  | 'SLL'
  /** Somali Shilling (SOS). */
  | 'SOS'
  /** Surinamese Dollar (SRD). */
  | 'SRD'
  /** South Sudanese Pound (SSP). */
  | 'SSP'
  /** Sao Tome And Principe Dobra (STD). */
  | 'STD'
  /** Sao Tome And Principe Dobra (STN). */
  | 'STN'
  /** Syrian Pound (SYP). */
  | 'SYP'
  /** Swazi Lilangeni (SZL). */
  | 'SZL'
  /** Thai baht (THB). */
  | 'THB'
  /** Tajikistani Somoni (TJS). */
  | 'TJS'
  /** Turkmenistani Manat (TMT). */
  | 'TMT'
  /** Tunisian Dinar (TND). */
  | 'TND'
  /** Tongan Pa'anga (TOP). */
  | 'TOP'
  /** Turkish Lira (TRY). */
  | 'TRY'
  /** Trinidad and Tobago Dollars (TTD). */
  | 'TTD'
  /** Taiwan Dollars (TWD). */
  | 'TWD'
  /** Tanzanian Shilling (TZS). */
  | 'TZS'
  /** Ukrainian Hryvnia (UAH). */
  | 'UAH'
  /** Ugandan Shilling (UGX). */
  | 'UGX'
  /** United States Dollars (USD). */
  | 'USD'
  /** Uruguayan Pesos (UYU). */
  | 'UYU'
  /** Uzbekistan som (UZS). */
  | 'UZS'
  /** Venezuelan Bolivares (VED). */
  | 'VED'
  /** Venezuelan Bolivares (VEF). */
  | 'VEF'
  /** Venezuelan Bolivares Soberanos (VES). */
  | 'VES'
  /** Vietnamese đồng (VND). */
  | 'VND'
  /** Vanuatu Vatu (VUV). */
  | 'VUV'
  /** Samoan Tala (WST). */
  | 'WST'
  /** Central African CFA Franc (XAF). */
  | 'XAF'
  /** East Caribbean Dollar (XCD). */
  | 'XCD'
  /** West African CFA franc (XOF). */
  | 'XOF'
  /** CFP Franc (XPF). */
  | 'XPF'
  /** Unrecognized currency. */
  | 'XXX'
  /** Yemeni Rial (YER). */
  | 'YER'
  /** South African Rand (ZAR). */
  | 'ZAR'
  /** Zambian Kwacha (ZMW). */
  | 'ZMW';

/** The input fields required to create a customer access token. */
export type CustomerAccessTokenCreateInput = {
  /** The email associated to the customer. */
  email: Scalars['String']['input'];
  /** The login password to be used by the customer. */
  password: Scalars['String']['input'];
};

/** The input fields to activate a customer. */
export type CustomerActivateInput = {
  /** The activation token required to activate the customer. */
  activationToken: Scalars['String']['input'];
  /** New password that will be set during activation. */
  password: Scalars['String']['input'];
};

/** The input fields to create a new customer. */
export type CustomerCreateInput = {
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer’s email. */
  email: Scalars['String']['input'];
  /** The customer’s first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The customer’s last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The login password used by the customer. */
  password: Scalars['String']['input'];
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>;
};

/** Possible error codes that can be returned by `CustomerUserError`. */
export type CustomerErrorCode =
  /** Customer already enabled. */
  | 'ALREADY_ENABLED'
  /** Input email contains an invalid domain name. */
  | 'BAD_DOMAIN'
  /** The input value is blank. */
  | 'BLANK'
  /** Input contains HTML tags. */
  | 'CONTAINS_HTML_TAGS'
  /** Input contains URL. */
  | 'CONTAINS_URL'
  /** Customer is disabled. */
  | 'CUSTOMER_DISABLED'
  /** The input value is invalid. */
  | 'INVALID'
  /** Multipass token is not valid. */
  | 'INVALID_MULTIPASS_REQUEST'
  /** Address does not exist. */
  | 'NOT_FOUND'
  /** Input password starts or ends with whitespace. */
  | 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE'
  /** The input value is already taken. */
  | 'TAKEN'
  /** Invalid activation token. */
  | 'TOKEN_INVALID'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT'
  /** Unidentified customer. */
  | 'UNIDENTIFIED_CUSTOMER';

/** The input fields to reset a customer's password. */
export type CustomerResetInput = {
  /** New password that will be set as part of the reset password process. */
  password: Scalars['String']['input'];
  /** The reset token required to reset the customer’s password. */
  resetToken: Scalars['String']['input'];
};

/** The input fields to update the Customer information. */
export type CustomerUpdateInput = {
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: InputMaybe<Scalars['Boolean']['input']>;
  /** The customer’s email. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** The customer’s first name. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The customer’s last name. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /** The login password used by the customer. */
  password?: InputMaybe<Scalars['String']['input']>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_. To remove the phone number, specify `null`.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>;
};

/**
 * The input fields for delivery address preferences.
 *
 */
export type DeliveryAddressInput = {
  /**
   * The ID of a customer address that is associated with the buyer that is interacting with the cart.
   *
   */
  customerAddressId?: InputMaybe<Scalars['ID']['input']>;
  /** A delivery address preference of a buyer that is interacting with the cart. */
  deliveryAddress?: InputMaybe<MailingAddressInput>;
  /** Defines what kind of address validation is requested. */
  deliveryAddressValidationStrategy?: InputMaybe<DeliveryAddressValidationStrategy>;
  /**
   * Whether the given delivery address is considered to be a one-time use address. One-time use addresses do not
   * get persisted to the buyer's personal addresses when checking out.
   *
   */
  oneTimeUse?: InputMaybe<Scalars['Boolean']['input']>;
};

/**
 * Defines the types of available validation strategies for delivery addresses.
 *
 */
export type DeliveryAddressValidationStrategy =
  /** Only the country code is validated. */
  | 'COUNTRY_CODE_ONLY'
  /**
   * Strict validation is performed, i.e. all fields in the address are validated
   * according to Shopify's checkout rules. If the address fails validation, the cart will not be updated.
   *
   */
  | 'STRICT';

/** List of different delivery method types. */
export type DeliveryMethodType =
  /** Local Delivery. */
  | 'LOCAL'
  /** None. */
  | 'NONE'
  /** Shipping to a Pickup Point. */
  | 'PICKUP_POINT'
  /** Local Pickup. */
  | 'PICK_UP'
  /** Retail. */
  | 'RETAIL'
  /** Shipping. */
  | 'SHIPPING';

/** Digital wallet, such as Apple Pay, which can be used for accelerated checkouts. */
export type DigitalWallet =
  /** Android Pay. */
  | 'ANDROID_PAY'
  /** Apple Pay. */
  | 'APPLE_PAY'
  /** Google Pay. */
  | 'GOOGLE_PAY'
  /** Shopify Pay. */
  | 'SHOPIFY_PAY';

/** The method by which the discount's value is allocated onto its entitled lines. */
export type DiscountApplicationAllocationMethod =
  /** The value is spread across all entitled lines. */
  | 'ACROSS'
  /** The value is applied onto every entitled line. */
  | 'EACH'
  /** The value is specifically applied onto a particular line. */
  | 'ONE';

/**
 * The lines on the order to which the discount is applied, of the type defined by
 * the discount application's `targetType`. For example, the value `ENTITLED`, combined with a `targetType` of
 * `LINE_ITEM`, applies the discount on all line items that are entitled to the discount.
 * The value `ALL`, combined with a `targetType` of `SHIPPING_LINE`, applies the discount on all shipping lines.
 *
 */
export type DiscountApplicationTargetSelection =
  /** The discount is allocated onto all the lines. */
  | 'ALL'
  /** The discount is allocated onto only the lines that it's entitled for. */
  | 'ENTITLED'
  /** The discount is allocated onto explicitly chosen lines. */
  | 'EXPLICIT';

/**
 * The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.
 *
 */
export type DiscountApplicationTargetType =
  /** The discount applies onto line items. */
  | 'LINE_ITEM'
  /** The discount applies onto shipping lines. */
  | 'SHIPPING_LINE';

/**
 * Defines how to present the filter values, specifies the presentation of the filter.
 *
 */
export type FilterPresentation =
  /** Image presentation, filter values display an image. */
  | 'IMAGE'
  /** Swatch presentation, filter values display color or image patterns. */
  | 'SWATCH'
  /** Text presentation, no additional visual display for filter values. */
  | 'TEXT';

/**
 * The type of data that the filter group represents.
 *
 * For more information, refer to [Filter products in a collection with the Storefront API]
 * (https://shopify.dev/custom-storefronts/products-collections/filter-products).
 *
 */
export type FilterType =
  /** A boolean value. */
  | 'BOOLEAN'
  /** A list of selectable values. */
  | 'LIST'
  /** A range of prices. */
  | 'PRICE_RANGE';

/** The input fields used to specify a geographical location. */
export type GeoCoordinateInput = {
  /** The coordinate's latitude value. */
  latitude: Scalars['Float']['input'];
  /** The coordinate's longitude value. */
  longitude: Scalars['Float']['input'];
};

/** The input fields to identify a metafield on an owner resource by namespace and key. */
export type HasMetafieldsIdentifier = {
  /** The identifier for the metafield. */
  key: Scalars['String']['input'];
  /** The container the metafield belongs to. If omitted, the app-reserved namespace will be used. */
  namespace?: InputMaybe<Scalars['String']['input']>;
};

/** List of supported image content types. */
export type ImageContentType =
  /** A JPG image. */
  | 'JPG'
  /** A PNG image. */
  | 'PNG'
  /** A WEBP image. */
  | 'WEBP';

/**
 * The available options for transforming an image.
 *
 * All transformation options are considered best effort. Any transformation that
 * the original image type doesn't support will be ignored.
 *
 */
export type ImageTransformInput = {
  /**
   * The region of the image to remain after cropping.
   * Must be used in conjunction with the `maxWidth` and/or `maxHeight` fields,
   * where the `maxWidth` and `maxHeight` aren't equal.
   * The `crop` argument should coincide with the smaller value. A smaller `maxWidth` indicates a `LEFT` or `RIGHT` crop, while
   * a smaller `maxHeight` indicates a `TOP` or `BOTTOM` crop. For example, `{
   * maxWidth: 5, maxHeight: 10, crop: LEFT }` will result
   * in an image with a width of 5 and height of 10, where the right side of the image is removed.
   *
   */
  crop?: InputMaybe<CropRegion>;
  /**
   * Image height in pixels between 1 and 5760.
   *
   */
  maxHeight?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Image width in pixels between 1 and 5760.
   *
   */
  maxWidth?: InputMaybe<Scalars['Int']['input']>;
  /**
   * Convert the source image into the preferred content type.
   * Supported conversions: `.svg` to `.png`, any file type to `.jpg`, and any file type to `.webp`.
   *
   */
  preferredContentType?: InputMaybe<ImageContentType>;
  /**
   * Image size multiplier for high-resolution retina displays. Must be within 1..3.
   *
   */
  scale?: InputMaybe<Scalars['Int']['input']>;
};

/** Language codes supported by Shopify. */
export type LanguageCode =
  /** Afrikaans. */
  | 'AF'
  /** Akan. */
  | 'AK'
  /** Amharic. */
  | 'AM'
  /** Arabic. */
  | 'AR'
  /** Assamese. */
  | 'AS'
  /** Azerbaijani. */
  | 'AZ'
  /** Belarusian. */
  | 'BE'
  /** Bulgarian. */
  | 'BG'
  /** Bambara. */
  | 'BM'
  /** Bangla. */
  | 'BN'
  /** Tibetan. */
  | 'BO'
  /** Breton. */
  | 'BR'
  /** Bosnian. */
  | 'BS'
  /** Catalan. */
  | 'CA'
  /** Chechen. */
  | 'CE'
  /** Central Kurdish. */
  | 'CKB'
  /** Czech. */
  | 'CS'
  /** Church Slavic. */
  | 'CU'
  /** Welsh. */
  | 'CY'
  /** Danish. */
  | 'DA'
  /** German. */
  | 'DE'
  /** Dzongkha. */
  | 'DZ'
  /** Ewe. */
  | 'EE'
  /** Greek. */
  | 'EL'
  /** English. */
  | 'EN'
  /** Esperanto. */
  | 'EO'
  /** Spanish. */
  | 'ES'
  /** Estonian. */
  | 'ET'
  /** Basque. */
  | 'EU'
  /** Persian. */
  | 'FA'
  /** Fulah. */
  | 'FF'
  /** Finnish. */
  | 'FI'
  /** Filipino. */
  | 'FIL'
  /** Faroese. */
  | 'FO'
  /** French. */
  | 'FR'
  /** Western Frisian. */
  | 'FY'
  /** Irish. */
  | 'GA'
  /** Scottish Gaelic. */
  | 'GD'
  /** Galician. */
  | 'GL'
  /** Gujarati. */
  | 'GU'
  /** Manx. */
  | 'GV'
  /** Hausa. */
  | 'HA'
  /** Hebrew. */
  | 'HE'
  /** Hindi. */
  | 'HI'
  /** Croatian. */
  | 'HR'
  /** Hungarian. */
  | 'HU'
  /** Armenian. */
  | 'HY'
  /** Interlingua. */
  | 'IA'
  /** Indonesian. */
  | 'ID'
  /** Igbo. */
  | 'IG'
  /** Sichuan Yi. */
  | 'II'
  /** Icelandic. */
  | 'IS'
  /** Italian. */
  | 'IT'
  /** Japanese. */
  | 'JA'
  /** Javanese. */
  | 'JV'
  /** Georgian. */
  | 'KA'
  /** Kikuyu. */
  | 'KI'
  /** Kazakh. */
  | 'KK'
  /** Kalaallisut. */
  | 'KL'
  /** Khmer. */
  | 'KM'
  /** Kannada. */
  | 'KN'
  /** Korean. */
  | 'KO'
  /** Kashmiri. */
  | 'KS'
  /** Kurdish. */
  | 'KU'
  /** Cornish. */
  | 'KW'
  /** Kyrgyz. */
  | 'KY'
  /** Latin. */
  | 'LA'
  /** Luxembourgish. */
  | 'LB'
  /** Ganda. */
  | 'LG'
  /** Lingala. */
  | 'LN'
  /** Lao. */
  | 'LO'
  /** Lithuanian. */
  | 'LT'
  /** Luba-Katanga. */
  | 'LU'
  /** Latvian. */
  | 'LV'
  /** Malagasy. */
  | 'MG'
  /** Māori. */
  | 'MI'
  /** Macedonian. */
  | 'MK'
  /** Malayalam. */
  | 'ML'
  /** Mongolian. */
  | 'MN'
  /** Moldavian. */
  | 'MO'
  /** Marathi. */
  | 'MR'
  /** Malay. */
  | 'MS'
  /** Maltese. */
  | 'MT'
  /** Burmese. */
  | 'MY'
  /** Norwegian (Bokmål). */
  | 'NB'
  /** North Ndebele. */
  | 'ND'
  /** Nepali. */
  | 'NE'
  /** Dutch. */
  | 'NL'
  /** Norwegian Nynorsk. */
  | 'NN'
  /** Norwegian. */
  | 'NO'
  /** Oromo. */
  | 'OM'
  /** Odia. */
  | 'OR'
  /** Ossetic. */
  | 'OS'
  /** Punjabi. */
  | 'PA'
  /** Polish. */
  | 'PL'
  /** Pashto. */
  | 'PS'
  /** Portuguese. */
  | 'PT'
  /** Portuguese (Brazil). */
  | 'PT_BR'
  /** Portuguese (Portugal). */
  | 'PT_PT'
  /** Quechua. */
  | 'QU'
  /** Romansh. */
  | 'RM'
  /** Rundi. */
  | 'RN'
  /** Romanian. */
  | 'RO'
  /** Russian. */
  | 'RU'
  /** Kinyarwanda. */
  | 'RW'
  /** Sanskrit. */
  | 'SA'
  /** Sardinian. */
  | 'SC'
  /** Sindhi. */
  | 'SD'
  /** Northern Sami. */
  | 'SE'
  /** Sango. */
  | 'SG'
  /** Serbo-Croatian. */
  | 'SH'
  /** Sinhala. */
  | 'SI'
  /** Slovak. */
  | 'SK'
  /** Slovenian. */
  | 'SL'
  /** Shona. */
  | 'SN'
  /** Somali. */
  | 'SO'
  /** Albanian. */
  | 'SQ'
  /** Serbian. */
  | 'SR'
  /** Sundanese. */
  | 'SU'
  /** Swedish. */
  | 'SV'
  /** Swahili. */
  | 'SW'
  /** Tamil. */
  | 'TA'
  /** Telugu. */
  | 'TE'
  /** Tajik. */
  | 'TG'
  /** Thai. */
  | 'TH'
  /** Tigrinya. */
  | 'TI'
  /** Turkmen. */
  | 'TK'
  /** Tongan. */
  | 'TO'
  /** Turkish. */
  | 'TR'
  /** Tatar. */
  | 'TT'
  /** Uyghur. */
  | 'UG'
  /** Ukrainian. */
  | 'UK'
  /** Urdu. */
  | 'UR'
  /** Uzbek. */
  | 'UZ'
  /** Vietnamese. */
  | 'VI'
  /** Volapük. */
  | 'VO'
  /** Wolof. */
  | 'WO'
  /** Xhosa. */
  | 'XH'
  /** Yiddish. */
  | 'YI'
  /** Yoruba. */
  | 'YO'
  /** Chinese. */
  | 'ZH'
  /** Chinese (Simplified). */
  | 'ZH_CN'
  /** Chinese (Traditional). */
  | 'ZH_TW'
  /** Zulu. */
  | 'ZU';

/** The set of valid sort keys for the Location query. */
export type LocationSortKeys =
  /** Sort by the `city` value. */
  | 'CITY'
  /** Sort by the `distance` value. */
  | 'DISTANCE'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `name` value. */
  | 'NAME';

/** The input fields to create or update a mailing address. */
export type MailingAddressInput = {
  /**
   * The first line of the address. Typically the street address or PO Box number.
   *
   */
  address1?: InputMaybe<Scalars['String']['input']>;
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2?: InputMaybe<Scalars['String']['input']>;
  /**
   * The name of the city, district, village, or town.
   *
   */
  city?: InputMaybe<Scalars['String']['input']>;
  /**
   * The name of the customer's company or organization.
   *
   */
  company?: InputMaybe<Scalars['String']['input']>;
  /** The name of the country. */
  country?: InputMaybe<Scalars['String']['input']>;
  /** The first name of the customer. */
  firstName?: InputMaybe<Scalars['String']['input']>;
  /** The last name of the customer. */
  lastName?: InputMaybe<Scalars['String']['input']>;
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>;
  /** The region of the address, such as the province, state, or district. */
  province?: InputMaybe<Scalars['String']['input']>;
  /** The zip or postal code of the address. */
  zip?: InputMaybe<Scalars['String']['input']>;
};

/** The possible content types for a media object. */
export type MediaContentType =
  /** An externally hosted video. */
  | 'EXTERNAL_VIDEO'
  /** A Shopify hosted image. */
  | 'IMAGE'
  /** A 3d model. */
  | 'MODEL_3D'
  /** A Shopify hosted video. */
  | 'VIDEO';

/** Host for a Media Resource. */
export type MediaHost =
  /** Host for Vimeo embedded videos. */
  | 'VIMEO'
  /** Host for YouTube embedded videos. */
  | 'YOUTUBE';

/** The possible formats for a media presentation. */
export type MediaPresentationFormat =
  /** A media image presentation. */
  | 'IMAGE'
  /** A model viewer presentation. */
  | 'MODEL_VIEWER';

/** A menu item type. */
export type MenuItemType =
  /** An article link. */
  | 'ARTICLE'
  /** A blog link. */
  | 'BLOG'
  /** A catalog link. */
  | 'CATALOG'
  /** A collection link. */
  | 'COLLECTION'
  /** A collection link. */
  | 'COLLECTIONS'
  /** A customer account page link. */
  | 'CUSTOMER_ACCOUNT_PAGE'
  /** A frontpage link. */
  | 'FRONTPAGE'
  /** An http link. */
  | 'HTTP'
  /** A metaobject page link. */
  | 'METAOBJECT'
  /** A page link. */
  | 'PAGE'
  /** A product link. */
  | 'PRODUCT'
  /** A search link. */
  | 'SEARCH'
  /** A shop policy link. */
  | 'SHOP_POLICY';

/** Possible error codes that can be returned by `MetafieldDeleteUserError`. */
export type MetafieldDeleteErrorCode =
  /** The owner ID is invalid. */
  | 'INVALID_OWNER'
  /** Metafield not found. */
  | 'METAFIELD_DOES_NOT_EXIST';

/**
 * A filter used to view a subset of products in a collection matching a specific metafield value.
 *
 * Only the following metafield types are currently supported:
 * - `number_integer`
 * - `number_decimal`
 * - `single_line_text_field`
 * - `boolean` as of 2022-04.
 *
 */
export type MetafieldFilter = {
  /** The key of the metafield to filter on. */
  key: Scalars['String']['input'];
  /** The namespace of the metafield to filter on. */
  namespace: Scalars['String']['input'];
  /** The value of the metafield. */
  value: Scalars['String']['input'];
};

/** Possible error codes that can be returned by `MetafieldsSetUserError`. */
export type MetafieldsSetUserErrorCode =
  /** The input value is blank. */
  | 'BLANK'
  /** The input value isn't included in the list. */
  | 'INCLUSION'
  /** The owner ID is invalid. */
  | 'INVALID_OWNER'
  /** The type is invalid. */
  | 'INVALID_TYPE'
  /** The value is invalid for metafield type or for definition options. */
  | 'INVALID_VALUE'
  /** The input value should be less than or equal to the maximum value allowed. */
  | 'LESS_THAN_OR_EQUAL_TO'
  /** The input value needs to be blank. */
  | 'PRESENT'
  /** The input value is too long. */
  | 'TOO_LONG'
  /** The input value is too short. */
  | 'TOO_SHORT';

/** The input fields used to retrieve a metaobject by handle. */
export type MetaobjectHandleInput = {
  /** The handle of the metaobject. */
  handle: Scalars['String']['input'];
  /** The type of the metaobject. */
  type: Scalars['String']['input'];
};

/** The input fields for a monetary value with currency. */
export type MoneyInput = {
  /** Decimal money amount. */
  amount: Scalars['Decimal']['input'];
  /** Currency of the money. */
  currencyCode: CurrencyCode;
};

/** Represents the reason for the order's cancellation. */
export type OrderCancelReason =
  /** The customer wanted to cancel the order. */
  | 'CUSTOMER'
  /** Payment was declined. */
  | 'DECLINED'
  /** The order was fraudulent. */
  | 'FRAUD'
  /** There was insufficient inventory. */
  | 'INVENTORY'
  /** The order was canceled for an unlisted reason. */
  | 'OTHER'
  /** Staff made an error. */
  | 'STAFF';

/** Represents the order's current financial status. */
export type OrderFinancialStatus =
  /** Displayed as **Authorized**. */
  | 'AUTHORIZED'
  /** Displayed as **Paid**. */
  | 'PAID'
  /** Displayed as **Partially paid**. */
  | 'PARTIALLY_PAID'
  /** Displayed as **Partially refunded**. */
  | 'PARTIALLY_REFUNDED'
  /** Displayed as **Pending**. */
  | 'PENDING'
  /** Displayed as **Refunded**. */
  | 'REFUNDED'
  /** Displayed as **Voided**. */
  | 'VOIDED';

/** Represents the order's aggregated fulfillment status for display purposes. */
export type OrderFulfillmentStatus =
  /** Displayed as **Fulfilled**. All of the items in the order have been fulfilled. */
  | 'FULFILLED'
  /** Displayed as **In progress**. Some of the items in the order have been fulfilled, or a request for fulfillment has been sent to the fulfillment service. */
  | 'IN_PROGRESS'
  /** Displayed as **On hold**. All of the unfulfilled items in this order are on hold. */
  | 'ON_HOLD'
  /** Displayed as **Open**. None of the items in the order have been fulfilled. Replaced by "UNFULFILLED" status. */
  | 'OPEN'
  /** Displayed as **Partially fulfilled**. Some of the items in the order have been fulfilled. */
  | 'PARTIALLY_FULFILLED'
  /** Displayed as **Pending fulfillment**. A request for fulfillment of some items awaits a response from the fulfillment service. Replaced by "IN_PROGRESS" status. */
  | 'PENDING_FULFILLMENT'
  /** Displayed as **Restocked**. All of the items in the order have been restocked. Replaced by "UNFULFILLED" status. */
  | 'RESTOCKED'
  /** Displayed as **Scheduled**. All of the unfulfilled items in this order are scheduled for fulfillment at later time. */
  | 'SCHEDULED'
  /** Displayed as **Unfulfilled**. None of the items in the order have been fulfilled. */
  | 'UNFULFILLED';

/** The set of valid sort keys for the Order query. */
export type OrderSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `processed_at` value. */
  | 'PROCESSED_AT'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `total_price` value. */
  | 'TOTAL_PRICE';

/** The set of valid sort keys for the Page query. */
export type PageSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT';

/** Decides the distribution of results. */
export type PredictiveSearchLimitScope =
  /** Return results up to limit across all types. */
  | 'ALL'
  /** Return results up to limit per type. */
  | 'EACH';

/** The types of search items to perform predictive search on. */
export type PredictiveSearchType =
  /** Returns matching articles. */
  | 'ARTICLE'
  /** Returns matching collections. */
  | 'COLLECTION'
  /** Returns matching pages. */
  | 'PAGE'
  /** Returns matching products. */
  | 'PRODUCT'
  /** Returns matching query strings. */
  | 'QUERY';

/** The preferred delivery methods such as shipping, local pickup or through pickup points. */
export type PreferenceDeliveryMethodType =
  /** A delivery method used to let buyers collect purchases at designated locations like parcel lockers. */
  | 'PICKUP_POINT'
  /** A delivery method used to let buyers receive items directly from a specific location within an area. */
  | 'PICK_UP'
  /** A delivery method used to send items directly to a buyer’s specified address. */
  | 'SHIPPING';

/**
 * The input fields for a filter used to view a subset of products in a collection matching a specific price range.
 *
 */
export type PriceRangeFilter = {
  /** The maximum price in the range. Empty indicates no max price. */
  max?: InputMaybe<Scalars['Float']['input']>;
  /** The minimum price in the range. Defaults to zero. */
  min?: InputMaybe<Scalars['Float']['input']>;
};

/** The set of valid sort keys for the ProductCollection query. */
export type ProductCollectionSortKeys =
  /** Sort by the `best-selling` value. */
  | 'BEST_SELLING'
  /** Sort by the `collection-default` value. */
  | 'COLLECTION_DEFAULT'
  /** Sort by the `created` value. */
  | 'CREATED'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `manual` value. */
  | 'MANUAL'
  /** Sort by the `price` value. */
  | 'PRICE'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE';

/**
 * The input fields for a filter used to view a subset of products in a collection.
 * By default, the `available` and `price` filters are enabled. Filters are customized with the Shopify Search & Discovery app.
 * Learn more about [customizing storefront filtering](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters).
 *
 */
export type ProductFilter = {
  /** Filter on if the product is available for sale. */
  available?: InputMaybe<Scalars['Boolean']['input']>;
  /** A product category to filter on. */
  category?: InputMaybe<CategoryFilter>;
  /** A range of prices to filter with-in. */
  price?: InputMaybe<PriceRangeFilter>;
  /** A product metafield to filter on. */
  productMetafield?: InputMaybe<MetafieldFilter>;
  /** The product type to filter on. */
  productType?: InputMaybe<Scalars['String']['input']>;
  /** The product vendor to filter on. */
  productVendor?: InputMaybe<Scalars['String']['input']>;
  /** A product tag to filter on. */
  tag?: InputMaybe<Scalars['String']['input']>;
  /** A standard product attribute metafield to filter on. */
  taxonomyMetafield?: InputMaybe<TaxonomyMetafieldFilter>;
  /** A variant metafield to filter on. */
  variantMetafield?: InputMaybe<MetafieldFilter>;
  /** A variant option to filter on. */
  variantOption?: InputMaybe<VariantOptionFilter>;
};

/** The set of valid sort keys for the ProductImage query. */
export type ProductImageSortKeys =
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `position` value. */
  | 'POSITION'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/** The set of valid sort keys for the ProductMedia query. */
export type ProductMediaSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `position` value. */
  | 'POSITION'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE';

/**
 * The recommendation intent that is used to generate product recommendations.
 * You can use intent to generate product recommendations according to different strategies.
 *
 */
export type ProductRecommendationIntent =
  /** Offer customers products that are complementary to a product for which recommendations are to be fetched. An example is add-on products that display in a Pair it with section. */
  | 'COMPLEMENTARY'
  /** Offer customers a mix of products that are similar or complementary to a product for which recommendations are to be fetched. An example is substitutable products that display in a You may also like section. */
  | 'RELATED';

/** The set of valid sort keys for the Product query. */
export type ProductSortKeys =
  /** Sort by the `best_selling` value. */
  | 'BEST_SELLING'
  /** Sort by the `created_at` value. */
  | 'CREATED_AT'
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `price` value. */
  | 'PRICE'
  /** Sort by the `product_type` value. */
  | 'PRODUCT_TYPE'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `title` value. */
  | 'TITLE'
  /** Sort by the `updated_at` value. */
  | 'UPDATED_AT'
  /** Sort by the `vendor` value. */
  | 'VENDOR';

/** The set of valid sort keys for the ProductVariant query. */
export type ProductVariantSortKeys =
  /** Sort by the `id` value. */
  | 'ID'
  /** Sort by the `position` value. */
  | 'POSITION'
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  | 'RELEVANCE'
  /** Sort by the `sku` value. */
  | 'SKU'
  /** Sort by the `title` value. */
  | 'TITLE';

/** Specifies whether to perform a partial word match on the last search term. */
export type SearchPrefixQueryType =
  /** Perform a partial word match on the last search term. */
  | 'LAST'
  /** Don't perform a partial word match on the last search term. */
  | 'NONE';

/** The set of valid sort keys for the search query. */
export type SearchSortKeys =
  /** Sort by the `price` value. */
  | 'PRICE'
  /** Sort by relevance to the search terms. */
  | 'RELEVANCE';

/** The types of search items to perform search within. */
export type SearchType =
  /** Returns matching articles. */
  | 'ARTICLE'
  /** Returns matching pages. */
  | 'PAGE'
  /** Returns matching products. */
  | 'PRODUCT';

/** Specifies whether to display results for unavailable products. */
export type SearchUnavailableProductsType =
  /** Exclude unavailable products. */
  | 'HIDE'
  /** Show unavailable products after all other matching results. This is the default. */
  | 'LAST'
  /** Show unavailable products in the order that they're found. */
  | 'SHOW';

/** Specifies the list of resource fields to search. */
export type SearchableField =
  /** Author of the page or article. */
  | 'AUTHOR'
  /** Body of the page or article or product description or collection description. */
  | 'BODY'
  /** Product type. */
  | 'PRODUCT_TYPE'
  /** Tag associated with the product or article. */
  | 'TAG'
  /** Title of the page or article or product title or collection title. */
  | 'TITLE'
  /** Variant barcode. */
  | 'VARIANTS_BARCODE'
  /** Variant SKU. */
  | 'VARIANTS_SKU'
  /** Variant title. */
  | 'VARIANTS_TITLE'
  /** Product vendor. */
  | 'VENDOR';

/** The input fields required for a selected option. */
export type SelectedOptionInput = {
  /** The product option’s name. */
  name: Scalars['String']['input'];
  /** The product option’s value. */
  value: Scalars['String']['input'];
};

/** The checkout charge when the full amount isn't charged at checkout. */
export type SellingPlanCheckoutChargeType =
  /** The checkout charge is a percentage of the product or variant price. */
  | 'PERCENTAGE'
  /** The checkout charge is a fixed price amount. */
  | 'PRICE';

/** Represents a valid selling plan interval. */
export type SellingPlanInterval =
  /** Day interval. */
  | 'DAY'
  /** Month interval. */
  | 'MONTH'
  /** Week interval. */
  | 'WEEK'
  /** Year interval. */
  | 'YEAR';

/** The payment frequency for a Shop Pay Installments Financing Plan. */
export type ShopPayInstallmentsFinancingPlanFrequency =
  /** Monthly payment frequency. */
  | 'MONTHLY'
  /** Weekly payment frequency. */
  | 'WEEKLY';

/** The loan type for a Shop Pay Installments Financing Plan Term. */
export type ShopPayInstallmentsLoan =
  /** An interest-bearing loan type. */
  | 'INTEREST'
  /** A split-pay loan type. */
  | 'SPLIT_PAY'
  /** A zero-percent loan type. */
  | 'ZERO_PERCENT';

/** The input fields to create a delivery method for a Shop Pay payment request. */
export type ShopPayPaymentRequestDeliveryMethodInput = {
  /** The amount for the delivery method. */
  amount?: InputMaybe<MoneyInput>;
  /** The code of the delivery method. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** The detail about when the delivery may be expected. */
  deliveryExpectationLabel?: InputMaybe<Scalars['String']['input']>;
  /** The detail of the delivery method. */
  detail?: InputMaybe<Scalars['String']['input']>;
  /** The label of the delivery method. */
  label?: InputMaybe<Scalars['String']['input']>;
  /** The maximum delivery date for the delivery method. */
  maxDeliveryDate?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
  /** The minimum delivery date for the delivery method. */
  minDeliveryDate?: InputMaybe<Scalars['ISO8601DateTime']['input']>;
};

/** Represents the delivery method type for a Shop Pay payment request. */
export type ShopPayPaymentRequestDeliveryMethodType =
  /** The delivery method type is pickup. */
  | 'PICKUP'
  /** The delivery method type is shipping. */
  | 'SHIPPING';

/** The input fields to create a discount for a Shop Pay payment request. */
export type ShopPayPaymentRequestDiscountInput = {
  /** The amount of the discount. */
  amount?: InputMaybe<MoneyInput>;
  /** The label of the discount. */
  label?: InputMaybe<Scalars['String']['input']>;
};

/** The input fields to create an image for a Shop Pay payment request. */
export type ShopPayPaymentRequestImageInput = {
  /** The alt text of the image. */
  alt?: InputMaybe<Scalars['String']['input']>;
  /** The source URL of the image. */
  url: Scalars['String']['input'];
};

/** The input fields represent a Shop Pay payment request. */
export type ShopPayPaymentRequestInput = {
  /**
   * The delivery methods for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  deliveryMethods?: InputMaybe<Array<ShopPayPaymentRequestDeliveryMethodInput>>;
  /**
   * The discount codes for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  discountCodes?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * The discounts for the payment request order.
   *
   * The input must not contain more than `250` values.
   */
  discounts?: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /**
   * The line items for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  lineItems?: InputMaybe<Array<ShopPayPaymentRequestLineItemInput>>;
  /** The locale for the payment request. */
  locale: Scalars['String']['input'];
  /** The encrypted payment method for the payment request. */
  paymentMethod?: InputMaybe<Scalars['String']['input']>;
  /** The presentment currency for the payment request. */
  presentmentCurrency: CurrencyCode;
  /** The delivery method type for the payment request. */
  selectedDeliveryMethodType?: InputMaybe<ShopPayPaymentRequestDeliveryMethodType>;
  /**
   * The shipping lines for the payment request.
   *
   * The input must not contain more than `250` values.
   */
  shippingLines?: InputMaybe<Array<ShopPayPaymentRequestShippingLineInput>>;
  /** The subtotal amount for the payment request. */
  subtotal: MoneyInput;
  /** The total amount for the payment request. */
  total: MoneyInput;
  /** The total shipping price for the payment request. */
  totalShippingPrice?: InputMaybe<ShopPayPaymentRequestTotalShippingPriceInput>;
  /** The total tax for the payment request. */
  totalTax?: InputMaybe<MoneyInput>;
};

/** The input fields to create a line item for a Shop Pay payment request. */
export type ShopPayPaymentRequestLineItemInput = {
  /** The final item price for the line item. */
  finalItemPrice?: InputMaybe<MoneyInput>;
  /** The final line price for the line item. */
  finalLinePrice?: InputMaybe<MoneyInput>;
  /** The image of the line item. */
  image?: InputMaybe<ShopPayPaymentRequestImageInput>;
  /**
   * The item discounts for the line item.
   *
   * The input must not contain more than `250` values.
   */
  itemDiscounts?: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /** The label of the line item. */
  label?: InputMaybe<Scalars['String']['input']>;
  /**
   * The line discounts for the line item.
   *
   * The input must not contain more than `250` values.
   */
  lineDiscounts?: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /** The original item price for the line item. */
  originalItemPrice?: InputMaybe<MoneyInput>;
  /** The original line price for the line item. */
  originalLinePrice?: InputMaybe<MoneyInput>;
  /** The quantity of the line item. */
  quantity: Scalars['Int']['input'];
  /** Whether the line item requires shipping. */
  requiresShipping?: InputMaybe<Scalars['Boolean']['input']>;
  /** The SKU of the line item. */
  sku?: InputMaybe<Scalars['String']['input']>;
};

/** The input fields to create a shipping line for a Shop Pay payment request. */
export type ShopPayPaymentRequestShippingLineInput = {
  /** The amount for the shipping line. */
  amount?: InputMaybe<MoneyInput>;
  /** The code of the shipping line. */
  code?: InputMaybe<Scalars['String']['input']>;
  /** The label of the shipping line. */
  label?: InputMaybe<Scalars['String']['input']>;
};

/** The input fields to create a shipping total for a Shop Pay payment request. */
export type ShopPayPaymentRequestTotalShippingPriceInput = {
  /**
   * The discounts for the shipping total.
   *
   * The input must not contain more than `250` values.
   */
  discounts?: InputMaybe<Array<ShopPayPaymentRequestDiscountInput>>;
  /** The final total for the shipping total. */
  finalTotal?: InputMaybe<MoneyInput>;
  /** The original total for the shipping total. */
  originalTotal?: InputMaybe<MoneyInput>;
};

/**
 * The input fields for submitting Shop Pay payment method information for checkout.
 *
 */
export type ShopPayWalletContentInput = {
  /** The customer's billing address. */
  billingAddress: MailingAddressInput;
  /** Session token for transaction. */
  sessionToken: Scalars['String']['input'];
};

/** The types of resources potentially present in a sitemap. */
export type SitemapType =
  /** Articles present in the sitemap. */
  | 'ARTICLE'
  /** Blogs present in the sitemap. */
  | 'BLOG'
  /** Collections present in the sitemap. */
  | 'COLLECTION'
  /**
   * Metaobjects present in the sitemap. Only metaobject types with the
   * [`renderable` capability](https://shopify.dev/docs/apps/build/custom-data/metaobjects/use-metaobject-capabilities#render-metaobjects-as-web-pages)
   * are included in sitemap.
   *
   */
  | 'METAOBJECT'
  /** Pages present in the sitemap. */
  | 'PAGE'
  /** Products present in the sitemap. */
  | 'PRODUCT';

/** The code of the error that occurred during cart submit for completion. */
export type SubmissionErrorCode =
  | 'BUYER_IDENTITY_EMAIL_IS_INVALID'
  | 'BUYER_IDENTITY_EMAIL_REQUIRED'
  | 'BUYER_IDENTITY_PHONE_IS_INVALID'
  | 'DELIVERY_ADDRESS1_INVALID'
  | 'DELIVERY_ADDRESS1_REQUIRED'
  | 'DELIVERY_ADDRESS1_TOO_LONG'
  | 'DELIVERY_ADDRESS2_INVALID'
  | 'DELIVERY_ADDRESS2_REQUIRED'
  | 'DELIVERY_ADDRESS2_TOO_LONG'
  | 'DELIVERY_ADDRESS_REQUIRED'
  | 'DELIVERY_CITY_INVALID'
  | 'DELIVERY_CITY_REQUIRED'
  | 'DELIVERY_CITY_TOO_LONG'
  | 'DELIVERY_COMPANY_INVALID'
  | 'DELIVERY_COMPANY_REQUIRED'
  | 'DELIVERY_COMPANY_TOO_LONG'
  | 'DELIVERY_COUNTRY_REQUIRED'
  | 'DELIVERY_FIRST_NAME_INVALID'
  | 'DELIVERY_FIRST_NAME_REQUIRED'
  | 'DELIVERY_FIRST_NAME_TOO_LONG'
  | 'DELIVERY_INVALID_POSTAL_CODE_FOR_COUNTRY'
  | 'DELIVERY_INVALID_POSTAL_CODE_FOR_ZONE'
  | 'DELIVERY_LAST_NAME_INVALID'
  | 'DELIVERY_LAST_NAME_REQUIRED'
  | 'DELIVERY_LAST_NAME_TOO_LONG'
  | 'DELIVERY_NO_DELIVERY_AVAILABLE'
  | 'DELIVERY_NO_DELIVERY_AVAILABLE_FOR_MERCHANDISE_LINE'
  | 'DELIVERY_OPTIONS_PHONE_NUMBER_INVALID'
  | 'DELIVERY_OPTIONS_PHONE_NUMBER_REQUIRED'
  | 'DELIVERY_PHONE_NUMBER_INVALID'
  | 'DELIVERY_PHONE_NUMBER_REQUIRED'
  | 'DELIVERY_POSTAL_CODE_INVALID'
  | 'DELIVERY_POSTAL_CODE_REQUIRED'
  | 'DELIVERY_ZONE_NOT_FOUND'
  | 'DELIVERY_ZONE_REQUIRED_FOR_COUNTRY'
  | 'ERROR'
  | 'MERCHANDISE_LINE_LIMIT_REACHED'
  | 'MERCHANDISE_NOT_APPLICABLE'
  | 'MERCHANDISE_NOT_ENOUGH_STOCK_AVAILABLE'
  | 'MERCHANDISE_OUT_OF_STOCK'
  | 'MERCHANDISE_PRODUCT_NOT_PUBLISHED'
  | 'NO_DELIVERY_GROUP_SELECTED'
  | 'PAYMENTS_ADDRESS1_INVALID'
  | 'PAYMENTS_ADDRESS1_REQUIRED'
  | 'PAYMENTS_ADDRESS1_TOO_LONG'
  | 'PAYMENTS_ADDRESS2_INVALID'
  | 'PAYMENTS_ADDRESS2_REQUIRED'
  | 'PAYMENTS_ADDRESS2_TOO_LONG'
  | 'PAYMENTS_BILLING_ADDRESS_ZONE_NOT_FOUND'
  | 'PAYMENTS_BILLING_ADDRESS_ZONE_REQUIRED_FOR_COUNTRY'
  | 'PAYMENTS_CITY_INVALID'
  | 'PAYMENTS_CITY_REQUIRED'
  | 'PAYMENTS_CITY_TOO_LONG'
  | 'PAYMENTS_COMPANY_INVALID'
  | 'PAYMENTS_COMPANY_REQUIRED'
  | 'PAYMENTS_COMPANY_TOO_LONG'
  | 'PAYMENTS_COUNTRY_REQUIRED'
  | 'PAYMENTS_CREDIT_CARD_BASE_EXPIRED'
  | 'PAYMENTS_CREDIT_CARD_BASE_GATEWAY_NOT_SUPPORTED'
  | 'PAYMENTS_CREDIT_CARD_BASE_INVALID_START_DATE_OR_ISSUE_NUMBER_FOR_DEBIT'
  | 'PAYMENTS_CREDIT_CARD_BRAND_NOT_SUPPORTED'
  | 'PAYMENTS_CREDIT_CARD_FIRST_NAME_BLANK'
  | 'PAYMENTS_CREDIT_CARD_GENERIC'
  | 'PAYMENTS_CREDIT_CARD_LAST_NAME_BLANK'
  | 'PAYMENTS_CREDIT_CARD_MONTH_INCLUSION'
  | 'PAYMENTS_CREDIT_CARD_NAME_INVALID'
  | 'PAYMENTS_CREDIT_CARD_NUMBER_INVALID'
  | 'PAYMENTS_CREDIT_CARD_NUMBER_INVALID_FORMAT'
  | 'PAYMENTS_CREDIT_CARD_SESSION_ID'
  | 'PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_BLANK'
  | 'PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_INVALID_FOR_CARD_TYPE'
  | 'PAYMENTS_CREDIT_CARD_YEAR_EXPIRED'
  | 'PAYMENTS_CREDIT_CARD_YEAR_INVALID_EXPIRY_YEAR'
  | 'PAYMENTS_FIRST_NAME_INVALID'
  | 'PAYMENTS_FIRST_NAME_REQUIRED'
  | 'PAYMENTS_FIRST_NAME_TOO_LONG'
  | 'PAYMENTS_INVALID_POSTAL_CODE_FOR_COUNTRY'
  | 'PAYMENTS_INVALID_POSTAL_CODE_FOR_ZONE'
  | 'PAYMENTS_LAST_NAME_INVALID'
  | 'PAYMENTS_LAST_NAME_REQUIRED'
  | 'PAYMENTS_LAST_NAME_TOO_LONG'
  | 'PAYMENTS_METHOD_REQUIRED'
  | 'PAYMENTS_METHOD_UNAVAILABLE'
  | 'PAYMENTS_PHONE_NUMBER_INVALID'
  | 'PAYMENTS_PHONE_NUMBER_REQUIRED'
  | 'PAYMENTS_POSTAL_CODE_INVALID'
  | 'PAYMENTS_POSTAL_CODE_REQUIRED'
  | 'PAYMENTS_SHOPIFY_PAYMENTS_REQUIRED'
  | 'PAYMENTS_UNACCEPTABLE_PAYMENT_AMOUNT'
  | 'PAYMENTS_WALLET_CONTENT_MISSING'
  | 'TAXES_DELIVERY_GROUP_ID_NOT_FOUND'
  | 'TAXES_LINE_ID_NOT_FOUND'
  | 'TAXES_MUST_BE_DEFINED';

/**
 * A filter used to view a subset of products in a collection matching a specific taxonomy metafield value.
 *
 */
export type TaxonomyMetafieldFilter = {
  /** The key of the metafield to filter on. */
  key: Scalars['String']['input'];
  /** The namespace of the metafield to filter on. */
  namespace: Scalars['String']['input'];
  /** The value of the metafield. */
  value: Scalars['String']['input'];
};

/** The accepted types of unit of measurement. */
export type UnitPriceMeasurementMeasuredType =
  /** Unit of measurements representing areas. */
  | 'AREA'
  /** Unit of measurements representing lengths. */
  | 'LENGTH'
  /** Unit of measurements representing volumes. */
  | 'VOLUME'
  /** Unit of measurements representing weights. */
  | 'WEIGHT';

/** The valid units of measurement for a unit price measurement. */
export type UnitPriceMeasurementMeasuredUnit =
  /** 100 centiliters equals 1 liter. */
  | 'CL'
  /** 100 centimeters equals 1 meter. */
  | 'CM'
  /** Metric system unit of weight. */
  | 'G'
  /** 1 kilogram equals 1000 grams. */
  | 'KG'
  /** Metric system unit of volume. */
  | 'L'
  /** Metric system unit of length. */
  | 'M'
  /** Metric system unit of area. */
  | 'M2'
  /** 1 cubic meter equals 1000 liters. */
  | 'M3'
  /** 1000 milligrams equals 1 gram. */
  | 'MG'
  /** 1000 milliliters equals 1 liter. */
  | 'ML'
  /** 1000 millimeters equals 1 meter. */
  | 'MM';

/** Systems of weights and measures. */
export type UnitSystem =
  /** Imperial system of weights and measures. */
  | 'IMPERIAL_SYSTEM'
  /** Metric system of weights and measures. */
  | 'METRIC_SYSTEM';

/** Possible error codes that can be returned by `ShopPayPaymentRequestSessionUserErrors`. */
export type UserErrorsShopPayPaymentRequestSessionUserErrorsCode =
  /** Idempotency key has already been used. */
  | 'IDEMPOTENCY_KEY_ALREADY_USED'
  /** Payment request input is invalid. */
  | 'PAYMENT_REQUEST_INVALID_INPUT'
  /** Payment request not found. */
  | 'PAYMENT_REQUEST_NOT_FOUND';

/** The input fields for a filter used to view a subset of products in a collection matching a specific variant option. */
export type VariantOptionFilter = {
  /** The name of the variant option to filter on. */
  name: Scalars['String']['input'];
  /** The value of the variant option to filter on. */
  value: Scalars['String']['input'];
};

/** Units of measurement for weight. */
export type WeightUnit =
  /** Metric system unit of mass. */
  | 'GRAMS'
  /** 1 kilogram equals 1000 grams. */
  | 'KILOGRAMS'
  /** Imperial system unit of mass. */
  | 'OUNCES'
  /** 1 pound equals 16 ounces. */
  | 'POUNDS';

export type CartCreateMutationVariables = Exact<{
  input: CartInput;
}>;


export type CartCreateMutation = { cartCreate?: { cart?: { id: string, createdAt: string, updatedAt: string, lines: { edges: Array<{ node: { id: string, quantity: number, merchandise: { id: string, title: string, sku?: string | null, price: { amount: string, currencyCode: CurrencyCode }, selectedOptions: Array<{ name: string, value: string }>, compareAtPrice?: { amount: string, currencyCode: CurrencyCode } | null, image?: { url: string, altText?: string | null } | null } } | { id: string, quantity: number, merchandise: { id: string, title: string, sku?: string | null, price: { amount: string, currencyCode: CurrencyCode }, selectedOptions: Array<{ name: string, value: string }>, compareAtPrice?: { amount: string, currencyCode: CurrencyCode } | null, image?: { url: string, altText?: string | null } | null } } }> }, cost: { totalAmount: { amount: string, currencyCode: CurrencyCode }, subtotalAmount: { amount: string, currencyCode: CurrencyCode } } } | null, userErrors: Array<{ code?: CartErrorCode | null, field?: Array<string> | null, message: string }> } | null };

export type GetAllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllArticlesQuery = { articles: { nodes: Array<{ id: string, title: string, handle: string, excerpt?: string | null, publishedAt: string, blog: { handle: string, title: string }, author: { name: string }, image?: { url: string, altText?: string | null } | null }> } };

export type GetBlogsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBlogsQuery = { blogs: { nodes: Array<{ id: string, title: string, handle: string }> } };

export type GetAllCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCollectionQuery = { collections: { nodes: Array<{ handle: string, title: string }> } };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { products: { nodes: Array<{ id: string, title: string, handle: string, description: string, images: { nodes: Array<{ url: string, altText?: string | null }> }, variants: { edges: Array<{ node: { id: string, title: string, price: { amount: string, currencyCode: CurrencyCode }, compareAtPrice?: { amount: string, currencyCode: CurrencyCode } | null } }> } }> } };

export type GetArticleListQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type GetArticleListQuery = { blog?: { id: string, title: string, handle: string, articles: { nodes: Array<{ id: string, title: string, handle: string, excerpt?: string | null, publishedAt: string, image?: { url: string, altText?: string | null } | null, author: { name: string } }> } } | null };

export type GetDetailArticleQueryVariables = Exact<{
  blogHandle: Scalars['String']['input'];
  articleHandle: Scalars['String']['input'];
}>;


export type GetDetailArticleQuery = { blog?: { articleByHandle?: { id: string, title: string, handle: string, excerpt?: string | null, contentHtml: string, publishedAt: string, image?: { url: string, altText?: string | null } | null, author: { name: string } } | null } | null };

export type GetMainMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMainMenuQuery = { menu?: { items: Array<{ title: string, url?: string | null, type: MenuItemType }> } | null };

export type GetCollectionListQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type GetCollectionListQuery = { collection?: { title: string, description: string, products: { nodes: Array<{ id: string, title: string, handle: string, description: string, images: { nodes: Array<{ url: string, altText?: string | null }> }, variants: { edges: Array<{ node: { id: string, title: string, price: { amount: string, currencyCode: CurrencyCode }, compareAtPrice?: { amount: string, currencyCode: CurrencyCode } | null } }> } }> } } | null };

export type GetProductDetailQueryVariables = Exact<{
  handle: Scalars['String']['input'];
}>;


export type GetProductDetailQuery = { product?: { id: string, title: string, description: string, images: { nodes: Array<{ url: string, altText?: string | null }> }, variants: { edges: Array<{ node: { id: string, title: string, sku?: string | null, price: { amount: string, currencyCode: CurrencyCode }, compareAtPrice?: { amount: string, currencyCode: CurrencyCode } | null, selectedOptions: Array<{ name: string, value: string }>, image?: { url: string, altText?: string | null } | null } }> } } | null };

export type GetPredictiveSearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type GetPredictiveSearchQuery = { predictiveSearch?: { products: Array<{ id: string, title: string, handle: string, images: { nodes: Array<{ url: string }> }, featuredImage?: { url: string } | null }> } | null };

export type GetSearchResultQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type GetSearchResultQuery = { search: { edges: Array<{ node: { id: string, title: string, handle: string, description: string, images: { nodes: Array<{ url: string, altText?: string | null }> }, variants: { edges: Array<{ node: { id: string, title: string, price: { amount: string, currencyCode: CurrencyCode }, compareAtPrice?: { amount: string, currencyCode: CurrencyCode } | null } }> } } | {} }> } };
