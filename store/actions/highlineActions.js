import * as actionTypes from "./actionTypes";
import axios from "../../utilities/axios";
export const filterHighlines = () => {
  return {
    type: actionTypes.FILTER_HIGHLINES,
  };
};
export const setHighlineId = (highlineId) => {
  return {
    type: actionTypes.SET_HIGHLINE_ID,
    highlineId: highlineId,
  };
};
export const setLocation = (location) => {
  return {
    type: actionTypes.SET_LOCATION,
    location: location,
  };
};
export const clearLocation = () => {
  return {
    type: actionTypes.CLEAR_LOCATION,
  };
};
export const setLocationId = (locationId) => {
  return {
    type: actionTypes.SET_LOCATION_ID,
    locationId: locationId,
  };
};
export const setHighlines = (data) => {
  return {
    type: actionTypes.SET_HIGHLINES,
    locations: data,
  };
};
export const suggestLocationName = (data) => {
  return {
    type: actionTypes.FETCH_LOCATION_NAME,
    suggestions: data,
  };
};
export const setRandomImage = (data) => {
  return {
    type: actionTypes.SET_RANDOM_IMAGE,
    data: data,
  };
};
export const postLocationFailed = (error) => {
  return {
    type: actionTypes.POST_LOCATION_FAILED,
    message: error,
  };
};
export const onSearch = (search) => {
  return {
    type: actionTypes.ON_SEARCH,
    search: search,
  };
};
export const postHighlineFailed = (error) => {
  return {
    type: actionTypes.POST_HIGHLINE_FAILED,
    message: error,
  };
};
export const notHighlines = (message) => {
  return {
    type: actionTypes.NOT_HIGHLINES,
    message: message,
  };
};
export const startLoading = () => {
  return {
    type: actionTypes.START_LOADING,
  };
};
export const stopLoading = () => {
  return {
    type: actionTypes.STOP_LOADING,
  };
};
export const fetchHighlinesFailed = (error) => {
  return {
    type: actionTypes.FETCH_HIGHLINES_FAILED,
    message: error,
  };
};
export const uploadImageFailed = (error) => {
  return {
    type: actionTypes.UPLOAD_IMAGE_FAILED,
    message: error,
  };
};
export const cleanMessage = () => {
  return {
    type: actionTypes.CLEAN_MESSAGE,
  };
};

export const postHighline = (highlineData) => {
  deleteProperties(highlineData);
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .post("/highline", highlineData)
      .then((response) => {
        dispatch(setHighline(response.data.data));
      })
      .catch((err) => {
        const error =
          err.response && err.response.data
            ? err.response.data.error
            : err.message;
        dispatch(postHighlineFailed(error));
      });
  };
};

export const postLocation = (locationData) => {
  delete locationData.longitude;
  delete locationData.latitude;
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .post("/location", locationData)
      .then((response) => {
        dispatch(setLocation(response.data.data));
      })
      .catch((err) => {
        const error =
        err.response && err.response.data
          ? err.response.data.error
          : err.message;
        dispatch(postLocationFailed(error));
      });
  };
};

export const uploadImages = (formData, highlineId) => {
  const url = `/highline/image/${highlineId}`;
  return (dispatch) => {
    dispatch(startLoading());
    axios
      .put(url, formData)
      .then((response) => {
        dispatch(setHighline(response.data.data));
      //  dispatch(redirect());
      })
      .catch((err) => {
        const error =
        err.response && err.response.data
          ? err.response.data.error
          : err.message;
        dispatch(uploadImageFailed(error));
       // setTimeout(() => dispatch(redirect()), 2000);
      });
  };
};
export const initHighlines = (coords) => {
  return async (dispatch) => {
    try {
      dispatch(startLoading());
      const response = await axios.get(`/location/${coords.lng}/${coords.lat}`);
      dispatch(setHighlines(response.data.data));
      dispatch(stopLoading());
    } catch (err) {
      // const error = err.response.data.error || err.message;
      dispatch(fetchHighlinesFailed(err));
    }
  };
};
export const getLocationName = (value) => {
  return (dispatch) => {
    axios
      .get(value ? `/location/name/${value}` : "/location/name")
      .then((response) => {
        dispatch(suggestLocationName(response.data.data));
      })
      .catch((err) => {
        const error = err.response.data.error || err.message;
        dispatch(fetchHighlinesFailed(error));
      });
  };
};
export const onSearchLocation = (value) => {
  return (dispatch) => {
    axios
      .get(`/search/${value}`)
      .then((response) => {
        dispatch(onSearch(response.data.data));
      })
      .catch((err) => {
        const error = err.response.data.error || err.message;
        dispatch(fetchHighlinesFailed(error));
      });
  };
};
const deleteProperties = (highlineData) => {
  delete highlineData.rightAnchorMain;
  delete highlineData.rightAnchorBackUp;
  delete highlineData.rhsMainNumberAnchors;
  delete highlineData.rhsBackupNumberAnchors;
  delete highlineData.rshAnchorSize;
  delete highlineData.leftAnchorMain;
  delete highlineData.leftAnchorBackUp;
  delete highlineData.lhsMainNumberAnchors;
  delete highlineData.lhsBackupNumberAnchors;
  delete highlineData.lshAnchorSize;
};
