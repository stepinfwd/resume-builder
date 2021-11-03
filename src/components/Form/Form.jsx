import React, { useState,useCallback} from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Form.css";
import Skills from "../components/Skills";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const resumeSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  github: yup.string().url().required(),
  address: yup.string().required(),
  phoneNo: yup.number().required(),
  email: yup.string().email("Must be a valid email").max(255).required(),
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
        { institute: "", degree: "", eduStartDate: "", eduEndDate: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
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

  const skillData = useCallback((data) => {
    const skillMapped = data?.map((item) => item.value);
    setSkills(skillMapped);
  },[]);

  const onSubmit = (data) => {
    console.log("Data is", data);
    let payload = data;
    payload["skills"] = skills;
    resumeData(payload);
    setTimeout(() => {
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
            <input {...register("phoneNo")} placeholder="phone number" />
            {errors.phoneNo && (
              <p className="form-error">{errors.phoneNo.message}</p>
            )}
            <label>Address</label>
            <input {...register("address")} placeholder="address" />
            {errors.address && (
              <p className="form-error">{errors.address.message}</p>
            )}
          </div>
        </div>

{/* EXPERIENCE */}
        <div className="form-section">
          <h3>Experience</h3>
          <div>
            {fields.map((item, index) => (
              <>
                <li key={item.id}>
                <label>company</label>

                  <input {...register(`experience.${index}.company`)} />
                  <label>designation</label>

                  <Controller
                    render={({ field }) => <input {...field} />}
                    name={`experience.${index}.designation`}
                    control={control}
                  />
                  <label>start date</label>
                  <Controller
                    control={control}
                    name={`experience.${index}.expStartDate`}

                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                        
                      />
                    )}
                  />

                  <label>end date</label>
        
                   <Controller
                    control={control}
                    name={`experience.${index}.expEndDate`}

                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                      />
                    )}
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
        </div>

 {/* EDUCATION */}
        <div className="form-section">
          <h3>Education</h3>
          <div>
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

                  <section>
                  <Controller
                    control={control}
                    name={`education.${index}.eduStartDate`}

                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}
                      />
                    )}
                  />
                  </section>

                  <label>end date</label>
                  <Controller
                    control={control}
                    name={`education.${index}.eduEndDate`}

                    render={({ field: { onChange, onBlur, value } }) => (
                      <DatePicker
                        onChange={onChange}
                        onBlur={onBlur}
                        selected={value}

                      />
                    )}
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
       {skillData&& <div className="form-section form-skills">
          <h3>Skills</h3>
          <Skills skillData={skillData} />
        </div>}
        <input type="submit" />
      </form>
    </>
  );
}

export default Form;
