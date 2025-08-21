import { useState } from 'react'
import './App.css'
import { InputBox } from './components/index.js'
import useCurrencyInfo from './hooks/useCurrencyInfor'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('INR')
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
    setTimeout(() => {
      convert()
    }, 0)
  }

  const convert = () => {
    if (!currencyInfo[to]) {
      setConvertedAmount(0)
      return
    }
    const result = amount * currencyInfo[to]
    setConvertedAmount(Number(result.toFixed(2)))
  }

  const isLoading = options.length === 0

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat px-4"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/4497591/pexels-photo-4497591.jpeg)`
      }}
    >
      <div className="w-full max-w-lg mx-auto border border-gray-200 rounded-2xl p-6 backdrop-blur-md bg-white/30 shadow-lg">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 drop-shadow">
            Currency Converter
          </h1>
          <p className="text-sm text-gray-700">Real-time exchange rates at your fingertips</p>
        </div>

        {/* Loading / Error */}
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              convert()
            }}
            className="space-y-4"
          >
            {/* From Box */}
            <InputBox
              label="From"
              amount={amount}
              currencyOption={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectedCurrency={from}
            />

            {/* Swap Button */}
            <div className="relative w-full h-0.5 my-4">
              <button
                type="button"
                onClick={swap}
                className="cursor-pointer absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-blue-600 rounded-full bg-blue-600 text-white px-4 py-2 shadow-md hover:bg-blue-700 transition-all"
              >
                ⇅ Swap
              </button>
            </div>

            {/* To Box */}
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOption={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectedCurrency={to}
              amountDisabled
            />

            {/* Convert Button */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow"
            >
              Convert {from} → {to}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default App
