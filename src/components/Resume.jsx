import React from "react";
import SkillTag from "./SkillTag"
import "./Resume.css"
function Resume({data}) {
    
  return (
    <div className="resume">
        <div className="resume-name-tag"><p>MV</p></div>
      <div className="resume-bio">
        <h2>{data?.firstName}</h2>
        <p >{data?.currentPosition}</p>
        <p className="greyed-text">{data?.address} |{data?.github} | {data?.email}  | {data?.phone} </p>
        <p>
          A technical leader with eight years of experience designing, planning,
          and implementing internal and external APIs at scale.
        </p>
      </div>
      <div className="resume-experience">
        <h2>WORK EXPERIENCE</h2>
        <div>
          <h3>{data?.company}</h3> 
          <p className="greyed-text">{data?.designation} | Feb, 2020 - Current</p>
          <ul>
            <li>
              Led scope, planning, and design of the Checkout API with 3 teams
              and over 25 stakeholders
            </li>
            <li>
              The Checkout API reduced integration issues by 18% overits
              100,000+ users.
            </li>
          </ul>
        </div>
      </div>

      {/* Education */}
      <div className="resume-education">
        <h3>Education </h3>
        <p>{data?.institute}</p>
        <p>{data?.degree}|{data?.eduStartdate}-{data?.eduEnddate} </p>
      </div>

      {/* Skills */}
      <div className="resume-skills">
          <h3>SKILLS</h3>
          {/* <SkillTag skillsData={skillsData}/> */}
      </div>
    </div>
  );
}

export default Resume;
