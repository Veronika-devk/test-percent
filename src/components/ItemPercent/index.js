import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import Slider from '../Slider';
import InputPercent from '../InputPercent';

class ItemPercent extends Component {
  constructor(props) {
    super(props);
  }
  changePercent = (value) => {
    this.props.onChange(value);
  };
  render() {
    const { name, percent } = this.props;
    return (
      <Row className="ItemPercent">
        <Col xs={2} sm={2} md={2}>{name}</Col>
        <Col xs={7} sm={7} md={7}>
          <Slider
            value={+percent}
            onChange={this.changePercent}
          />
        </Col>
        <Col xs={3} sm={3} md={3}>
          <InputPercent
            onChange={this.changePercent}
            value={`${percent}`}
          />
        </Col>
      </Row>
    );
  }
}

ItemPercent.defaultProps = {
  percent: 0,
  name: ''
};

export default ItemPercent;
