import { Alert, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useReducer, useCallback, useRef, useEffect } from "react";
import InputApp from "../UI/Input";
import {
  Button,
  Divider,
  StyleService,
  Text,
  useStyleSheet,
  Autocomplete,
  AutocompleteItem,
} from "@ui-kitten/components";
import { TopNav } from "../UI/TopNav";
import { KeyboardAvoidingView } from "../UI/KeyboardAvoidingView";
import { formReducer, FORM_INPUT_UPDATE } from "../../store/reducers/form";
import * as actions from "../../store/actions/index";

const LocationFrom = (props) => {
  const { navigation } = props;
  const styles = useStyleSheet(themedStyles);
  const dispatch = useDispatch();
  const descriptionRef = useRef(null);
  const longitudeRef = useRef(null);
  const [data, setData] = React.useState({});
  const [value, setValue] = React.useState("");
  const locations = useSelector((state) => state.data.suggestions);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: value,
      description: data.description ? data.description : "",
      approach: data.approach ? data.approach : "",
      latitude: data.location ? data.location.coordinates[1] : "",
      longitude: data.location ? data.location.coordinates[1] : "",
    },
    inputValidities: {
      name: !!data.locationName,
      description: !!data.description,
      approach: !!data.approach,
      latitude: !!data.location,
      longitude: !!data.location,
    },
    formIsValid: !Object.keys(data).length === 0,
  });
  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );
  const onSelect = (index) => {
    setData(locations[index]);
    setValue(locations[index].name);
    inputChangeHandler("name", locations[index].name, true);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(actions.getLocationName(value));
    }, 500);
    return () => clearTimeout(timer);
  }, [value, dispatch]);
  useEffect(() => {
    dispatch(actions.getLocationName());
  }, []);
  const renderOption = (item, index) => (
    <AutocompleteItem textStyle={styles.text} key={index} title={item.name} />
  );
  const clearFields = () => {
    setData({});
    dispatch(actions.getLocationName());
    inputChangeHandler("name", value, true);
  };
  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    if (data._id) {
      // TODO: dispatch() update
      dispatch(actions.setLocation(data));
      navigation.navigate("HighlineForm");
    } else {
      dispatch(
        actions.postLocation({
          ...formState.inputValues,
          location: {
            type: "Point",
            coordinates: [
              parseFloat(formState.inputValues.longitude),
              parseFloat(formState.inputValues.latitude),
            ],
          },
        })
      );
    }
  }, [dispatch, data, formState]);
  const textStyle = (value) => (
    <Text style={styles.text} category="s1">
      {value}
    </Text>
  );
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TopNav navigation={navigation} tittle="Location Form" />
      <View style={[styles.container, styles.formContainer]}>
        <Autocomplete
          label={textStyle("Name")}
          placeholder="Location Name"
          value={value}
          onSelect={onSelect}
          textStyle={styles.text}
          onChangeText={(query) => setValue(query)}
          onBlur={clearFields}
          size="large"
        >
          {locations.map(renderOption)}
        </Autocomplete>
        <InputApp
          id="description"
          label="Description"
          multiline={true}
          textStyle={[styles.text, styles.multiline]}
          errorText="Please enter highline description!"
          autoCapitalize="sentences"
          placeholder="Description"
          initialValue={data.description}
          size="large"
          onInputChange={inputChangeHandler}
          ref={descriptionRef}
          required
          initiallyValid={data.description}
        />
        <InputApp
          id="approach"
          label="Approach"
          multiline={true}
          textStyle={[styles.text, styles.multiline]}
          errorText="Please enter highline approach!"
          autoCapitalize="sentences"
          placeholder="Approach"
          initialValue={data.approach}
          size="large"
          onInputChange={inputChangeHandler}
          required
          initiallyValid={data.approach}
        />

        <View style={styles.inlineContainer}>
          <View style={styles.inlineItems}>
            <InputApp
              id="latitude"
              textStyle={styles.text}
              label="Latitude"
              errorText="Incorrect latitude!"
              keyboardType="default"
              autoCapitalize="sentences"
              returnKeyType="next"
              placeholder="Latitude"
              initialValue={
                data.location ? data.location.coordinates[1].toString() : ""
              }
              onInputChange={inputChangeHandler}
              onSubmitEditing={() => longitudeRef.current.focus()}
              required
              initiallyValid={data.location && true}
            />
          </View>
          <View style={styles.inlineItems}>
            <InputApp
              id="longitude"
              textStyle={styles.text}
              label="Longitude"
              errorText="Incorrect longitude!"
              keyboardType="default"
              autoCapitalize="sentences"
              returnKeyType="next"
              placeholder="Longitude"
              initialValue={
                data.location ? data.location.coordinates[0].toString() : ""
              }
              required
              ref={longitudeRef}
              onInputChange={inputChangeHandler}
              initiallyValid={data.location && true}
            />
          </View>
        </View>
        <Button style={styles.button} onPress={submitHandler}>
          Next
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  formContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "opensans-regular",
  },
  multiline: { minHeight: 64 },
  inlineContainer: {
    flexDirection: "row",
  },
  inlineItems: {
    flex: 1,
  },
  title: {
    marginVertical: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
});
export default LocationFrom;
