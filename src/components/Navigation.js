//@flow

import React from 'react'
import Link from '../Link'

export default ()=><div>
  <Link to='home'>
    home
  </Link>
  <Link to='users'>
    users
  </Link>
  <Link to='userDetails'
    params={{
      userid:'qwerty'
    }}
  >
    user qwerty
  </Link>
</div>
