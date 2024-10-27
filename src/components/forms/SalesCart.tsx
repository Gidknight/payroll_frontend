import { useEffect, useState } from 'react'
import { BiArrowToLeft, BiArrowToRight, BiCart } from 'react-icons/bi'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../SecondaryButton'
import { useCartStore } from '../../stores/useCartStore'
import { MdClose } from 'react-icons/md'
import { useGeneralStore } from '../../stores/general'
import { CURRENCY } from '../../constants'
import { CartItemTypes } from '../../types'

const SalesCart = (): JSX.Element => {
  const myCart = useCartStore((state) => state.myCart)
  const removeItem = useCartStore((state) => state.removeItem)
  const removeAll = useCartStore((state) => state.removeAll)
  const increaseItem = useCartStore((state) => state.increaseItem)
  const decreaseItem = useCartStore((state) => state.decreaseItem)
  const increaseUnit = useCartStore((state) => state.increaseUnit)
  const decreaseUnit = useCartStore((state) => state.decreaseUnit)
  const setItemQuantity = useCartStore((state) => state.setItemQuantity)
  const setUnitQuantity = useCartStore((state) => state.setUnitQuantity)
  const setTotal = useCartStore((state) => state.setTotal)
  const discount = useCartStore((state) => state.discount)
  const total = useCartStore((state) => state.total)
  const setDiscount = useCartStore((state) => state.setDiscount)

  // console.log("my cart", myCart);
  // general store
  const setIsProcessSales = useGeneralStore((state) => state.setIsProcessSales)
  const [totalSum, setTotalSum] = useState(0)
  const [totalProducts, setTotalProducts] = useState(0)
  const [, setTotalQuantity] = useState(0)
  const [discount_, setDiscount_] = useState(0)

  const calculateTotal = () => {
    let tot = 0
    let tot_qty = 0
    myCart.forEach((item: CartItemTypes) => {
      tot = tot + item.price * item.quantity
      tot_qty = tot_qty + item.quantity
      if (item?.unit_quantity && item?.unit_price) {
        tot = tot + item?.unit_price * item?.unit_quantity
        tot_qty = tot_qty + item?.unit_quantity
      }
    })

    return {
      tot: tot.toFixed(6),
      tot_prod: myCart.length,
      tot_qty: tot_qty,
      tot_with_discount: Number((tot - discount_).toFixed(6))
    }
  }

  const calculateSum = (qty = 0, prod_price = 0, u_qty = 0, u_price = 0) =>
    qty * prod_price + u_qty * u_price

  useEffect(() => {
    const { tot, tot_prod, tot_qty, tot_with_discount } = calculateTotal()
    setTotalSum(parseFloat(tot))
    setTotal(tot_with_discount)
    // setProfit(profit);
    setTotalProducts(tot_prod)
    setTotalQuantity(tot_qty)
  }, [myCart, discount_])
  return (
    <div className={myCart.length ? 'holder-active' : 'holder-null'}>
      <div className="flex flex-row items-center justify-start gap-3">
        <span className="header-icon">
          <BiCart />
        </span>
        <h2 className="header-text whitespace-nowrap">CART</h2>
      </div>
      <div className="p-5 space-y-3 border-2 border-dashed rounded-xl">
        <div className="flex flex-col items-start justify-center gap-2">
          {myCart.length > 0 ? (
            myCart.map((item: CartItemTypes) => (
              <div
                key={item.id}
                className="w-full  border border-secondary rounded-lg shadow-md flex flex-col items-center justify-start"
              >
                <div className="flex flex-row items-center justify-end w-full">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="whitespace-nowrap flex flex-row items-center justify-center gap-1 p-1 hover:text-error transition-all duration-200 text-sm"
                  >
                    <MdClose size={14} /> <span>Remove Item</span>
                  </button>
                </div>
                <div className="w-full flex flex-row items-center justify-between p-2.5">
                  <div>
                    <p className="whitespace-nowrap">
                      Name: <b>{item.product_name}</b>
                    </p>
                    <p className="whitespace-nowrap">
                      Category: <b>{item.category_name}</b>
                    </p>
                    <p className="whitespace-nowrap">
                      Price: <b>{item.price.toLocaleString('us-EN')}</b>{' '}
                      {item?.retail && <b>/ {item?.unit_price}</b>}
                    </p>
                    {/* <p className="whitespace-nowrap">
                      Stoke: <b>{item.stoke}</b>
                    </p> */}
                    <p className="whitespace-nowrap">
                      Sum:{' '}
                      <b>
                        {calculateSum(
                          item.quantity,
                          item.price,
                          item?.unit_quantity,
                          item?.unit_price
                        ).toLocaleString('us-EN')}
                      </b>
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-1">
                    {/* pack controller */}
                    <p className="italic text-sm font-semibold capitalize">whole</p>
                    <div className="flex flex-row items-center justify-center gap-2 w-100">
                      <button
                        onClick={() => decreaseItem(item.id)}
                        className="p-2 text-primary bg-gray1 rounded-md text-lg hover:shadow-sm transition-all duration-200 active:bg-error active:text-white"
                      >
                        <BiArrowToLeft />
                      </button>
                      <input
                        type="number"
                        className="appearance-none outline-none bg-slate-100 font-bold w-20 p-2 text-center border border-primary rounded-xl"
                        value={item.quantity}
                        placeholder="Qty"
                        required={true}
                        onChange={(e) => setItemQuantity(item.id, e.target.value)}
                      />

                      <button
                        disabled={item.stoke <= item.quantity ? true : false}
                        onClick={() => increaseItem(item.id)}
                        className="p-2 text-primary bg-gray1 rounded-md text-lg hover:shadow-sm transition-all duration-200 active:bg-live active:text-white"
                      >
                        <BiArrowToRight />
                      </button>
                    </div>

                    {/* unit controller */}
                    {item?.retail && (
                      <div className="w-full">
                        <p className="italic text-sm font-semibold capitalize text-center">
                          {item?.unit_name}
                        </p>
                        <div className="flex flex-row items-center justify-center gap-2 w-100">
                          <button
                            onClick={() => decreaseUnit(item.id)}
                            className="p-2 text-primary bg-gray1 rounded-md text-lg hover:shadow-sm transition-all duration-200 active:bg-error active:text-white"
                          >
                            <BiArrowToLeft />
                          </button>
                          <input
                            type="number"
                            className="appearance-none outline-none bg-slate-100 font-semibold w-20 p-1 text-center border border-primary rounded-xl"
                            value={item?.unit_quantity}
                            placeholder="Qty"
                            required={true}
                            onChange={(e) => setUnitQuantity(item.id, e.target.value)}
                          />

                          <button
                            disabled={item.stoke <= item.quantity ? true : false}
                            onClick={() => increaseUnit(item.id)}
                            className="p-2 text-primary bg-gray1 rounded-md text-lg hover:shadow-sm transition-all duration-200 active:bg-live active:text-white"
                          >
                            <BiArrowToRight />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center font-bold text-gray-400 mx-auto">Cart Is Empty</p>
          )}
        </div>
        {myCart.length > 0 && (
          <div className="space-y-1">
            <div className="flex flex-row items-center justify-between text-lg italic">
              <h2>Total Products:</h2>
              <h2 className="font-bold">{totalProducts}</h2>
            </div>
            {/* <div className="flex flex-row items-center justify-between text-lg italic">
              <h2>Total Number Of Items:</h2>
              <h2 className="font-bold">{totalQuantity}</h2>
            </div> */}
            <div className="flex flex-row items-center justify-between text-lg italic">
              <h2>Discount:</h2>
              <input
                type="number"
                className="appearance-none outline-none bg-slate-50 font-semibold w-100 p-2 text-right border focus:border-primary rounded-xl"
                value={discount}
                placeholder="Discount"
                required={true}
                onChange={(e: any) => {
                  setDiscount_(parseFloat(e.target.value))
                  setDiscount(e.target.value)
                }}
                disabled={false}
              />
            </div>
            <div className="flex flex-row items-center justify-between header-text border-t-2 ">
              <h2>Total Sum ({CURRENCY}):</h2>
              <div className="flex flex-row justify-center items-center">
                <h2 className={discount > 0 ? 'line-through text-slate-500' : ''}>
                  {totalSum.toLocaleString('us-EN')}{' '}
                </h2>
                {discount > 0 && (
                  <div className="flex flex-row items-center justify-center">
                    <span className="text-red-400 text-base px-1">
                      {'    '} - {discount || 0}
                    </span>
                    <h2>{total.toLocaleString('us-EN')} </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-row items-center justify-between w-100 gap-5">
          <SecondaryButton
            title="cancel sales"
            cusFunc={removeAll}
            isLoading={false}
            isLock={myCart.length < 1 ? true : false}
          />
          <PrimaryButton
            title={'submit'}
            isLock={myCart.length < 1 ? true : false}
            isLoading={false}
            type={'button'}
            cusFunc={() => setIsProcessSales(true)}
          />
        </div>
      </div>
    </div>
  )
}

export default SalesCart
