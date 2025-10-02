/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'
import { addCartLine, createCart, getCartById } from "@/shopify/cart/use-cart";
import { cookies } from "next/headers";

type AddItemResponse = {
  cartId?: string;
  success: boolean;
  message?: string;
  error?: string;
  item?: any; 
};

export async function addItem(
  prevState: any,
  variantId: string | undefined
): Promise<AddItemResponse> {
  let cartId = (await cookies()).get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCartById(cartId);
  }

  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart?.id;
    if (cartId) {
      (await cookies()).set('cartId', cartId, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      });
    }
  }

  if (!variantId) {
    return { success: false, message: 'Missing variant ID' };
  }

  if (!cartId) {
    return { success: false, message: 'Missing cart ID' };
  }

  try {
    await addCartLine(cartId, variantId, 1);
    const updatedCart = await getCartById(cartId);
    const newItem = updatedCart?.lines?.edges?.slice(-1)[0]?.node;

    return { success: true, cartId, item: newItem };
  } catch (error) {
    return { success: false, message: 'Error adding item to cart', error: String(error) };
  }
}
