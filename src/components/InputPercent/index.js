import React, { Component } from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

class InputPercent extends Component {
  constructor(props) {
    super(props);
  }
  changeValue = (e) => {
    let val = e.target.value;
    if (val.indexOf(',') !== -1) {
      val = val.replace(/,/g, '.')
    }
    if (/^([0-9]{0,3}([.][0-9]{0,2})?|[.][0-9]{0,2})$/.test(val)) {
      this.props.onChange(val);
    }
  };
  render() {
    const { value } = this.props;
    return (
      <div>
        <FormGroup>
          <FormControl
            type="text"
            value={value}
            onChange={this.changeValue}
          />
        </FormGroup>
      </div>
    );
  }
}

InputPercent.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

InputPercent.defaultProps = {
  value: 0,
};

export default InputPercent;
