import { put, fork, takeEvery } from 'redux-saga/effects';

import Types from '../constants/types';

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function* getPercentData() {
  const dataCount = randomInteger(1, 5);
  const data = [];
  for (let i = 0; i < dataCount; i += 1) { // здесь можно выставлять разные данные у percent
    data.push({
      name: `Item${i + 1}`,
      percent: 0,
    });
  }
  yield put({ type: Types.GET_DATA.SUCCESS, data });
}

function* watchPercent() {
  yield takeEvery(Types.GET_DATA.REQUEST, getPercentData);
}

export default function* percentSaga() {
  yield fork(watchPercent);
}
