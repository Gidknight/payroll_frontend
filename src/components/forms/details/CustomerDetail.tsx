import { useState } from 'react'
import TextInput from '../../TextInput'
import SecondaryButton from '../../SecondaryButton'
import PrimaryButton from '../../PrimaryButton'
import toast from 'react-hot-toast'

import { updateCustomerDetail } from '../../../utils/requests'

const CustomerDetail = ({
  user_id,
  cus_id,
  value,
  title,
  subText,
  inputType = 'text'
}: {
  user_id: string
  cus_id: string
  value?: string
  title: string
  subText?: any
  inputType: string
}) => {
  const [detail, setDetail] = useState<string | number>(value || '')
  const [isLoading, setIsLoading] = useState(false)
  const [updateDetail, setUpdateDetail] = useState(false)
  const [error, setError] = useState('')
  const cancelUpdate = () => {
    setError('')
    setUpdateDetail(false)
    setDetail(value || '')
  }

  // const router = useRouter();
  const handleChange = async () => {
    if (!detail) {
      setError(title + ' is Required')
      return
    }
    try {
      setIsLoading(true)
      const response = await updateCustomerDetail({
        id: cus_id,
        user_id: user_id,
        value: detail,
        type: title
      })
      if (response?.status === 201) {
        toast.success(response?.data?.message)
        setUpdateDetail(false)
        setTimeout(() => {
          // window.location.reload()
        }, 1000)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error('Error Occured')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className=" p-5 w-full flex flex-col md:flex-row items-center justify-between border-2 border-slate-400 rounded-2xl shadow-md">
      <div className="w-1/2 flex flex-col items-start justify-start gap-2">
        <h2 className="text-primary font-bold text-xl capitalize">{title}</h2>
        <p>{subText}</p>
      </div>
      <div className="w-1/2 flex flex-col items-end justify-start gap-1">
        <TextInput
          inputType={inputType}
          onUpdate={setDetail}
          placeholder={title}
          string={detail}
          isDisabled={!updateDetail}
          error={error}
        />

        {updateDetail ? (
          <div className="w-1/4 flex items-center justify-end gap-2">
            <PrimaryButton
              title="submit"
              isLoading={isLoading}
              cusFunc={handleChange}
              type={'submit'}
              isLock={false}
            />
            <SecondaryButton
              title="cancel"
              isLoading={isLoading}
              cusFunc={cancelUpdate}
              isLock={false}
            />
          </div>
        ) : (
          <div className="w-1/5">
            <SecondaryButton
              title="change"
              isLoading={isLoading}
              cusFunc={() => setUpdateDetail(true)}
              isLock={false}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerDetail