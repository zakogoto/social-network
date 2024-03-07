import React from "react"
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"

export const withAuthForComponentWrapper = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                if(this.props.router) {
                    if (this.props.router.location.pathname !== '/profile') {
                        return <Component {...this.props} />
                    }
                    return <Navigate to={'/login'}/>
                }
                return <Navigate to={'/login'}/>
            }
            return <Component {...this.props} />
        }
    }

    const MapStateToProps = (state) => {
        return {
            isAuth: state.auth.isAuth,
        }
    }

    let ConnectedRedirectComponent = connect(MapStateToProps) (RedirectComponent);

    return ConnectedRedirectComponent;
}