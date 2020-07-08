import {
    FETCH_ENTRIES,
    DISMISS_POST,
    DISMISS_ALL_POSTS
} from './types'

const postsPerRequest = 10


export const fetchEntries =  (after) =>  async dispatch =>{
   const res = await fetch(`https://www.reddit.com/best.json?limit=${postsPerRequest}${after? `&after=${after}`:''}`)
   const data = await res.json()
   dispatch({type: FETCH_ENTRIES, payload: {list: data?.data?.children || [], after: data?.data?.after } })
}

export const dismissPost =  (id) =>  async dispatch =>{
    dispatch({type: DISMISS_POST, payload: id })
}

export const dismissAll =  () =>  async dispatch =>{
    dispatch({type: DISMISS_ALL_POSTS, payload: {} })
}

