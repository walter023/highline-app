import React, {
  useReducer,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { View, Alert } from "react-native";
import {
  Button,
  StyleService,
  useStyleSheet,
  Tooltip,
  Text,
} from "@ui-kitten/components";
import { useSelector, useDispatch } from "react-redux";
import { TopNav } from "../UI/TopNav";
import { KeyboardAvoidingView } from "../UI/KeyboardAvoidingView";
import { formReducer, FORM_INPUT_UPDATE } from "../../store/reducers/form";
import ComboBox from "../UI/ComboBox";
import InputApp from "../UI/Input";
import { InfoIcon, Cloud } from "../UI/AppIcon";
const AnchorForm = (props) => {
  const { navigation } = props;
  const styles = useStyleSheet(themedStyles);
  const [visible, setVisible] = useState(false);
  const [visibleMain, setVisibleMain] = useState(false);
  const [visibleBackUp, setVisibleBackUp] = useState(false);
  const dispatch = useDispatch();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      rightAnchorMain: "",
      rightAnchorBackUp: "",
      rhsMainNumberAnchors: "",
      rhsBackupNumberAnchors: "",
      rshAnchorSize: "",
      leftAnchorMain: "",
      leftAnchorBackUp: "",
      lhsMainNumberAnchors: "",
      lhsBackupNumberAnchors: "",
      lshAnchorSize: "",
    },
    inputValidities: {
      rightAnchorMain: false,
      rightAnchorBackUp: false,
      rhsMainNumberAnchors: false,
      rhsBackupNumberAnchors: false,
      rshAnchorSize: true,
      leftAnchorMain: false,
      leftAnchorBackUp: false,
      lhsMainNumberAnchors: false,
      lhsBackupNumberAnchors: false,
      lshAnchorSize: true,
    },
    formIsValid: true,
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
  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    /*  dispatch(
      actions.setAnchors({
        anchors: {
          rhs: {
            main: formState.inputValues.rightAnchorMain.replace(" ", "_"),
            howManyOnMain: formState.inputValues.rhsMainNumberAnchors,
            backup: formState.inputValues.rightAnchorBackUp.replace(" ", "_"),
            howMany: formState.inputValues.rhsBackupNumberAnchors,
            size: formState.inputValues.rshAnchorSize,
          },
          lhs: {
            main: formState.inputValues.leftAnchorMain.replace(" ", "_"),
            howManyOnMain: formState.inputValues.lhsMainNumberAnchors,
            backup: formState.inputValues.leftAnchorBackUp.replace(" ", "_"),
            howMany: formState.inputValues.lhsBackupNumberAnchors,
            size: formState.inputValues.lshAnchorSize,
          },
        },
      })
    );*/
  }, [dispatch, formState]);
  const toolTip = (setVisibly) => (
    <Button
      onPress={() => setVisibly(true)}
      appearance="ghost"
      status="basic"
      accessoryLeft={InfoIcon}
    />
  );
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TopNav navigation={navigation} tittle="Anchors Info" />
      <View style={[styles.container, styles.formContainer]}>
        <ComboBox
          id="leftAnchorMain"
          label="Left Hand Side Main Anchor"
          placeholder="Righ Hand Main Anchor"
          onSelectChange={inputChangeHandler}
        />
        <ComboBox
          id="leftAnchorBackUp"
          label="Left Hand Back Up Anchor"
          placeholder="Righ Hand Side Back Up Anchor"
          onSelectChange={inputChangeHandler}
        />
        <View style={styles.inlineContainer}>
          <View style={styles.inlineItems}>
            <View style={styles.inputTootip}>
              <InputApp
                id="lhsMainNumberAnchors"
                textStyle={styles.text}
                label="Main"
                keyboardType="numeric"
                placeholder="Main"
                initialValue=""
                onInputChange={inputChangeHandler}
                required
                errorText="Field required!"
              />
            </View>
            <View style={styles.toolTip}>
              <Tooltip
                anchor={() => toolTip(setVisibleMain)}
                visible={visibleMain}
                placement="right start"
                onBackdropPress={() => setVisibleMain(false)}
              >
                Number of anchor(s) main point.
              </Tooltip>
            </View>
          </View>
          <View style={styles.inlineItems}>
            <View style={styles.inputTootip}>
              <InputApp
                id="lhsBackupNumberAnchors"
                textStyle={styles.text}
                label="Back Up"
                keyboardType="numeric"
                placeholder="Back Up"
                initialValue=""
                onInputChange={inputChangeHandler}
                required
                errorText="Field required!"
              />
            </View>
            <View style={styles.toolTip}>
              <Tooltip
                anchor={() => toolTip(setVisibleBackUp)}
                visible={visibleBackUp}
                placement="right start"
                onBackdropPress={() => setVisibleBackUp(false)}
              >
                Number of anchor(s) back up point.
              </Tooltip>
            </View>
          </View>
          <View style={styles.inlineItems}>
            <View style={styles.inputTootip}>
              <InputApp
                id="lshAnchorSize"
                textStyle={styles.text}
                label="Anchor Size"
                keyboardType="numeric"
                placeholder="Size"
                initialValue=""
                onInputChange={inputChangeHandler}
                required={false}
              />
            </View>
            <View style={styles.toolTip}>
              <Tooltip
                anchor={() => toolTip(setVisible)}
                visible={visible}
                placement="right start"
                onBackdropPress={() => setVisible(false)}
              >
                Field no required. Example : 12mm
              </Tooltip>
            </View>
          </View>
        </View>
        <ComboBox
          id="rightAnchorMain"
          label="Righ Hand Side Main Anchor"
          placeholder="Righ Hand Side Main Anchor"
          onSelectChange={inputChangeHandler}
        />
        <ComboBox
          id="rightAnchorBackUp"
          label="Righ Hand Side Back Up Anchor"
          placeholder="Righ Hand Side Back Up Anchor"
          onSelectChange={inputChangeHandler}
        />
        <View style={styles.inlineContainer}>
          <View style={styles.inlineItems}>
            <View style={styles.inputTootip}>
              <InputApp
                id="rhsMainNumberAnchors"
                textStyle={styles.text}
                label="Main"
                keyboardType="numeric"
                placeholder="Main"
                initialValue=""
                errorText="Field required!"
                onInputChange={inputChangeHandler}
                required
              />
            </View>
            <View style={styles.toolTip}>
              <Tooltip
                anchor={() => toolTip(setVisibleMain)}
                visible={visibleMain}
                placement="right start"
                onBackdropPress={() => setVisibleMain(false)}
              >
                Number of anchor(s) main point.
              </Tooltip>
            </View>
          </View>
          <View style={styles.inlineItems}>
            <View style={styles.inputTootip}>
              <InputApp
                id="rhsBackupNumberAnchors"
                textStyle={styles.text}
                label="Back Up"
                keyboardType="numeric"
                placeholder="Back Up"
                initialValue=""
                errorText="Field required!"
                onInputChange={inputChangeHandler}
                required
              />
            </View>
            <View style={styles.toolTip}>
              <Tooltip
                anchor={() => toolTip(setVisibleBackUp)}
                visible={visibleBackUp}
                placement="right start"
                onBackdropPress={() => setVisibleBackUp(false)}
              >
                Number of anchor(s) back up point.
              </Tooltip>
            </View>
          </View>
          <View style={styles.inlineItems}>
            <View style={styles.inputTootip}>
              <InputApp
                id="rshAnchorSize"
                textStyle={styles.text}
                label="Anchor Size"
                keyboardType="numeric"
                placeholder="Size"
                initialValue=""
                onInputChange={inputChangeHandler}
                required={false}
              />
            </View>
            <View style={styles.toolTip}>
              <Tooltip
                anchor={() => toolTip(setVisible)}
                visible={visible}
                placement="right start"
                onBackdropPress={() => setVisible(false)}
              >
                Field no required. Example : 12mm
              </Tooltip>
            </View>
          </View>
        </View>
        <Button
          accessoryRight={Cloud}
          onPress={submitHandler}
          style={styles.button}
        >
          <Text category="s1" style={[styles.text, styles.textColor]}>
            Submit Highline
          </Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AnchorForm;
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
  inlineContainer: {
    flexDirection: "row",
  },
  inlineItems: {
    flex: 1,
    flexDirection: "row",
  },
  toolTip: {
    alignSelf: "flex-end",
    flex: 1,
    right: 10,
  },
  inputTootip: {
    flex: 3,
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
