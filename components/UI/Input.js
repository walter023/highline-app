import React, { useReducer, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Text, Icon } from "@ui-kitten/components";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const InputApp = React.forwardRef((props, ref) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue,
    isValid: props.initiallyValid,
    touched: false,
  });
  const { onInputChange, id, initialValue } = props;
  useEffect(() => {
    onInputChange(id, inputState.value, inputState.isValid);
  }, [inputState, onInputChange, id]);

  useEffect(() => {
    if (initialValue !== "") {
      dispatch({ type: INPUT_CHANGE, value: initialValue, isValid: true });
    }
  }, [initialValue]);

  const textChangeHandler = (text) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text
        style={styles.label}
        status={props.status}
        category={props.category}
      >
        {props.inputLabel}
      </Text>
      <Input
        ref={ref}
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        //textStyle={styles.label}
        //  status= ? "danger" : props.status}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Icon
            {...props}
            style={styles.icon}
            fill="#FF3D71"
            name="alert-circle"
          />
          <Text status="danger" style={styles.errorText}>
            {props.errorText}
          </Text>
        </View>
      )}
    </View>
  );
});
const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "opensans-regular",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  errorContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  errorText: {
    fontFamily: "opensans-regular",
    fontSize: 13,
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
});

export default InputApp;
