import React from 'react';
import {Link} from 'react-router';

import './app.less';

export default class extends React.Component {

  static displayName = 'App';

  render() {

    return (
      <div>
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/results">Results</Link>
        {this.props.children}
      </div>
    );

  }

}
