import React, { useState ,useEffect} from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Form.css";
import Skills from "./Skills";
import { useHistory } from "react-router-dom";
import DateComponent from "./Date";

const resumeSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  github: yup.string().url(),
  email: yup.string().email("Must be a valid email").max(255),
});
function Form({ resumeData }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resumeSchema),
    defaultValues: {
      experience: [
        { company: "", designation: "", expStartDate: "", expEndDate: "" },
      ],
      education: [
        { institute: "", degree: "", expStartDate: "", expEndDate: "" },
      ],
    },
  });

  const { fields, append, prepend, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "experience", // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });
  const {
    fields: eduFields,
    append: eduAppend,
    remove: eduRemove,
  } = useFieldArray({ control, name: "education" });

  const [skills, setSkills] = useState();
  const history = useHistory();

  const skillData = (data) => {
    const skillMapped = data?.map((item) => item.value);
    setSkills(skillMapped);
  };
//   useEffect(() => {
//       console.log("skill is",skills)
//   }, [skills])
  const onSubmit = (data) => {
    // alert(JSON.stringify(data));
    console.log("Data is", data);
    let payload = data;
    payload["skills"] = skills;
    console.log("Payload is", payload);
    localStorage.setItem("resume", JSON.stringify(payload));
    resumeData(payload);
    setTimeout(() => {
      console.log("Submitted.....");
      history.push("/resume");
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-section">
          <h3>Personal Information</h3>
          <label>First Name</label>
          <input {...register("firstName")} placeholder="first name" />
          {errors.firstName && (
            <p className="form-error">{errors.firstName.message}</p>
          )}
          <label>Last Name</label>
          <input {...register("lastName")} placeholder="last name" />
          {errors.lastName && (
            <p className="form-error">{errors.lastName.message}</p>
          )}
          <div className="form-bio">
            <label>Biography</label>
            <textarea {...register("biography")} placeholder="biography" />

            <label>Current Position</label>
            <input
              {...register("currentPosition")}
              placeholder="current position"
            />

            <label>Email</label>
            <input {...register("email")} placeholder="email" />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}

            <label>Github Link</label>
            <input {...register("github")} placeholder="github link" />
            {errors.github && (
              <p className="form-error">{errors.github.message}</p>
            )}
            <label>Phone No</label>
            <input {...register("PhoneNo")} placeholder="phone number" />

            <label>Address</label>
            <input {...register("Address")} placeholder="address" />
          </div>
        </div>

        <div className="form-section">
          <h3>Experience</h3>
          <div>
            {/* <label>company</label>
            <input {...register("company")} placeholder="company" />

            <label>designation</label>
            <input {...register("designation")} placeholder="designation" />

            <label>start date</label>
            <DateComponent {...register("expStartDate")} />

            <label>end date</label>
            <DateComponent {...register("expStartDate")} /> */}

            {fields.map((item, index) => (
              <>
                <label>company</label>

                <li key={item.id}>
                  <input {...register(`experience.${index}.company`)} />
                  <label>designation</label>

                  <Controller
                    render={({ field }) => <input {...field} />}
                    name={`experience.${index}.designation`}
                    control={control}
                  />
                  <label>start date</label>
                  <DateComponent
                    {...register(`experience.${index}.expStartDate`)}
                  />

                  <label>end date</label>
                  <DateComponent
                    {...register(`experience.${index}.expEndDate`)}
                  />
                  <button
                    type="button"
                    className="delete-item"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </li>
              </>
            ))}
            <button
              className="addmore-button"
              type="button"
              onClick={() =>
                append({
                  company: "",
                  designation: "",
                  expStartData: "",
                  expEndDate: "",
                })
              }
            >
              add item
            </button>
          </div>
          {/* <button className="addmore-button">+ add more</button> */}
        </div>
        <div className="form-section">
          <h3>Education</h3>
          <div>
            {/* <label>institute</label>
            <input {...register("institute")} placeholder="institute" />

            <label>degree</label>
            <input {...register("degree")} placeholder="degree" />

            <label>start date</label>
            <DateComponent {...register("eduStartDate")} />

            <label>end date</label>
            <input {...register("eduEndDate")} />
            <DateComponent {...register("eduEndDate")} /> */}

            {eduFields.map((item, index) => (
              <>
                <label>institute</label>

                <li key={item.id}>
                  <input {...register(`education.${index}.institute`)} />
                  <label>degree</label>

                  <Controller
                    render={({ field }) => <input {...field} />}
                    name={`education.${index}.degree`}
                    control={control}
                  />
                  <label>start date</label>
                  <DateComponent
                    {...register(`education.${index}.eduStartDate`)}
                  />

                  <label>end date</label>
                  <DateComponent
                    {...register(`education.${index}.eduEndDate`)}
                  />
                  <button
                    type="button"
                    className="delete-item"
                    onClick={() => eduRemove(index)}
                  >
                    Delete
                  </button>
                </li>
              </>
            ))}
          </div>
          <button
            className="addmore-button"
            type="button"
            onClick={() =>
              eduAppend({
                institute: "",
                degree: "",
                eduStartData: "",
                eduEndDate: "",
              })
            }
          >
            add item
          </button>{" "}
        </div>
        <div className="form-section">
          <h3>Skills</h3>
          <Skills skillData={skillData} />
        </div>
        <input type="submit" />
      </form>
    </>
  );
}

export default Form;
