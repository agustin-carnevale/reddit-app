import redditAPI from '../../api/redditAPI'

import {
    FETCH_ENTRIES
} from './types'


export const fetchEntries =  () =>  async dispatch =>{
    const {data} = await redditAPI.get('/best.json?limit=10')
    dispatch({type: FETCH_ENTRIES, payload: data?.data?.children || [] })
}