import { BUSINFO } from "../constants";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  //  console.log("iam in bussss reducer",action)
  switch (action.type) {
    case BUSINFO.LOAD:
      return {
        ...state,
        loading: true,
      };
    case BUSINFO.LOAD_SUCCESS:
      return {
        loading: false,
        data: action.bus,
        error: "",
      };
    case BUSINFO.LOAD_FAIL:
      return {
        loading: false,
        data: [],
        error: action.error,
      };
    default:
      return state;
  }
};
export default reducer;
