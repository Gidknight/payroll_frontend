import { useState } from 'react'
import toast from 'react-hot-toast'
import TextInputWithLabel from '../TextInputWithLabel'
import { MdAdd } from 'react-icons/md'
import PrimaryButton from '../PrimaryButton'
import { ProductTypes } from '../../types'

import DatalistComponent from '../DatalistComponent'
import { useAuthStore } from '@renderer/stores/authStore'
import { addToStock } from '@renderer/utils/requests'

const StockInForm = ({ products }: { products: ProductTypes[] }) => {
  const user = useAuthStore((state) => state.userAuth)

  const [productQuantity, setProductQuantity] = useState(0)
  const [productDetail, setProductDetail] = useState<ProductTypes | null>()
  const [isLoading, setIsLoading] = useState(false)

  const submitQuantity = async (e: any) => {
    e.preventDefault()
    if (!productDetail) return
    try {
      setIsLoading(true)

      const prod = products.find((product: ProductTypes) => product.id === productDetail.id)
      if (prod) {
        const response = await addToStock({
          user_id: user.id,
          product_id: productDetail.id,

          quantity: productQuantity
        })

        if (response?.data?.status) {
          toast.success(response.data.message)
          setProductQuantity(0)
          setProductDetail(null)
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        } else {
          toast.error(response?.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('An error occurred, product not added')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-2 shadow-lg border-t-4 border-live w-full">
      <h2 className="header-text pl-5">Stock-In Product</h2>
      <form
        onSubmit={submitQuantity}
        className="flex flex-row items-start justify-normal gap-5 p-5"
      >
        <div className="w-5/6 flex flex-row items-center justify-evenly gap-4">
          <DatalistComponent
            options={products}
            label={'Product name'}
            placeholder={'Search by Product Name'}
            setSelection={setProductDetail}
          />
          {/* <SearchDropdown
            options={products}
            label={"Product name"}
            placeholder={"Search by Product Name"}
            setSelection={setProductDetail}
          /> */}
          <TextInputWithLabel
            inputType="number"
            label="product quantity"
            onUpdate={setProductQuantity}
            placeholder="New Quantity"
            string={productQuantity}
            icon={<MdAdd />}
          />
        </div>
        <div className="w-1/6 m-auto">
          <PrimaryButton
            cusFunc={() => {}}
            isLoading={isLoading}
            title="Add"
            type={'submit'}
            isLock={productQuantity > 0 && productDetail?.id ? false : true}
          />
        </div>
      </form>
    </div>
  )
}

export default StockInForm
