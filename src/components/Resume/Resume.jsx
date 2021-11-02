import React from "react";
import SkillTag from "../components/SkillTag";
import "./Resume.css";
import { useRef } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function Resume({ data }) {
  console.log("Data incoming", new Date().toISOString());
  const myRef = useRef(null);
  const printDocument = () => {
    html2canvas(myRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("resume.pdf");
    });
  };

  return (
    <>
      <div className="download-resume">
        <button className="resume-download" onClick={printDocument}>
          DOWNLOAD{" "}
        </button>
      </div>
      <div className="resume" ref={myRef}>
        <div className="resume-name-tag">
          <p>
            {data?.firstName?.slice(0, 1)}
            {data?.lastName?.slice(0, 1)}
          </p>
        </div>
        <div className="resume-bio">
          <h2>{data?.firstName}</h2>
          <p>{data?.currentPosition}</p>
          <p className="greyed-text">
            {data?.address} | {data?.github} | {data?.email} | {data?.phoneNo}{" "}
          </p>
          <p>{data?.biography}</p>
        </div>
        {data?.experience?.map((exp) => (
          <div className="resume-experience">
            <h2>WORK EXPERIENCE</h2>
            <div>
              <h3>{exp?.company}</h3>
              <p className="greyed-text">
                {data?.designation} | {exp?.expStartdate} - {exp?.expEnddate}
              </p>
              <ul>
                <li>
                  Led scope, planning, and design of the Checkout API with 3
                  teams and over 25 stakeholders
                </li>
                <li>
                  The Checkout API reduced integration issues by 18% overits
                  100,000+ users.
                </li>
              </ul>
            </div>
          </div>
        ))}

        {/* Education */}
        {data?.education?.map((education) => (
          <div className="resume-education">
            <h3>Education </h3>
            <p>{education?.institute}</p>
            <p className="greyed-text">
              {education?.degree} | {education?.eduStartdate} - 
              {education?.eduEnddate}
            </p>
          </div>
        ))}
        {/* Skills */}
        <div className="resume-skills">
          <h3>SKILLS</h3>
          <SkillTag skillsData={data?.skills} />
        </div>
      </div>
    </>
  );
}

export default Resume;
