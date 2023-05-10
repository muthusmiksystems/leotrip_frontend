import { FLIGHTRETURNINFO } from "../constants";

const loadFlightReturnInfo = (flight) => ({
  type: FLIGHTRETURNINFO.LOAD,
  flight,
});

const setFlightReturnInfo = (flight) => ({
  type: FLIGHTRETURNINFO.LOAD_SUCCESS,
  flight,
});

const setError = (error) => ({
  type: FLIGHTRETURNINFO.LOAD_FAIL,
  error,
});

export { loadFlightReturnInfo, setFlightReturnInfo, setError };
