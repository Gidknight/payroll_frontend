import { useState } from 'react'

const PaymentOptions = () => {
  const [selectedPayment, setSelectedPayment] = useState('')

  const handlePaymentChange = (e: any) => {
    setSelectedPayment(e.target.value)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    alert(`Selected Payment Method: ${selectedPayment}`)
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Select Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">
            <input
              type="radio"
              value="cash"
              checked={selectedPayment === 'cash'}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            Cash
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">
            <input
              type="radio"
              value="card"
              checked={selectedPayment === 'card'}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            Card
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">
            <input
              type="radio"
              value="transfer"
              checked={selectedPayment === 'transfer'}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            Transfer
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">
            <input
              type="radio"
              value="credit"
              checked={selectedPayment === 'credit'}
              onChange={handlePaymentChange}
              className="mr-2"
            />
            Credit
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Confirm Payment
        </button>
      </form>
    </div>
  )
}

export default PaymentOptions
