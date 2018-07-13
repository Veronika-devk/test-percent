import React, { Component } from 'react';
import RCSlider from 'rc-slider';
import PropTypes from 'prop-types';

class Slider extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { value, onChange } = this.props;
    return (
      <div className="Slider">
        <RCSlider
          min={0}
          max={100}
          value={value}
          onChange={onChange}
          step={1}
        />
      </div>
    );
  }
}

Slider.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
};

Slider.defaultProps = {
  value: 0,
};

export default Slider;
