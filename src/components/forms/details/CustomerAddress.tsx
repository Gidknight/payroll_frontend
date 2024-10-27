import { useState } from 'react'
import SecondaryButton from '../../SecondaryButton'
import PrimaryButton from '../../PrimaryButton'
import toast from 'react-hot-toast'
import { updateCustomerDetail } from '../../../utils/requests'
import { TextArea } from '../..'

const CustomerAddress = ({
  user_id,
  value,
  title,
  cus_id
}: {
  user_id: string
  cus_id: string
  value?: string
  title: string
}) => {
  const [detail, setDetail] = useState(value || '')
  const [isLoading, setIsLoading] = useState(false)
  const [updateDetail, setUpdateDetail] = useState(false)
  const cancelUpdate = () => {
    setUpdateDetail(false)
    setDetail(value || '')
  }

  const handleChange = async () => {
    try {
      setIsLoading(true)
      const response = await updateCustomerDetail({
        id: cus_id,
        user_id: user_id,
        value: detail,
        type: title
      })
      if (response?.status == 201) {
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
        {/* <p>This Cannot be changed later</p> */}
      </div>
      <div className="w-1/2 flex flex-col items-end justify-start gap-1">
        <TextArea
          rows={4}
          onUpdate={setDetail}
          placeholder={title}
          string={detail}
          isDisabled={!updateDetail}
          error={''}
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

export default CustomerAddress
