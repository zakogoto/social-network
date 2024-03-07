// eslint-disable-next-line
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { required } from '../../../../ui/validation/validators'

const StatusForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} validate >
            <Field component={'input'} name='status' value={props.defaultValue} validate={[required]} />
        </form>
    )
}

const StatusReduxForm = reduxForm ({form: 'status'}) (StatusForm)

export default class ProfileStatus extends Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }
    deactivateEditMode = () => {
        this.setState({editMode: false})
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({status: e.currentTarget.value})
    }

    componentDidUpdate(prevProps) {
        if(prevProps.status !== this.props.status) {
            this.setState({status: this.props.status})
        }
    }

    onSubmit = ({status}) => {
        this.props.updateUserStatus(status)
    }

  render() {
    return (
        <div>
            {!this.state.editMode
                ? <div onDoubleClick={this.activateEditMode}>{this.props.status ? this.props.status : 'no status'}</div>
                // : <input onChange={this.onStatusChange} autoFocus onBlur={this.deactivateEditMode} defaultValue={this.state.status}/>
                : <StatusReduxForm onSubmit={this.onSubmit} defaultValue={this.state.status}/>
            }
        </div>
    )
  }
}
