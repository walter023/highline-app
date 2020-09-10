import React, { useCallback, useReducer, useRef } from "react";
import { View } from "react-native";
import {
  Button,
  CheckBox,
  Divider,
  StyleService,
  Text,
  useStyleSheet,
} from "@ui-kitten/components";
import { ImageOverlay } from "../UI/ImageOverlay";
import {
  ArrowForwardIconOutline,
  FacebookIcon,
  GoogleIcon,
  HeartIcon,
  TwitterIcon,
} from "../UI/appIcon";
import { KeyboardAvoidingView } from "../UI/keyboardAvoidingView";
import InputApp from "../UI/Input";
import { formReducer, FORM_INPUT_UPDATE } from "../../store/reducers/form";

export default ({ navigation }) => {
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const styles = useStyleSheet(themedStyles);

  const onSignUpButtonPress = () => {
    navigation && navigation.goBack();
  };

  const onSignInButtonPress = () => {
    navigation && navigation.navigate("SingIn");
  };
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      email: "",
      password: "",
    },
    inputValidities: {
      name: "",
      email: "",
      password: "",
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
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ImageOverlay
        style={styles.headerContainer}
        source={require("../../assets/sing-up.jpg")}
      >
        <Button
          style={styles.evaButton}
          appearance="ghost"
          status="control"
          size="large"
          accessoryLeft={HeartIcon}
        >
          <Text style={styles.signInLabel} category="h6" status="control">
            Highline Guide Book
          </Text>
        </Button>
        <View style={styles.signUpContainer}>
          <Text style={styles.signInLabel} category="h4" status="control">
            SIGN UP
          </Text>
          <Button
            style={styles.signInButton}
            appearance="ghost"
            status="control"
            size="giant"
            accessoryLeft={ArrowForwardIconOutline}
            onPress={onSignInButtonPress}
          >
            <Text style={styles.text} category="h6" status="control">
              Sign In
            </Text>
          </Button>
        </View>
      </ImageOverlay>
      <View style={styles.socialAuthContainer}>
        <Text style={styles.socialAuthHintText}>
          Sign with a social account
        </Text>
        <View style={styles.socialAuthButtonsContainer}>
          <Button
            appearance="ghost"
            size="giant"
            status="basic"
            accessoryLeft={GoogleIcon}
          />
          <Button
            appearance="ghost"
            size="giant"
            status="basic"
            accessoryLeft={FacebookIcon}
          />
          <Button
            appearance="ghost"
            size="giant"
            status="basic"
            accessoryLeft={TwitterIcon}
          />
        </View>
      </View>
      <View style={styles.orContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.orLabel} category="h5">
          OR
        </Text>
        <Divider style={styles.divider} />
      </View>
      <Text style={styles.emailSignLabel}>Sign up with Email</Text>
      <View style={[styles.container, styles.formContainer]}>
        <InputApp
          id="name"
          required
          label="Name"
          errorText="Please enter highliner name!"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          placeholder="Highliner Name"
          initialValue=""
          onInputChange={inputChangeHandler}
          onSubmitEditing={() => emailRef.current.focus()}
        />
        <InputApp
          id="email"
          email
          required
          label="Email"
          autoCompleteType="email"
          errorText="Please enter a valid email!"
          keyboardType="email-address"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          placeholder="Highliner Email"
          initialValue=""
          onInputChange={inputChangeHandler}
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <InputApp
          id="password"
          label="Password"
          errorText="Please enter a valid password!"
          keyboardType="default"
          autoCapitalize="sentences"
          returnKeyType="next"
          placeholder="Password"
          initialValue=""
          min={8}
          secureTextEntry
          require
          ref={passwordRef}
          onInputChange={inputChangeHandler}
        />
        <View style={styles.termsContainer}>
          <CheckBox
            style={styles.termsCheckBox}
            checked={termsAccepted}
            onChange={(checked) => setTermsAccepted(checked)}
          />
          <Text category="c1" style={styles.termsCheckBoxText}>
            By creating an account, I agree to
            Terms of\nUse and Privacy Policy
          </Text>
        </View>
      </View>
      <Button
        style={styles.signUpButton}
        size="large"
        onPress={onSignUpButtonPress}
        appearance="filled"
      >
        <Text
          style={{ ...styles.text, color: "#fff" }}
          appearance="alternative"
        >
          SIGN UP
        </Text>
      </Button>
    </KeyboardAvoidingView>
  );
};

const themedStyles = StyleService.create({
  container: {
    backgroundColor: "background-basic-color-1",
  },
  headerContainer: {
    minHeight: 216,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 44,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
  },
  socialAuthContainer: {
    marginTop: 24,
  },
  socialAuthButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  socialAuthHintText: {
    alignSelf: "center",
    marginBottom: 16,
  },
  formContainer: {
    marginTop: 48,
    paddingHorizontal: 16,
  },
  evaButton: {
    maxWidth: 200,
    paddingHorizontal: 0,
    fontFamily: "opensans-regular",
  },
  signInLabel: {
    flex: 1,
    fontFamily: "opensans-regular",
  },
  signInButton: {
    flexDirection: "row-reverse",
    paddingHorizontal: 0,
    fontFamily: "opensans-regular",
  },
  signUpButton: {
    marginVertical: 24,
    marginHorizontal: 16,
  },
  socialAuthIcon: {
    tintColor: "text-basic-color",
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
  orLabel: {
    marginHorizontal: 8,
    fontFamily: "opensans-regular",
  },
  emailSignLabel: {
    alignSelf: "center",
    marginTop: 8,
    fontFamily: "opensans-regular",
  },
  formInput: {
    marginTop: 16,
  },
  termsContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  termsCheckBox: {
    marginTop: 20,
  },
  termsCheckBoxText: {
    fontSize: 11,
    lineHeight: 14,
    marginTop: 20,
    paddingLeft: 10,
    color: "text-hint-color",
    fontFamily: "opensans-regular",
  },
  text: {
    fontFamily: "opensans-regular",
  },
});
