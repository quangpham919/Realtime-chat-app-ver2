 export default (state,action) => {
    switch(action.type) {
        case "GET_ROOMS":
            return{
            ...state,
            rooms:action.payload,
            loading:false
            }

        case "GET_CHATS":
            return{
                ...state,
                chats:action.payload,
                loading:false
            }
        
        case "ADD_CHAT":
            return {
            ...state,
            chats:[...state.chats,action.payload] 
        }
                
        case "ROOM_ERROR":
            return{
                ...state,   
                error:action.payload
            }
        case "ADD_CHAT_ERROR": {
                return {
                    ...state,
                    error:action.payload
                }
        }
        case "CHAT_ERROR" :
            return {
                ...state,
                error:action.payload
            }
        
        default: 
            return state
    }
}