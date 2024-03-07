const initialState = {
    usersData: [
      {name: "Petya",id: 1,},
      {name: "Nastya",id: 2},
      {name: 'Nikita',id: 3}
    ],
    messagesData: [
      {name: 'Petya', message: 'Hello! How are you?', income: true},
      {name: 'You', message: 'Hallo! I fine', income: false},
      {name: 'Petya', message: 'Nice!', income: true},
      {name: 'You', message: 'Hallo! I fine', income: false},
      {name: 'Petya', message: 'Nice!', income: true},
      {name: 'You', message: 'Hallo! I fine', income: false},
      {name: 'Petya', message: 'Nice!', income: true},
    ]
}

export default function dialogsReducer (state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE: 
          return {
            ...state,
            messagesData: [...state.messagesData, {name: 'you', message: action.message, income: false}]
          }
        // case UPDATE_NEW_MESSAGE:
        //   return {...state, newMessage: action.message}
        default:
            return state
    }
}

const SEND_MESSAGE = 'SEND_MESSAGE'
// const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE'

export const sendMessage = (message) => {
    return {
      type: SEND_MESSAGE,
      message
    }
}
  
//   export const updateMessage = (text) => {
//     return {
//       type: UPDATE_NEW_MESSAGE,
//       message: text
//     }
// }




export const sendNewMessage = (message) => (dispatch) => {
  dispatch(sendMessage(message))
}