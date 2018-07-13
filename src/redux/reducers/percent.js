import Types from '../constants/types';

const initialState = {
  data: null,
  loading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_DATA.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case Types.GET_DATA.SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      };
    case Types.GET_DATA.FAILURE:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default user;
