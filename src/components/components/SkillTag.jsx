import React from "react";

function SkillTag({skillsData}) {
  return (
    <div className="skill-tag">
      {skillsData?.map((item,index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}

export default SkillTag;
