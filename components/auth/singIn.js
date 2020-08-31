import React, { useReducer, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "@ui-kitten/components";
import {
  ArrowForwardIcon,
  FacebookIcon,
  GoogleIcon,
  TwitterIcon,
} from "../UI/appIcon";
import { KeyboardAvoidingView } from "../UI/keyboardAvoidingView";
import { ImageOverlay } from "../UI/ImageOverlay";
import InputApp from "../UI/Input";
import { formReducer, FORM_INPUT_UPDATE } from "../../store/reducers/form";
import * as actions from "../../store/actions/index";

export default ({ navigation }) => {
  const dispatch = useDispatch();
  const passwordRef = useRef(null);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: "",
      password: "",
    },
    formIsValid: false,
  });
  const onSignInButtonPress = () => {
    if (formState.formIsValid) {
      dispatch(actions.login(formState.inputValues));
    }
    // navigation && navigation.goBack();
  };
  const onSignUpButtonPress = () => {
    navigation && navigation.navigate("SingUp");
  };

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

  return (
    <KeyboardAvoidingView>
      <ImageOverlay
        style={styles.container}
        source={require("../../assets/bg-img.jpg")}
      >
        <View style={styles.signInContainer}>
          <Text style={styles.signInLabel} status="control" category="h4">
            SIGN IN
          </Text>
          <Button
            style={styles.signUpButton}
            appearance="ghost"
            status="control"
            size="giant"
            accessoryLeft={ArrowForwardIcon}
            onPress={onSignUpButtonPress}
          >
            <Text style={styles.text} status="control" category="h6">
              Sign Up
            </Text>
          </Button>
        </View>
        <View style={styles.formContainer}>
          <InputApp
            id="email"
            email
            required
            inputLabel=" EMAIL"
            errorText="Please enter a valid email!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            placeholder="Email"
            status="control"
            category="s1"
            initialValue=""
            onInputChange={inputChangeHandler}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <InputApp
            id="password"
            inputLabel=" PASSWORD"
            errorText="Please enter a valid password!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            placeholder="Password"
            status="control"
            category="s1"
            initialValue=""
            secureTextEntry
            required
            onInputChange={inputChangeHandler}
            ref={passwordRef}
          />
        </View>
        <Button
          appearance="filled"
          status="control"
          size="large"
          onPress={onSignInButtonPress}
        >
          <Text style={{ ...styles.text, color: "#14236e" }}>SIGN IN</Text>
        </Button>
        <View style={styles.socialAuthContainer}>
          <Text style={styles.socialAuthHintText} status="control">
            Sign with a social account
          </Text>
          <View style={styles.socialAuthButtonsContainer}>
            <Button
              appearance="ghost"
              size="giant"
              status="control"
              accessoryLeft={GoogleIcon}
            />
            <Button
              appearance="ghost"
              size="giant"
              status="control"
              accessoryLeft={FacebookIcon}
            />
            <Button
              appearance="ghost"
              size="giant"
              status="control"
              accessoryLeft={TwitterIcon}
            />
          </View>
        </View>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  signInContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 24,
  },
  socialAuthContainer: {
    marginTop: 48,
  },
  formContainer: {
    flex: 1,
    marginTop: 48,
  },
  signInLabel: {
    flex: 1,
    fontFamily: "opensans-regular",
  },
  signUpButton: {
    flexDirection: "row-reverse",
    paddingHorizontal: 0,
    fontFamily: "opensans-regular",
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
    fontFamily: "opensans-regular",
  },
  text: {
    fontFamily: "opensans-regular",
  },
});
