import { useState } from "react";

//should be used for all form inputs
//currently used in login, register

const  useInput = (initialValue, debugName) => {
  const [value, setValue] = useState(initialValue);
  const handleChanges = e => {
    setValue(e.target.value);
  };
  return [value, setValue, handleChanges];
};

export default useInput