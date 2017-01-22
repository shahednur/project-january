//@flow

import React from 'react';
import history from './history';
import routes from './';

const isModifiedEvent = () => false;
const isLeftClickEvent = () => true;

type routesNamesT = $Keys<typeof routes>;

type Props = {|
  search?: string,
  children?: any,
|};

export default (to: routesNamesT, params:any) =>
  class Link extends React.Component {
    props: Props;

    render() {
      const pathname = routes[to].path;

      return (
        <a
          onClick={event => {
            if (
                event.defaultPrevented ||
              isModifiedEvent(event) ||
              !isLeftClickEvent(event)
            ) {
                return;
            }

            event.preventDefault();

            history.push(pathname);
          }}
        >
          {this.props.children}
        </a>
      );
    }
  };
