import Dialogs from './Dialogs';
import { sendNewMessage } from '../../redux/reducers/dialogsReducer';
import { connect } from 'react-redux';
import { withAuthForComponentWrapper } from '../../hoc/authRedirect';
import { compose } from 'redux';

const mapStateToProps = (state) => {
  return {
    usersData: state.dialogsPage.usersData,
    messagesData: state.dialogsPage.messagesData,
  }
}

export default compose (
  connect(mapStateToProps, {sendNewMessage}),
  withAuthForComponentWrapper
) (Dialogs)