import Dialogs from './Dialogs';
import { sendNewMessage } from '../../redux/reducers/dialogsReducer';
import { connect } from 'react-redux';
import { withAuthForComponentWrapper } from '../../hoc/authRedirect';
import { compose } from 'redux';

// export default function DialogsContainer() {

//   return <StoreContext.Consumer>
//     {
//       store => {
//         let {usersData, messagesData, newMessage} = store.getState().dialogsPage;
  
//         const sendMessage = () => {
        
//           store.dispatch(sendMessageCreator())
//         }

//         const updateMessage = (text) => {
//           store.dispatch(updateMessageActionCreator(text))
//         }
  
//         return (
//           <Dialogs
//             sendMessage={sendMessage} 
//             updateMessage={updateMessage} 
//             usersData={usersData} 
//             messagesData={messagesData} 
//             newMessage={newMessage}
//           />
//         )
//       }
//     }
//   </StoreContext.Consumer>
// }

const mapStateToProps = (state) => {
  return {
    usersData: state.dialogsPage.usersData,
    messagesData: state.dialogsPage.messagesData,
    // newMessage: state.dialogsPage.newMessage,
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     sendMessage: () => {  
//       dispatch(sendMessageCreator())
//     },
//     updateMessage: (text) => {
//       dispatch(updateMessageActionCreator(text))
//     }
//   }
// }

export default compose (
  connect(mapStateToProps, {sendNewMessage}),
  withAuthForComponentWrapper
) (Dialogs)

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (withAuthForComponentWrapper(Dialogs))

// export default DialogsContainer