import ActionType from "./action";

const initState = {
  count : 0
}

function Reducer(state,action){
  switch (action.type) {
      case ActionType.Increase:
          console.log(action);
          const result = {...state,count:state.count+ action.payload.num || 1}
          return result
      case ActionType.Decrease:
          return {...state,count: state.count -1 }
      case ActionType.Init:
          return {...state,count: state.count -1 }
      case ActionType.LoginSuccess:
        const { payload } = action
          return {
            ...state,
            ...payload,
          }
      default:
          return {...initState}
  }
}

export default Reducer