import { useState } from 'react'

import TextInputWithLabel from '../TextInputWithLabel'
import TextAreaWithLabel from '../TextAreaWithLabel'
import PrimaryButton from '../PrimaryButton'
import { sellOnCredit } from '../../utils/requests'
// import ComboBox from '../ComboBox'
import toast from 'react-hot-toast'
import { useCartStore } from '../../stores/useCartStore'
import { useGeneralStore } from '../../stores/general'
import { CURRENCY } from '../../constants'
import { CustomerDetailTypes } from '../../types'

// const calculateInterest = (
//   total: number,
//   interest: number,
//   payable_for: number,
//   start_date: string
// ) => {
//   let responseObject = {
//     end_payment: 0,
//     min_payment: 0,
//     end_date: ''
//   }

//   const rate = (interest / 100) * total
//   const end_payment = total + rate
//   responseObject.end_payment = end_payment
//   responseObject.min_payment = end_payment / payable_for

//   return responseObject
// }

const AgreementForm = ({
  user_id,
  cus_details
}: {
  user_id: string
  cus_details: CustomerDetailTypes
}) => {
  const [downPayment] = useState<number>(0)
  const [startDate, setStartDate] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [review, setReview] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const total = useCartStore((state: any) => state.total)
  const discount = useCartStore((state: any) => state.discount)
  const setDiscount = useCartStore((state: any) => state.setDiscount)
  const myCart = useCartStore((state: any) => state.myCart)
  const removeAll = useCartStore((state: any) => state.removeAll)

  // general store
  const setIsSalesSuccessful = useGeneralStore((state: any) => state.setIsSalesSuccessful)

  const setActiveReceipt = useGeneralStore((state: any) => state.setActiveReceipt)

  const newBalance = cus_details?.balance - (total + cus_details?.debt)

  const handlePayment = async () => {
    try {
      setIsLoading(true)
      const response = await sellOnCredit({
        cart: myCart,
        customer_id: cus_details.id,
        due_date: dueDate,
        initial_payment: downPayment,
        start_date: startDate,
        total,
        user_id,
        review,
        discount: 0
      })

      if (response?.status == 201) {
        toast.success(response?.data?.message)
        setActiveReceipt({
          id: response.data.id,
          name: response.data.mode_of_payment
        })
        removeAll()
        setIsSalesSuccessful(true)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error: any) {
      console.log(error)
      toast.error(error?.data?.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="">
      <div className="bg-slate-100 p-2 shadow-md text-xs space-y-1 border-l-2 border-yellow-400">
        <p>
          ID: <span className="font-bold text-sm">{cus_details.id}</span>
        </p>
        <p>
          Customer name:{' '}
          <span className={`font-bold text-sm`}>
            {cus_details.last_name} {cus_details.first_name}
          </span>
        </p>

        <p>
          Debt:{' '}
          <span
            className={`font-bold text-sm ${
              cus_details.debt > 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {CURRENCY + ' ' + cus_details.debt.toLocaleString('en-US')}
          </span>
        </p>

        <p>
          Balance:{' '}
          <span
            className={`font-bold text-sm ${
              cus_details?.balance <= 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {CURRENCY + ' ' + cus_details?.balance.toLocaleString('en-US')}
          </span>
        </p>
        {newBalance < 0 && (
          <p>
            New Debt:{' '}
            <span className={`font-bold text-sm text-red-500`}>
              {CURRENCY + ' ' + newBalance.toLocaleString('en-US')}
            </span>
          </p>
        )}

        {newBalance >= 0 && (
          <p>
            New Balance:{' '}
            <span className={`font-bold text-sm text-green-500`}>
              {CURRENCY + ' ' + newBalance.toLocaleString('en-US')}
            </span>
          </p>
        )}
      </div>
      <div>
        {/* <TextInputWithLabel
          inputType="text"
          onUpdate={setDownPayment}
          placeholder="Down Payment"
          string={downPayment}
          error=""
          isDisabled={isLoading}
          label="Down Payment"
        /> */}
        {/* <ComboBox
          defaultMessage={"-- Credit Term --"}
          value={term}
          showDefault={false}
          id={"term"}
          isDisabled={isLoading}
          label={"Credit Term"}
          onSelect={setTerm}
          options={terms}
          error={""}
          subLabel={""}
        /> */}
        <TextInputWithLabel
          inputType="date"
          onUpdate={setStartDate}
          placeholder="Start Date"
          string={startDate}
          error=""
          isDisabled={isLoading}
          label="Start Date"
        />
        <TextInputWithLabel
          inputType="date"
          onUpdate={setDueDate}
          placeholder="Start Date"
          string={dueDate}
          error=""
          isDisabled={isLoading}
          label="Due Date"
        />
        <TextInputWithLabel
          inputType="number"
          onUpdate={setDiscount}
          placeholder="Discount"
          string={discount}
          isDisabled={true}
          label="Discount"
        />
        <TextAreaWithLabel
          label="Review"
          onUpdate={setReview}
          placeholder="Customer's Review"
          string={review}
          isDisabled={false}
          isRequired={false}
          rows={2}
          error=""
        />

        <div>
          <PrimaryButton
            isLoading={isLoading}
            title="Submit"
            type={'button'}
            isLock={!startDate || !dueDate ? true : false}
            cusFunc={handlePayment}
          />
        </div>
      </div>
    </div>
  )
}

export default AgreementForm
