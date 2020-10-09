import React, {
  useReducer,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { View, Alert, Image } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import InputApp from "../UI/Input";
import {
  Button,
  Divider,
  StyleService,
  Text,
  useStyleSheet,
  Tooltip,
  List,
} from "@ui-kitten/components";
import { TopNav } from "../UI/TopNav";
import { KeyboardAvoidingView } from "../UI/KeyboardAvoidingView";
import { formReducer, FORM_INPUT_UPDATE } from "../../store/reducers/form";
import * as actions from "../../store/actions/index";
import ComboBox from "../UI/ComboBox";
import { InfoIcon, Camera } from "../UI/AppIcon";
import PhotoPicker from "../UI/PhotoPicker";

const HighlineForm = (props) => {
  //#region variables & initial states
  const { navigation } = props;
  const styles = useStyleSheet(themedStyles);
  const highRef = useRef(null);
  const location = useSelector((state) => state.data.location);
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleMain, setVisibleMain] = useState(false);
  const [visibleBackUp, setVisibleBackUp] = useState(false);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      locationId: location._id,
      name: "",
      long: "",
      high: "",
      remarks: "",
      establishedBy: "",
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
      name: false,
      long: false,
      high: false,
      remarks: false,
      establishedBy: false,
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
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" },
      ]);
      return;
    }
    if (location._id) {
      dispatch(
        actions.postHighline({
          ...formState.inputValues,
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
      );
    }
  }, [dispatch, formState]);

  const toolTip = (setVisibly) => (
    <Button
      onPress={() => setVisibly(true)}
      appearance="ghost"
      status="basic"
      accessoryLeft={InfoIcon}
    />
  );

  //#endregion
  return (
    <KeyboardAvoidingView style={styles.container}>
      <TopNav navigation={navigation} tittle="Highline Details" />
      <View style={[styles.container, styles.formContainer]}>
        <InputApp
          id="name"
          label="Highline Name"
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
          <View style={styles.inlineContainer}>
            <PhotoPicker />
            <PhotoPicker />
          </View>
        </View>

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

        <Button onPress={submitHandler}>Add Highline</Button>
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
  multiline: { minHeight: 64 },
  inlineContainer: {
    flexDirection: "row",
  },
  inlineItems: {
    flex: 1,
    flexDirection: "row",
  },
  title: {
    marginVertical: 20,
  },
  toolTip: {
    alignSelf: "flex-end",
    flex: 1,
    right: 10,
  },
  inputTootip: {
    flex: 3,
  },
  label: {
    marginHorizontal: 16,
    marginVertical: 2,
    fontFamily: "opensans-regular",
  },
  button: {
    // marginTop: -15,
  },
});
//#endregion

export default HighlineForm;
