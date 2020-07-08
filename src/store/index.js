import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

const initialState = JSON.parse(localStorage.getItem("reddit-app-state"))
const store = createStore(
    reducers, 
    initialState ? initialState:{},
    compose(applyMiddleware(thunk)),
)

const historial = []
store.subscribe(()=> {
    historial.push(store.getState())
    localStorage.setItem("reddit-app-state", JSON.stringify(store.getState()))
})

export default store