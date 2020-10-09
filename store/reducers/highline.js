import * as actionTypes from "../actions/actionTypes";

const initialState = {
  locations: [],
  location: {},
  highlines: [],
  highlineId: "",
  locationId: "",
  message: null,
  imageUrl: "",
  search: null,
  loading: false,
  suggestions:[]
};
const filterHighlines = (state, action) => {
  const highlines = state.locations.reduce((highlines, location, index) => {
    let obj = null;
    for (let i = 0; i < location.highlines.length; i++) {
      obj = {
        locationId: location._id,
        locationName: location.name,
        dist: location.dist.calculated,
        highline: { ...location.highlines[i] },
      };
      highlines.push(obj);
    }
    return highlines;
  }, []);
  return {
    ...state,
    highlines: [...highlines],
  };
};
const setLocation = (state, action) => {
  return {
    ...state,
    location: { ...action.location },
    message: null,
    loading: false,
  };
};
const sugestLocationName = (state, action) => {
  return {
    ...state,
    suggestions: [...action.suggestions],
  };
};
const onSearch = (state, action) => {
  return {
    ...state,
    search: { ...action.search },
  };
};

const setHighlineId = (state, action) => {
  return {
    ...state,
    highlineId: action.highlineId,
  };
};
const setLocationId = (state, action) => {
  return {
    ...state,
    locationId: action.locationId,
  };
};
const setHighlines = (state, action) => {
  return {
    ...state,
    locations: [...action.locations],
    locationId: null,
    highlineId: null,
    message: null,
  };
};

const clearLocation = (state, action) => {
  return {
    ...state,
    locationId: null,
  };
};
const cleanMessage = (state, action) => {
  return {
    ...state,
    message: null,
    loading: false,
  };
};
const failedFetchHighlines = (state, action) => {
  return {
    ...state,
    message: action.message,
    loading: false,
  };
};

const postLacationFailed = (state, action) => {
  return {
    ...state,
    message: action.message,
  };
};

const postHighlineFailed = (state, action) => {
  return {
    ...state,
    message: action.message,
  };
};
const uploadImageFailed = (state, action) => {
  return {
    ...state,
    message: action.message,
  };
};
const startLoading = (state, action) => {
  return {
    ...state,
    loading: true,
  };
};
const stopLoading = (state, action) => {
  return {
    ...state,
    loading: false,
  };
};

const notHiglinesFound = (state, action) => {
  return {
    ...state,
    message: action.message,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_HIGHLINE_ID:
      return setHighlineId(state, action);
    case actionTypes.SET_LOCATION_ID:
      return setLocationId(state, action);
    case actionTypes.SET_HIGHLINES:
      return setHighlines(state, action);
    case actionTypes.FETCH_HIGHLINES_FAILED:
      return failedFetchHighlines(state, action);
    case actionTypes.FILTER_HIGHLINES:
      return filterHighlines(state, action);
    case actionTypes.POST_HIGHLINE_FAILED:
      return postHighlineFailed(state, action);
    case actionTypes.SET_RANDOM_IMAGE:
      return setRandomImage(state, action);
    case actionTypes.FETCH_LOCATION_NAME:
      return sugestLocationName(state, action);
    case actionTypes.SET_LOCATION:
      return setLocation(state, action);
    case actionTypes.CLEAR_LOCATION:
      return clearLocation(state, action);
    case actionTypes.CLEAN_MESSAGE:
      return cleanMessage(state, action);
    case actionTypes.POST_LOCATION_FAILED:
      return postLacationFailed(state, action);
    case actionTypes.START_LOADING:
      return startLoading(state, action);
    case actionTypes.STOP_LOADING:
      return stopLoading(state, action);
    case actionTypes.UPLOAD_IMAGE_FAILED:
      return uploadImageFailed(state, action);
    case actionTypes.NOT_HIGHLINES:
      return notHiglinesFound(state, action);
    case actionTypes.ON_SEARCH:
      return onSearch(state, action);
    default:
      return state;
  }
};

export default reducer;
