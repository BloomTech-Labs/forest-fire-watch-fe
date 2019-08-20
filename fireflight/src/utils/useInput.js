import { useState } from "react";

const  useInput = (initialValue, debugName) => {
  const [value, setValue] = useState(initialValue);
  const handleChanges = e => {
    setValue(e.target.value);
  };
  return [value, setValue, handleChanges];
};

export default useInput