import { ThunkAction } from "redux-thunk";
import { DialogType, MessagesType } from "../types";
import { AppStateType } from "../redux-store";
import { DialogsAPI } from "../../api/api";

const initialState: InitialStateType = {
    dialogs: [],
    // messagesData: [
    //   {name: 'Petya', message: 'Hello! How are you?', income: true},
    //   {name: 'You', message: 'Hallo! I fine', income: false},
    //   {name: 'Petya', message: 'Nice!', income: true},
    //   {name: 'You', message: 'Hallo! I fine', income: false},
    //   {name: 'Petya', message: 'Nice!', income: true},
    //   {name: 'You', message: 'Hallo! I fine', income: false},
    //   {name: 'Petya', message: 'Nice!', income: true},
    // ]
    messagesData: [],
    newMessageBody: '',
    activeDialog: null
}

// export type UsersDataType = {
//   name: string,
//   id: number
// }

type InitialStateType = {
  dialogs: Array<DialogType>,
  messagesData: Array<MessagesType>
  newMessageBody: string
  activeDialog: DialogType | null
}

type GetAllDialogsType = {
  type: typeof GET_ALL_DIALOGS,
  dialogs: Array<DialogType>
}

type SetMessagesDataType = {
  type: typeof SET_MESSAGES_DATA
  messages: Array<MessagesType>
}

type SendMessageActionType = {
  type: typeof SEND_MESSAGE,
  message: string
}

type UpdateActiveDialogType = {
  type: typeof UPDATE_ACTIVE_DIALOG_ID,
  activeDialog: DialogType | null
}

type ActionsTypes = SendMessageActionType | GetAllDialogsType | UpdateActiveDialogType | SetMessagesDataType

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export default function dialogsReducer (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType {
    switch (action.type) {
      case GET_ALL_DIALOGS:
        return {
          ...state,
          dialogs: action.dialogs
        }
        case SEND_MESSAGE: 
          return {
            ...state,
            newMessageBody: action.message
          }
        case UPDATE_ACTIVE_DIALOG_ID:
          return {
            ...state,
            activeDialog: action.activeDialog
          }
        case SET_MESSAGES_DATA:
          return {
            ...state,
            messagesData: action.messages
          }
        // case UPDATE_NEW_MESSAGE:
        //   return {...state, newMessage: action.message}
        default:
            return state
    }
}

const GET_ALL_DIALOGS = 'GET_ALL_DIALOGS'
const SEND_MESSAGE = 'SEND_MESSAGE'
const UPDATE_ACTIVE_DIALOG_ID = 'UPDATE_ACTIVE_DIALOG_ID'
const SET_MESSAGES_DATA = 'SET_MESSAGES_DATA'
// const UPDATE_NEW_MESSAGE = 'UPDATE_NEW_MESSAGE'

const getAllDialogs = (dialogs: Array<DialogType>): GetAllDialogsType => {
  return {
    type: "GET_ALL_DIALOGS",
    dialogs
  }
}

export const updateActiveDialog = (dialog: DialogType | null): UpdateActiveDialogType => {
  return {
    type: UPDATE_ACTIVE_DIALOG_ID,
    activeDialog: dialog
  }
}

export const sendMessage = (message: string): SendMessageActionType => {
    return {
      type: SEND_MESSAGE,
      message
    }
}

const setMessagesData = (messages: Array<MessagesType>): SetMessagesDataType => {
  return {
    type: SET_MESSAGES_DATA,
    messages
  }
}

export const getListOfAllDialogs = (): ThunkType => async (dispatch) => {
  const dialogs = await DialogsAPI.getAllDialogs()
  dispatch(getAllDialogs(dialogs))

}

export const getAllMessagesWithUser = (userId: number, user: DialogType): ThunkType => async (dispatch) => {
  const messages = await DialogsAPI.getListOfMessages(userId)
  dispatch(updateActiveDialog(user))
  dispatch(setMessagesData(messages.items))
  // console.log(messages)
}


export const sendNewMessage = (message: string, userId: number): ThunkType => (dispatch, getState) => {
  const user = getState().dialogsPage.activeDialog
  DialogsAPI.SendMessage(userId, message)
  if (user) {
    dispatch(getAllMessagesWithUser(userId, user))
  }
}