import {SET,MAKE_ACTIVE} from "../actions/currencyActionTypes";

const CurrencyReducer = (state = [],action) => {
    switch (action.type){
        case SET:
            return action.currencies
        case MAKE_ACTIVE:
            state = state.map((item) =>
                item.label ===  action.currency.label ?
                    {
                        ...item,
                        active: true
                    } :
                    {
                        ...item,
                        active: false
                    }
            );
            return state
        default:
            return state
    }
};
export {CurrencyReducer};