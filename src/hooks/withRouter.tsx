import { ComponentType } from "react";
import {
    useLocation,
    useNavigate,
    useParams,
  } from "react-router-dom";

  export type RouterPropsType = {
    router: {
      location: any
      navigate: any
      params: any
    }
  }
const withRouter = <P extends {}> (Component: ComponentType<P & RouterPropsType>): ComponentType<P> => {
    const ComponentWithRouterProp: React.FC<P> = (props) => {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component {...props as P} router={{ location, navigate, params }}/>
      )
    }
  
    return ComponentWithRouterProp;
}

export default withRouter