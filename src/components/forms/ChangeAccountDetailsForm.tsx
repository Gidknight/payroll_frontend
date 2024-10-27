import { ImProfile } from 'react-icons/im'

import ChangeUsername from './details/ChangeUsername'

import UserDetail from './details/UserDetail'
import UserAddress from './details/UserAddress'
import { useEffect, useState } from 'react'
import { getSingleUser } from '@renderer/utils/requests'
import { User } from '@renderer/types'

const ChangeAccountDetailsForm = ({ user_id }: { user_id: string }) => {
  const [user, setUser] = useState<User | null>(null)
  const [, setLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await getSingleUser(user_id)
        // console.log(response.data)
        // console.log({ _store, _user })
        // console.log(response.data.data)
        setUser(response?.data?.data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <div className="w-full bg-white p-2 shadow-lg border-t-4 border-live">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="text-[30px]">{<ImProfile />}</span>
          <h2 className="header-text truncate w-full">Account Details</h2>
        </div>
      </div>
      <div className="w-full flex flex-col items-start justify-normal gap-5 p-5">
        {user?.user_name && <ChangeUsername value={user?.user_name || ''} />}

        {(String(user?.contact) == '' || user?.contact) && (
          <UserDetail
            inputType="number"
            title="Phone Contact"
            user_id={user_id}
            value={user?.contact || ''}
            subText="A valid phone number"
          />
        )}

        {(String(user?.email) == '' || user?.email) && (
          <UserDetail
            inputType="email"
            title="Email Address"
            user_id={user_id}
            value={user?.email}
          />
        )}
        {(String(user?.first_name) == '' || user?.first_name) && (
          <UserDetail
            inputType="text"
            title="First Name"
            user_id={user_id}
            value={user?.first_name}
          />
        )}
        {(String(user?.last_name) == '' || user?.last_name) && (
          <UserDetail
            inputType="text"
            title="Last Name"
            user_id={user_id}
            value={user?.last_name}
          />
        )}
        {(String(user?.other_name) == '' || user?.other_name) && (
          <UserDetail
            inputType="text"
            title="Other Name"
            user_id={user_id}
            value={user?.other_name}
          />
        )}

        {(String(user?.address) == '' || user?.address) && (
          <UserAddress title="Home Address" user_id={user_id} value={user?.address} />
        )}
      </div>
    </div>
  )
}

export default ChangeAccountDetailsForm
