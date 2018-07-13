import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';

import ItemPercent from '../../components/ItemPercent';

import { getData } from '../../redux/actions/percent';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    this.props.getData();
  }
  componentWillReceiveProps(newProps) {
    const {
      percent: {
        data,
      },
    } = newProps;
    this.checkValidData(data);
  }
  checkValidData = (data) => {
    let newData = [].concat(data);
    newData.forEach((item) => {
      item.percent = item.percent < 0 ? 0 : +(+item.percent.toFixed(2));
    });
    if (newData.length > 1) {
      let sum = 0;
      newData.forEach((item) => {
        sum += item.percent;
      });
      if (sum === 0) { // корректировка сумм
        newData[0].percent = 100;
      } else if (sum > 100) {
        let diff = +((sum - 100).toFixed(2));
        newData.sort(function(a, b){
          return b.percent - a.percent;
        });
        for (let i = 0; i < newData.length; i += 1) {
          const maxItem = newData[i];
          let diffCur = +maxItem.percent >= +diff ? diff : maxItem.percent;
          maxItem.percent = +maxItem.percent - +diffCur;
          maxItem.percent = +(+maxItem.percent.toFixed(2));
          diff = +diff - +diffCur;
          if (diff === 0) {
            break;
          }
        }
      } else if (sum < 100) {
        let diff = +((100 - sum).toFixed(2));
        newData.sort(function(a, b){
          return a.percent - b.percent;
        });
        for (let i = 0; i < newData.length; i += 1) {
          const minItem = newData[i];
          const countDif = +((100 - +minItem.percent).toFixed(2));
          let diffCur = countDif >= +diff ? diff : countDif;
          minItem.percent = +minItem.percent + +diffCur;
          minItem.percent = +(+minItem.percent.toFixed(2));
          diff = +diff - +diffCur;
          if (diff === 0) {
            break;
          }
        }
      }
      return this.setState({
        data: newData,
      });
    } else if (data[0].percent > 100) {
      data[0].percent = 100;
    }
    this.setState({
      data,
    });
  };
  refreshData = () => {
    this.props.getData();
  };
  onChangeData = (index, value) => {
    const data = [].concat(this.state.data);
    const oldVal = data[index].percent;
    if (data.length > 1) {
      if (oldVal > value) { // если уменьшилось значение
        let diff = +((+oldVal - +value).toFixed(2));
        let dataNoCur = [].concat(data);
        dataNoCur.splice(index, 1);
        let min = dataNoCur[0].percent; // минимальное значение в массиве
        for (let i = 1, length = dataNoCur.length; i < length; i += 1) {
          if (dataNoCur[i].percent < min) min = dataNoCur[i].percent;
        }
        let indexMin = data.findIndex((item, ind) => {
          return index !== ind && item.percent === min;
        });
        const minItem = data[indexMin];
        minItem.percent = +minItem.percent + +diff;
        minItem.percent = +(+minItem.percent.toFixed(2));
      } else if (oldVal < value) { // если увеличилось значение
        let diff = +((+value - +oldVal).toFixed(2));
        let dataNoCur = [].concat(data);
        dataNoCur.splice(index, 1);
        let max = dataNoCur[0].percent; // максимальное значение в массиве
        for (let i = 1, length = dataNoCur.length; i < length; i += 1) {
          if (dataNoCur[i].percent > max) max = dataNoCur[i].percent;
        }
        let indexMax = data.findIndex((item, ind) => {
          return index !== ind && item.percent === max;
        });

        const maxItem = data[indexMax];
        maxItem.percent = +maxItem.percent - +diff;
        maxItem.percent = +(+maxItem.percent.toFixed(2));
      }
    } else if (value > 100) {
      value = 100;
    }
    data[index].percent = value;
    this.setState({
      data,
    })
  };
  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <div className="clearfix">
          <Button
            bsStyle="primary"
            onClick={this.refreshData}
            className="float-lg-right float-md-right float-sm-right">
            Обновить данные
          </Button>
        </div>
        <Row>
          <Col xs={9} sm={9} md={9}>
            {
              data ? data.map((item, i) => <ItemPercent key={i} {...item} onChange={val => this.onChangeData(i, val)} />)
                : 'Нет данных'
            }
          </Col>
          <Col xs={3} sm={3} md={3} className="result-block">
            Результат:
            {
              data ? data.map((item, i) => (
                  <Row key={i}>
                    <Col xs={8} sm={8} md={8}>{item.name}</Col>
                    <Col xs={4} sm={4} md={4}>{item.percent || '0'}%</Col>
                  </Row>
                ))
                : 'Нет данных'
            }
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  percent: state.percent,
});

const mapDispatchToProps = dispatch => ({
  getData: () => {
    dispatch(getData());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
