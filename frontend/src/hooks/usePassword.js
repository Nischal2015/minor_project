import { useState } from "react";

const usePassword = (value) => {
  const [hidePassword, setHidePassword] = useState(value);

  const showPasswordHandler = () => {
    setHidePassword((prevValue) => !prevValue);
  };

  return [hidePassword, showPasswordHandler];
};

export default usePassword;
