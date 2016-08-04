import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class Header extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="d01 radio"
          meta={[
            { name: 'description', content: 'district radio' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' }
          ]}
        />
        {this.props.children}
      </div>
    );
  }
}