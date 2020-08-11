import * as actionTypes from "../actions/actionTypes";

const initialState = {
  locations: [],
  location: {},
  highline: [],
  highlineId: "",
  locationId: "",
  redirect: false,
  message: null,
  imageUrl: "",
  suggestions: [],
  loading: false,
};

const setRandomImage = (state, action) => {
  const locations = action.data.filter(
    (location) => location.highlines.length > 0
  );
  const randomLocation =
    locations[Math.floor(Math.random() * locations.length)];
  const randomHighline =
    randomLocation.highlines[
      Math.floor(Math.random() * randomLocation.highlines.length)
    ];
  const url =
    randomHighline.imagesUrl[
      Math.floor(Math.random() * randomHighline.imagesUrl.length)
    ];
  return {
    ...state,
    imageUrl: url,
  };
};

const filterHighline = (state, action) => {
  const highlineArray = state.locations
    .filter((location) => location._id === state.locationId)
    .map((location) => {
      let newHighline = Object.assign({}, location);
      newHighline.highlines = newHighline.highlines.filter(
        (highline) => highline._id === state.highlineId
      );
      return newHighline;
    });
  return {
    ...state,
    highline: highlineArray,
    redirect: highlineArray == null || highlineArray.length <= 0,
    locationId: null,
    highlineId: null,
  };
};
const onSearch = (state, action) => {
  return {
    ...state,
    locations: [action.location],
  };
};
const setHighline = (state, action) => {
  return {
    ...state,
    highline: [action.highline],
    loading: false,
    highlineId: action.highline._id,
  };
};

const sugestLocationName = (state, action) => {
  return {
    ...state,
    suggestions: [...action.suggestions],
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
    redirect: false,
    locationId: null,
    highlineId: null,
    message: null,
  };
};
const setLocation = (state, action) => {
  return {
    ...state,
    location: { ...action.location },
    locationId: action.location._id,
    message: null,
    loading: false,
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
const redirect = (state, action) => {
  return {
    ...state,
    redirect: !state.redirect,
  };
};
const notHiglinesFound = (state, action) => {
  return {
    ...state,
    message: action.message,
  };
};
const onInitHigline = (state, action) => {
  return {
    ...state,
    highline: [],
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
    case actionTypes.FILTER_HIGHLINE:
      return filterHighline(state, action);
    case actionTypes.POST_HIGHLINE_FAILED:
      return postHighlineFailed(state, action);
    case actionTypes.SET_HIGHLINE:
      return setHighline(state, action);
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
    case actionTypes.SET_REDIRECT:
      return redirect(state, action);
    case actionTypes.RESET_HIGHLINE:
      return onInitHigline(state, action);
    case actionTypes.NOT_HIGHLINES:
      return notHiglinesFound(state, action);
    case actionTypes.ON_SEARCH:
      return onSearch(state, action);
    default:
      return state;
  }
};

export default reducer;
