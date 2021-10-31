import React from "react";
import Skills from "./Skills"
import SkillTag from "./SkillTag"
import "./Resume.css"
function Resume() {
    
  return (
    <div className="resume">
        <div className="resume-name-tag"><p>MV</p></div>
      <div className="resume-bio">
        <h2>MATT VAUGHN</h2>
        <p >software Engineer</p>
        <p className="greyed-text">Austin, TX | github.com/ma | ma@email.com | 555-555-5555</p>
        <p>
          A technical leader with eight years of experience designing, planning,
          and implementing internal and external APIs at scale.
        </p>
      </div>
      <div className="resume-experience">
        <h2>WORK EXPERIENCE</h2>
        <div>
          <h3>STRIPE</h3>
          <p className="greyed-text">Staff Engineer | Feb, 2020 - Current</p>
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
        <h3>EDUCATION</h3>
        <p>HARVARD</p>
        <p>BSc. Computer Science | 2008 - 2012</p>
      </div>

      {/* Skills */}
      <div className="resume-skills">
          <h3>SKILLS</h3>
          <SkillTag/>
      </div>
    </div>
  );
}

export default Resume;
