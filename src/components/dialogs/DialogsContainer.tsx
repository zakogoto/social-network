import Dialogs from './Dialogs';
import { getListOfAllDialogs, getAllMessagesWithUser, sendNewMessage } from '../../redux/reducers/dialogsReducer';
import { connect } from 'react-redux';
import { withAuthForComponentWrapper } from '../../hoc/authRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { DialogType, MessagesType } from '../../redux/types';
import withRouter, { RouterPropsType } from '../../hooks/withRouter';

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogs: state.dialogsPage.dialogs,
    messagesData: state.dialogsPage.messagesData,
    activeDialog: state.dialogsPage.activeDialog,
  }
}

type MapStateToPropsType = {
  dialogs: Array<DialogType>
  messagesData: Array<MessagesType>
  activeDialog: DialogType | null
}

type MapDispatchToPropsType = {
  sendNewMessage: (message: string, userId: number) => void
  getListOfAllDialogs: () => void
  getAllMessagesWithUser: (userId: number, user: DialogType) => void
}

export default compose<AppStateType & MapStateToPropsType & MapDispatchToPropsType & RouterPropsType> (
  connect(mapStateToProps, {sendNewMessage, getListOfAllDialogs, getAllMessagesWithUser}),
  withAuthForComponentWrapper,
  withRouter
) (Dialogs)