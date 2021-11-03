import React, { useState, useEffect } from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();
function Skills({ skillData }) {
  const [selectedOption, setselectedOption] = useState();

  const handleChange = (input) => {
    setselectedOption(input);
  };
  useEffect(() => {
    skillData(selectedOption);
  });
  const options = [
    { value: "HTML", label: "HTML" },
    { value: "REACTJS", label: "REACTJS" },
    { value: "JAVASCRIPT", label: "JAVASCRIPT" },
    { value: "CSS", label: "CSS" },
    { value: "JAVA", label: "JAVA" },
    { value: "REDUX", label: "REDUX" },
    { value: "GO", label: "GO" },
    { value: "FLUTTER", label: "FLUTTER" },
  ];

  return (
    <div>
      <Select
        options={options}
        components={animatedComponents}
        defaultValue={options[4]}
        value={selectedOption}
        onChange={handleChange}
        isMulti
      />
    </div>
  );
}

export default Skills;
