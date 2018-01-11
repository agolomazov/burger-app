import React, { Fragment, Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null };

      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: false });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    componentDidCatch(error) {
      this.setState({
        error: error
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          <Modal
            show={this.state.error}
            backdropOpacity="0.75"
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default WithErrorHandler;
