import React, { Component } from 'react';

import classes from './Order.module.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    const backdrop = this.props.show ? (
      <div className={classes.Backdrop} onClick={this.props.clicked} />
    ) : null;

    return (
      <React.Fragment>
        {backdrop}
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
