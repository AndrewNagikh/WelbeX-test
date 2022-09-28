import { types } from './types';

export const setData = (data) => ({type: types.GET_DATA, payload: data})
export const filterAct = (inputs) => ({type: types.FILTER, payload: inputs})