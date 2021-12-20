import { SET,MAKE_ACTIVE}  from "./currencyActionTypes";

export const setCurrencies = (currencies) => {
    return {
        type: SET,
        currencies,
    };
};

export const setActiveCurrency = (currency) => {
    return {
        type: MAKE_ACTIVE,
        currency,
    };
};