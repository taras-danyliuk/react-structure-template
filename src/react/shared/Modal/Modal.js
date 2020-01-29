import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import { closeModal } from "../../../redux/modal/modalActions";


class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    content: PropTypes.any,
    styles: PropTypes.object,
    close: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.modalTarget = document.getElementById("modal");
    this.el = document.createElement("div");
  }

  componentDidMount() {
    this.modalTarget.appendChild(this.el);
  }

  componentWillUnmount() {
    this.el.removeEventListener("click", this.props.close);
    this.modalTarget.removeChild(this.el);
  }

  render() {
    const { isOpen, styles, content, close } = this.props;

    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <div className="modal-background" onClick={close}>
        <div className="modal-block" style={styles}>
          {content}
        </div>
      </div>,
      this.el,
    );
  }
}

export default connect(
  state => state.modal,
  dispatch => ({ close: bindActionCreators(closeModal, dispatch) })
)(Modal);

