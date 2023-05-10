import useInput from '../Hooks/use-input';
import classes from './Checkout.module.css';

const Checkout = props => {
  const {
    value: nameValue,
    isValueValid: isNameValid,
    inputHasError: nameHasError,
    inputClassName: nameClassName,
    changeValueHandler: changeNameHandler,
    blurInputHandler: blurNameHandler,
    reset: nameReset
  } = useInput();

  const {
    value: streetValue,
    isValueValid: isStreetValid,
    inputHasError: streetHasError,
    inputClassName: streetClassName,
    changeValueHandler: changeStreetHandler,
    blurInputHandler: blurStreetHandler,
    reset: streetReset
  } = useInput();

  const {
    value: postcodeValue,
    isValueValid: isPostcodeValid,
    inputHasError: postcodeHasError,
    inputClassName: postcodeClassName,
    changeValueHandler: changePostcodeHandler,
    blurInputHandler: blurPostcodeHandler,
    reset: postcodeReset
  } = useInput();

  const {
    value: cityValue,
    isValueValid: isCityValid,
    inputHasError: cityHasError,
    inputClassName: cityClassName,
    changeValueHandler: changeCityHandler,
    blurInputHandler: blurCityHandler,
    reset: cityReset
  } = useInput();

  const formIsValid = isNameValid && isStreetValid && isPostcodeValid && isCityValid;

  const formReset = () => {
    nameReset();
    streetReset();
    postcodeReset();
    cityReset();
  };

  const customer = {
      name: nameValue, 
      street: streetValue, 
      postCode: postcodeValue, 
      city: cityValue
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      blurNameHandler();
      blurStreetHandler();
      blurPostcodeHandler();
      blurCityHandler();
      return;
    };

    formReset();
    
    props.onSendOrder(customer)
  };

  const errorText = ' (field is incorrect)';

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClassName}>
        <label htmlFor='name'>Your Name
          {nameHasError && errorText}
        </label>
        <input
          type='text'
          id='name'
          value={nameValue}
          onChange={changeNameHandler}
          onBlur={blurNameHandler}
        />
      </div>
      <div className={streetClassName}>
        <label htmlFor='street'>Street
          {streetHasError && errorText}
        </label>
        <input
          type='text'
          id='street'
          value={streetValue}
          onChange={changeStreetHandler}
          onBlur={blurStreetHandler}
        />
      </div>
      <div className={postcodeClassName}>
        <label htmlFor='postal'>Postal Code
          {postcodeHasError && errorText}
        </label>
        <input
          type='text'
          id='postal'
          value={postcodeValue}
          onChange={changePostcodeHandler}
          onBlur={blurPostcodeHandler}
        />
      </div>
      <div className={cityClassName}>
        <label htmlFor='city'>City
          {cityHasError && errorText}
        </label>
        <input
          type='text'
          id='city'
          value={cityValue}
          onChange={changeCityHandler}
          onBlur={blurCityHandler}
        />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;