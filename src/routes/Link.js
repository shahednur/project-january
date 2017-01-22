//@flow

import React from 'react';
import R from 'ramda';
import history from './history';
import routes from './';

const isModifiedEvent = () => false;
const isLeftClickEvent = () => true;

type routesNamesT = $Keys<typeof routes>;

type Props = {| search?: string, children?: any |};

const substituteParams = (pathName, params) => {
  let finalPathName = pathName;
  R.forEach(([ paramName, value ]) => {
    finalPathName = finalPathName
      .split(':' + paramName)
      .join(value);
  })(R.toPairs(params));
  return finalPathName;
};

export default (to: routesNamesT, params: any) =>
  class Link extends React.Component {
    props: Props;

    render() {
      const pathname = routes[to].path;

      return (
        <a
          style={{ cursor: 'pointer' }}
          onClick={event => {
              if (
                event.defaultPrevented ||
                  isModifiedEvent(event) ||
                  !isLeftClickEvent(event)
              ) {
                return;
              }

              event.preventDefault();

              history.push(
                substituteParams(pathname, params),
              );
            }}
        >
          {this.props.children}
        </a>
      );
    }
  };
