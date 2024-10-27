import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
// import { CartItemTypes } from "../types";

// interface CartStore {
//   myCart: CartItemTypes[];
//   total: number;
//   discount: number;
//   profit: number;
//   step: number;
//   addToCart: (item: CartItemTypes) => void;
//   increaseItem: (id: number) => void;
//   decreaseItem: (id: number) => void;
//   setItemQuantity: (id: number, value: string) => void;
//   removeItem: (id: number) => void;
//   removeAll: () => void;
//   setTotal: (value: number) => void;
//   setDiscount: (value: number) => void;

//   setUnitQuantity: (id: number, value: string) => void;
//   increaseUnit: (id: number) => void;
//   decreaseUnit: (id: number) => void;
// }

export const useCartStore = create()(
  devtools(
    persist(
      (set, get) => ({
        myCart: [],
        total: 0,
        discount: 0,
        step: 0,
        profit: 0,
        addToCart: (item) => {
          if (!item) return
          set((state) => {
            const existingItem = state.myCart.find(
              (cartItem) => cartItem.product_id === item.product_id
            )
            if (existingItem) {
              // console.log("before carting==>", existingItem);
              return {
                myCart: state.myCart.map((cartItem) =>
                  cartItem.product_id === item.product_id
                    ? {
                        ...cartItem,
                        quantity: Number(cartItem.quantity) + Number(item.quantity),
                        unit_quantity: Number(cartItem?.unit_quantity) + Number(item?.unit_quantity)
                      }
                    : cartItem
                )
              }
            }
            return {
              myCart: [item, ...state.myCart]
            }
          })
        },
        increaseItem: (id) => {
          set((state) => ({
            myCart: state.myCart.map((item) =>
              item.id === id ? { ...item, quantity: Number(item?.quantity) + 1 } : item
            )
          }))
        },
        decreaseItem: (id) =>
          set((state) => ({
            myCart: state.myCart
              .map((item) =>
                item.id === id && item.quantity > 1
                  ? { ...item, quantity: Number(item.quantity) - 1 }
                  : {
                      ...item,
                      quantity: 0
                    }
              )
              .filter((item) => item.quantity >= 0)
          })),

        setItemQuantity: (id, value) => {
          set((state) => {
            const existingItem = state.myCart.find((cartItem) => cartItem.id === id)
            if (!existingItem) return
            return {
              myCart: state.myCart.map((cartItem) =>
                cartItem.id === id
                  ? {
                      ...cartItem,
                      quantity: Number(value)
                    }
                  : cartItem
              )
            }
          })
        },
        increaseUnit: (id) => {
          set((state) => ({
            myCart: state.myCart.map((item) =>
              item.id === id ? { ...item, unit_quantity: Number(item?.unit_quantity) + 1 } : item
            )
          }))
        },
        decreaseUnit: (id) =>
          set((state) => ({
            myCart: state.myCart
              .map((item) =>
                Number(item?.unit_quantity) > 0 && item.id === id
                  ? {
                      ...item,
                      unit_quantity: Number(item?.unit_quantity) - 1
                    }
                  : {
                      ...item,
                      unit_quantity: 0
                    }
              )
              .filter((item) => item?.unit_quantity >= 0)
          })),

        setUnitQuantity: (id, value) => {
          set((state) => {
            const existingItem = state.myCart.find((cartItem) => cartItem.id === id)
            if (!existingItem) return
            return {
              myCart: state.myCart.map((cartItem) =>
                cartItem.id === id
                  ? {
                      ...cartItem,
                      unit_quantity: Number(value)
                    }
                  : cartItem
              )
            }
          })
        },

        removeItem: (id) => {
          set((state) => {
            let cart = state.myCart
            let newCart = []
            for (let i = 0; i < cart.length; i++) {
              if (cart[i].id !== id) {
                newCart.push(cart[i])
              }
            }
            return { myCart: newCart }
          })
        },
        removeAll: () => {
          set((state) => ({ myCart: [] }))
        },
        setTotal: (value) => set({ total: Number(value) }),

        setDiscount: (value) => set({ discount: Number(value) })
      }),

      {
        name: 'cart',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)
