import { ShowErrorObject, StoreDataTypes } from '../../types'
import { useEffect, useState } from 'react'
import PrimaryButton from '../PrimaryButton'
import SecondaryButton from '../SecondaryButton'
import TextInputWithLabel from '../TextInputWithLabel'
import { BiEdit, BiLock } from 'react-icons/bi'
import TextAreaWithLabel from '../TextAreaWithLabel'
import toast from 'react-hot-toast'
import { createStoreData, getStoreData, updateStoreData } from '../../utils/requests'

const StoreDetails = ({ user_id }: { user_id: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [website, setWebsite] = useState('')
  const [contact1, setContact1] = useState<string>('')
  const [contact2, setContact2] = useState<string>('')
  const [store, setStore] = useState<StoreDataTypes | null>(null)

  const [error, setError] = useState<ShowErrorObject | null>(null)

  const showError = (type: string) => {
    if (error && Object.entries(error).length > 0 && error?.type == type) {
      return error.message
    }
    return ''
  }

  const validate = () => {
    setError(null)
    let isError = false
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (!name) {
      setError({ type: 'name', message: 'A Store Name is required' })
      isError = true
    } else if (contact1?.toString().length !== 11) {
      setError({
        type: 'contact1',
        message: 'Input a valid mobile number (11 digits)'
      })
      isError = true
    } else if (contact2?.toString().length !== 11) {
      setError({
        type: 'contact2',
        message: 'Input a valid mobile number (11 digits)'
      })
      isError = false
    } else if (!reg.test(email)) {
      setError({ type: 'email', message: 'The Email is not valid' })
      isError = true
    }
    return isError
  }

  const cancelEdit = () => {
    setAddress(store?.address || '')
    setContact1(store?.primary_contact || '')
    setContact2(store?.secondary_contact || '')
    setEmail(store?.email || '')
    setName(store?.name || '')
    setEdit(false)
  }

  const createStore = async () => {
    let isError = validate()
    if (isError) return
    try {
      setIsLoading(true)
      const response = await createStoreData({
        name,
        address,
        email,
        user_id,
        contact1,
        contact2,
        website
      })
      if (response.status == 201) {
        toast.success(response?.data?.message)
        cancelEdit()
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      toast.error('Error Creating store Data')
    } finally {
      setIsLoading(false)
    }
  }

  const updateStore = async () => {
    let isError = validate()
    if (isError) return
    try {
      setIsLoading(true)
      const response = await updateStoreData({
        name,
        address,
        email,
        user_id,
        contact1,
        contact2,
        website,
        store_id: store?.id
      })
      if (response.status == 201) {
        toast.success(response?.data?.message)
        // cancelEdit()
        setEdit(false)
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        toast.error(response?.data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Error Updating store Data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchStore = async () => {
      try {
        setIsLoading(true)
        const response = await getStoreData()
        const _store: StoreDataTypes = response?.data[0]
        setStore(_store)
        setName(_store.name)
        setAddress(_store.address)
        setEmail(_store.email)
        setContact1(_store.primary_contact)
        setContact2(_store?.secondary_contact || '')
        setWebsite(_store?.website || '')
      } catch (error) {
      } finally {
        setIsLoading(false)
      }
    }

    fetchStore()
  }, [])

  return (
    <div className={edit ? 'holder-active' : 'holder-null'}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center justify-start gap-3">
          <span className="text-[30px]">{<BiLock />}</span>
          <h2 className="header-text truncate w-full">Store Information</h2>
        </div>
        <button
          onClick={() => setEdit(true)}
          className={`flex flex-row items-center justify-center gap-1 p-1 capitalize italic border-b-2 hover:text-primary hover:bg-gray1 hover:border-primary duration-200 transition-all ${
            edit && 'text-primary bg-gray1 border-primary'
          }`}
        >
          <BiEdit size={'22'} />
          <span>Edit</span>
        </button>
      </div>

      <div className="w-full flex flex-col items-start justify-normal gap-1 p-5">
        <TextInputWithLabel
          label="Store Name"
          inputType="text"
          onUpdate={setName}
          placeholder={`Old Name(${name}): A new name is Required`}
          string={name}
          isDisabled={!edit}
          error={showError('name')}
        />
        <TextInputWithLabel
          label="Email Address"
          inputType="email"
          onUpdate={setEmail}
          placeholder="activestoreemail@email.com"
          string={email}
          isDisabled={!edit}
          error={showError('email')}
        />
        <TextInputWithLabel
          label="Primary Contact"
          inputType="number"
          onUpdate={setContact1}
          placeholder="080xxxxxxxx"
          string={contact1}
          isDisabled={!edit}
          error={showError('contact1')}
        />
        <TextInputWithLabel
          label="Secondary Contact(Optional)"
          inputType="number"
          onUpdate={setContact2}
          placeholder="080xxxxxxxx"
          string={contact2}
          isDisabled={!edit}
          error={''}
          isRequired={false}
        />
        <TextInputWithLabel
          label="Store Website"
          inputType="text"
          onUpdate={setWebsite}
          placeholder="www.official-store-site.com"
          string={website}
          isDisabled={!edit}
          error={showError('website')}
        />
        <TextAreaWithLabel
          label="Store Address"
          onUpdate={setAddress}
          placeholder="Store Address"
          string={address}
          isDisabled={!edit}
          error={showError('address')}
          rows={3}
          isRequired={true}
        />
        {edit && (
          <div className="w-full flex flex-row items-center justify-end py-5">
            <div className="flex flex-row items-center justify-end gap-5">
              <PrimaryButton
                title={store ? 'update' : 'create'}
                isLoading={isLoading}
                cusFunc={store ? updateStore : createStore}
                type={'submit'}
                isLock={!name || !address || !contact1 || !email ? true : false}
              />
              <SecondaryButton
                title="cancel"
                isLoading={isLoading}
                cusFunc={cancelEdit}
                isLock={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoreDetails
