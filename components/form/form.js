import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useReducer, useCallback, useRef, useEffect } from "react";
import InputApp from "../UI/Input";
import {
  Button,
  Divider,
  StyleService,
  Text,
  useStyleSheet,
  Layout,
  Autocomplete,
  AutocompleteItem,
} from "@ui-kitten/components";
import { TopNav } from "../UI/topNav";
import { KeyboardAvoidingView } from "../UI/keyboardAvoidingView";
import { formReducer, FORM_INPUT_UPDATE } from "../../store/reducers/form";
import * as actions from "../../store/actions/index";

export default (props) => {
  const { navigation } = props;
  const styles = useStyleSheet(themedStyles);
  const descriptionRef = useRef(null);
  const longitudeRef = useRef(null);
  const highlineNameRef = useRef(null);
  const highRef = useRef(null);
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.data.suggestions);
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState({});
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      locationName: "",
      description: locations.length > 0 ? locations[0].description : "",
      approach: "",
    },
    inputValidities: {
      locationName: "",
      description: "",
      approach: "",
    },
    formIsValid: false,
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
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(actions.getLocationName(value));
    }, 500);
    return () => clearTimeout(timer);
  }, [value, dispatch]);

  useEffect(() => {
    dispatch(actions.getLocationName("Scarface"));
  }, []);

  const renderOption = (item, index) => (
    <AutocompleteItem textStyle={styles.text} key={index} title={item.name} />
  );

  const clearFields = () => {
    if (value !== data.name) {
      setData({});
      dispatch(actions.getLocationName("Scarface"));
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TopNav navigation={navigation} tittle="Highline Guide" />
      <View style={[styles.container, styles.formContainer]}>
        <Text style={[styles.text, styles.title]} category="h5">
          Location Details
        </Text>
        <Autocomplete
          label="Name"
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
          autoCorrect
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
          autoCorrect
          initiallyValid={data.approach}
        />
        <View style={styles.locationContainer}>
          <View style={styles.coords}>
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
          <View style={styles.coords}>
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
              onSubmitEditing={() => highlineNameRef.current.focus()}
              initiallyValid={data.location && true}
            />
          </View>
        </View>
        <Text style={[styles.text, styles.title]} category="h5">
          Highline Details
        </Text>
        <InputApp
          id="highline-name"
          label="Highline Name"
          errorText="Please enter highline name!"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          placeholder="Highline Name"
          initialValue=""
          size="large"
          onInputChange={inputChangeHandler}
          ref={highlineNameRef}
          onSubmitEditing={() => highRef.current.focus()}
          required
        />
        <View style={styles.locationContainer}>
          <View style={styles.coords}>
            <InputApp
              id="high"
              textStyle={styles.text}
              label="High"
              errorText="Incorrect highline high!"
              keyboardType="numeric"
              autoCapitalize="sentences"
              returnKeyType="next"
              placeholder="High"
              initialValue=""
              onInputChange={inputChangeHandler}
              ref={highRef}
              onSubmitEditing={() => lenghtRef.current.focus()}
              required
            />
          </View>
          <View style={styles.coords}>
            <InputApp
              id="length"
              textStyle={styles.text}
              label="Length"
              errorText="Incorrect length!"
              keyboardType="numeric"
              autoCapitalize="sentences"
              returnKeyType="next"
              placeholder="Length"
              initialValue=""
              onInputChange={inputChangeHandler}
              required
            />
          </View>
        </View>
        <InputApp
          id="remarks"
          label="Remarks"
          multiline={true}
          textStyle={[styles.text, styles.multiline]}
          errorText="Please enter highline remarks!"
          keyboardType="default"
          autoCapitalize="sentences"
          placeholder="Remarks"
          initialValue=""
          size="large"
          onInputChange={inputChangeHandler}
          required
        />
        <InputApp
          id="establishedBy"
          label="Established By"
          errorText="Who established the highline?"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          placeholder="Established By"
          initialValue=""
          size="large"
          onInputChange={inputChangeHandler}
          required
        />
        <Text style={styles.text} category="h5">
          Photos
        </Text>
        <Button>Create Highline</Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },

  formContainer: {
    marginTop: 0,
    paddingHorizontal: 16,
  },
  emailSignLabel: {
    //alignSelf: "flex-start",
    marginTop: 15,
    paddingHorizontal: 16,
    fontFamily: "opensans-regular",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 52,
  },
  divider: {
    flex: 1,
  },

  text: {
    fontFamily: "opensans-regular",
  },
  multiline: { minHeight: 64 },
  locationContainer: {
    flexDirection: "row",
  },
  coords: {
    flex: 1,
  },
  title: {
    marginVertical: 20,
  },
});
