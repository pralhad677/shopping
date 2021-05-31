import React from 'react'
interface user {
  email:string,
  password: string,
  auth?:boolean
}

export interface StateType{
  data:user[]
 isLoading?: boolean;
 error?: boolean;
}

type ReducerType<S, A> = (State: S, action: A) => S;

export type Action =
 | { type: 'success', data: StateType }
 | { type: 'failure', data: StateType };

let Reducer:ReducerType<StateType,Action>=(state:StateType,action:Action):StateType=>{
switch(action.type){
  case 'failure':
    console.log('failure')
        return state
  case 'success':
    console.log('action',action)
    return {
      ...state,
      data:state.data.concat(action.data.data)
    }
  default:
    console.log('nothing')
            return state
}
}
let initialState:StateType = {
    data:[{
      email:'jacob',
      password:''
    }],
    isLoading: true,
    error: false
}

export function Redux() {
    let [state,dispatch] = React.useReducer(Reducer,initialState)
  console.log(state)
  console.log(state.data)
    return {
      state,
      dispatch
    }
}
