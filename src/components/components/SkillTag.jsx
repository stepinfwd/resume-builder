import React from "react";

function SkillTag({skillsData}) {
  return (
    <div className="skill-tag">
      {skillsData?.map((item) => (
        <p>{item}</p>
      ))}
    </div>
  );
}

export default SkillTag;
