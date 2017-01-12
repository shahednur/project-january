//@flow

import React from 'react'
import history from './history'
import routes from './routes'

const isModifiedEvent = ()=>false
const isLeftClickEvent = ()=>false

type routesNamesT = $Keys<typeof routes>;

type Props = {|
  to:routesNamesT,
  params?:Object,
  search?:string,
  children?:any
|}

export default class Link extends React.Component {
  props:Props;

  render() {
    const to = this.props.to
    const pathname = routes[to].path;

    // const href = pathname + (to.search || '');
    //href={href}

    return <a
      onClick={(event)=>{
        if (event.defaultPrevented || isModifiedEvent(event) || !isLeftClickEvent(event)) {
            return
        }

        event.preventDefault()

        // It only makes sense for an application to have one history, so we can
        // make it global
        history.push(pathname)
      }}>
      {this.props.children}
    </a>
  }
}
