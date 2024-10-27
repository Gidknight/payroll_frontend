import { useState } from 'react'
import TextInput from '../../TextInput'

const ChangeUsername = ({ value }: { value?: string }) => {
  const [username, setUsername] = useState(value || '')
  // const [isLoading, setIsLoading] = useState(false)
  // const [updateDetail, setUpdateDetail] = useState(false)
  // const cancelUpdate = () => {
  //   setUpdateDetail(false)
  //   setUsername(value || '')
  // }
  return (
    <div className=" p-5 w-full flex flex-col md:flex-row items-center justify-between border-2 border-slate-400 rounded-2xl shadow-md">
      <div className="w-1/2 flex flex-col items-start justify-start gap-2">
        <h2 className="text-primary font-bold text-xl capitalize">Username</h2>
        <p className="italic text-slate-700">This Cannot be changed</p>
      </div>
      <div className="w-1/2 flex flex-col items-end justify-start gap-1">
        <TextInput
          label="user name"
          inputType="text"
          onUpdate={setUsername}
          placeholder="Username"
          string={username}
          isDisabled={true}
          error={''}
        />
        {/* {updateDetail ? (
          <div className="w-1/4 flex items-center justify-end gap-2">
            <SecondaryButton
              title="cancel"
              isLoading={isLoading}
              cusFunc={cancelUpdate}
              isLock={false}
            />
            <PrimaryButton
              title="submit"
              isLoading={isLoading}
              cusFunc={() => {}}
              type={"submit"}
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
        )} */}
      </div>
    </div>
  )
}

export default ChangeUsername
