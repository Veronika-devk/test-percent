import { fork } from 'redux-saga/effects';
import percentSaga from './percent';

export default function* rootSaga() {
  yield fork(percentSaga);
}
