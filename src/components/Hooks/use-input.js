import { useState } from "react";

import classes from '../Cart/Checkout.module.css'

const useInput = () => {
  const [value, setValue] = useState('');
  const [inputWasTouched, setInputWasTouched] = useState(false);

  const changeValueHandler = event => {
    setValue(event.target.value);
  };

  const blurInputHandler = () => {
    setInputWasTouched(true);
  };

  const isValueValid = value.trim() !== '';

  const inputHasError = !isValueValid && inputWasTouched;

  const inputClassName = inputHasError ? (classes.control + ' ' + classes.invalid) : classes.control;

  const reset = () => {
    setValue('');
    setInputWasTouched(false);
  };

  return {
    value, isValueValid, inputHasError, inputClassName, changeValueHandler, blurInputHandler, reset
  }
};

export default useInput;