import React, {
  useReducer,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { View, Alert, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import InputApp from "../UI/Input";
import {
  Button,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { TopNav } from "../UI/TopNav";
import { KeyboardAvoidingView } from "../UI/KeyboardAvoidingView";
import { formReducer, FORM_INPUT_UPDATE } from "../../store/reducers/form";
import * as actions from "../../store/actions/index";
import { ArrowHead } from "../UI/AppIcon";
import PhotoPicker from "../UI/PhotoPicker";

const HighlineForm = (props) => {
  //#region variables & initial states
  const { navigation } = props;
  const styles = useStyleSheet(themedStyles);
  const highRef = useRef(null);
  const location = useSelector((state) => state.data.location);
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      locationId: location._id,
      name: "",
      long: "",
      high: "",
      remarks: "",
      establishedBy: "",
    },
    inputValidities: {
      name: false,
      long: false,
      high: false,
      remarks: false,
      establishedBy: false,
    },
    formIsValid: true,
  });
  //#endregion
  //#region private functions

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
  const submitHandler = useCallback(() => {
    /* if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }*/
    if (location._id) {
      navigation.navigate("AnchorForm");
      /* dispatch(
        actions.postHighline({
          ...formState.inputValues,
        })
      );*/
    }
  }, [dispatch, formState]);

  //#endregion
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TopNav navigation={navigation} tittle="Highline Info" />
      <View style={[styles.container, styles.formContainer]}>
        <InputApp
          id="name"
          label="Name"
          errorText="Please enter highline name!"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          placeholder="Highline Name"
          initialValue=""
          size="large"
          onInputChange={inputChangeHandler}
          onSubmitEditing={() => highRef.current.focus()}
          required
        />
        <View style={styles.inlineContainer}>
          <View style={styles.inlineItems}>
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
          <View style={styles.inlineItems}>
            <InputApp
              id="long"
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
        <View>
          <Text style={styles.label} category="p2">
            Photos
          </Text>
          <ScrollView style={styles.inlineContainer} horizontal={true}>
            <PhotoPicker />
            <PhotoPicker />
            <PhotoPicker />
            <PhotoPicker />
          </ScrollView>
        </View>

        <Button
          accessoryRight={ArrowHead}
          onPress={submitHandler}
          style={styles.button}
        >
          <Text  category="s1" style={[styles.text, styles.textColor]}>Next Anchors</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};
//#region styles
const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  formContainer: {
    marginTop: 0,
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "opensans-regular",
  },
  multiline: { minHeight: 90 },
  inlineContainer: {
    flexDirection: "row",
  },
  inlineItems: {
    flex: 1,
    flexDirection: "row",
  },
  label: {
    marginHorizontal: 16,
    marginVertical: 2,
    fontFamily: "opensans-regular",
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
  textColor: {
    color: "#fff",
  },
});
//#endregion

export default HighlineForm;
