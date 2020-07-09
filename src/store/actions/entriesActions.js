import {
    FETCH_ENTRIES,
    DISMISS_POST,
    DISMISS_ALL_POSTS,
    RESTORE_APP,
    READ_POST
} from './types'

const postsPerRequest = 10

const filterOnlyNeededFields = (data)=>{
    const posts = data?.data?.children ?  data.data.children.map(post => ({
        id: post.data.id,
        created_utc: post.data.created_utc,
        title: post.data.title,
        author: post.data.author,
        thumbnail: post.data.thumbnail,
        num_comments: post.data.num_comments,
        preview: post.data.preview,
        read: false
    }))  : []
    return posts
}

export const fetchEntries =  (after) =>  async dispatch =>{
   const res = await fetch(`https://www.reddit.com/best.json?limit=${postsPerRequest}${after? `&after=${after}`:''}`)
   const data = await res.json()
   const posts = filterOnlyNeededFields(data)
   dispatch({type: FETCH_ENTRIES, payload: {list: posts, after: data?.data?.after} })
}

export const dismissPost =  (id) =>  async dispatch =>{
    dispatch({type: DISMISS_POST, payload: id })
}

export const dismissAll =  () =>  async dispatch =>{
    dispatch({type: DISMISS_ALL_POSTS, payload: {} })
}

export const restore =  () =>  async dispatch =>{
    const res = await fetch(`https://www.reddit.com/best.json?limit=${postsPerRequest}`)
    const data = await res.json()
    const posts = filterOnlyNeededFields(data)
    dispatch({type: RESTORE_APP, payload: {list: posts, after: data?.data?.after }})
}

export const readPost = (id) =>  async dispatch =>{
    dispatch({type: READ_POST, payload: id })
}