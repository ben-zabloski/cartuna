import React, { ReactNode } from "react";

export interface RouterContextInterface {
  location: Location;
  pushState: (
    data: any,
    title: string,
    url?: string | null | undefined
  ) => void;
}

const defaultContext: RouterContextInterface = {
  location: window.location,
  pushState: (data: any, title: string, url?: string | null | undefined) => {},
};

export const RouterContext = React.createContext(defaultContext);

interface RouterProps {
  children: ReactNode;
}

class Router extends React.Component<
  {},
  {
    location: Location;
    pushState: (
      data: any,
      title: string,
      url?: string | null | undefined
    ) => void;
  }
> {
  constructor(props: RouterProps) {
    super(props);

    this.state = {
      location: window.location,
      pushState: this.pushState,
    };
  }

  componentDidMount() {
    window.addEventListener("popstate", this.popStateHandler);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.popStateHandler);
  }

  popStateHandler = (event: Event) => {
    console.log("omg popStateHandler:", window.location.pathname);
    this.setState({ location: window.location, pushState: this.pushState });
  };

  pushState = (data: any, title: string, url?: string | null | undefined) => {
    console.log("omg pushState:", url);
    window.history.pushState(data, title, url);

    this.setState({
      location: window.location,
      pushState: this.pushState,
    });
  };

  render() {
    return (
      <RouterContext.Provider value={this.state}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
