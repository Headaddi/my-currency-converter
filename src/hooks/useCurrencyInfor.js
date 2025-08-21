 
import { useEffect, useState } from "react";

function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY

    useEffect(() => {
        fetch(`https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${currency.toUpperCase()}`)
        .then((res) => res.json())
        .then((res) => {

            const rates = {};
            Object.keys(res.data).forEach((cur) => {
                rates[cur] = res.data[cur].value;
            })
            setData(rates);
        })
        .catch((err) => console.error("Error fetching data:", err))

    }, [currency, API_KEY])

    console.log(data);
    
    return data;
}

export default useCurrencyInfo;