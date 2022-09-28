import { types } from './types';

const initState = {
    isLoad: false,
    data:[],
};

export const reducers = (state = initState, action) => {
  switch (action.type) {
    case types.GET_DATA:
        return {...state, data: action.payload, isLoad:true }
        case types.FILTER:
            if (action.payload.column === 'name' && action.payload.condition === 'equal') {
                const filter = state.data.filter((dataItem) => dataItem.name === action.payload.value)
                return {...state, data: filter}
            }
            if (action.payload.column === 'quantity' && action.payload.condition === 'equal') {
                const filter = state.data.filter((dataItem) => dataItem.quantity === Number(action.payload.value))
                return {...state, data: filter}
            }
            if (action.payload.column === 'distance' && action.payload.condition === 'equal') {
                const filter = state.data.filter((dataItem) => dataItem.distance === Number(action.payload.value))
                return {...state, data: filter}
            }
            if (action.payload.column === 'name' && action.payload.condition === 'include') {
                const filter = state.data.filter((dataItem) => dataItem.name.includes(action.payload.value))
                return {...state, data: filter}
            }
            if (action.payload.column === 'quantity' && action.payload.condition === 'include') {
                const filter = state.data.filter((dataItem) => dataItem.quantity.toString().includes(action.payload.value))
                return {...state, data: filter}
            }
            if (action.payload.column === 'distance' && action.payload.condition === 'include') {
                const filter = state.data.filter((dataItem) => dataItem.distance.toString().includes(action.payload.value))
                return {...state, data: filter}
            }
            if (action.payload.column === 'quantity' && action.payload.condition === 'more') {
                const filter = state.data.filter((dataItem) => dataItem.quantity > Number(action.payload.value))
                return {...state, data: filter}
            }
            if (action.payload.column === 'distance' && action.payload.condition === 'more') {
                const filter = state.data.filter((dataItem) => dataItem.distance > Number(action.payload.value))
                return {...state, data: filter}
            }
            if (action.payload.column === 'quantity' && action.payload.condition === 'less') {
                const filter = state.data.filter((dataItem) => dataItem.quantity < Number(action.payload.value))
                return {...state, data: filter}
            }
            if (action.payload.column === 'distance' && action.payload.condition === 'less') {
                const filter = state.data.filter((dataItem) => dataItem.distance < Number(action.payload.value))
                return {...state, data: filter}
            }
            return state
    default:
      return state;
  }
};