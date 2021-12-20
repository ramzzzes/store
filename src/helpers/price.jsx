export const calculatePrice = (product,currencies) => {
    const priceObject = product?.prices?.find(price => price.currency.label === currencies.find(currency => currency.active === true)?.label)
    return {
        amount : priceObject?.amount,
        symbol : priceObject?.currency?.symbol
    }
};

export const calculatePriceSum = (cart,currencies) => {

    let sum = 0

    cart.forEach(product => {
        const priceObject = product?.prices?.find(price => price.currency.label === currencies.find(currency => currency.active === true)?.label)
        sum += priceObject?.amount * product.quantity
    })

    return sum
};