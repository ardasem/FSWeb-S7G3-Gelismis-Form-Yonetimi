import React from "react";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import "./Form.css";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    agreement: false,
  });
  const [errorState, setErrorState] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    agreement: "",
  });
  const [isValid, setIsValid] = useState(false);

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Must include name.")
      .min(2, "min 2 chars long"),
    surname: Yup.string()
      .required("Must include surname.")
      .min(2, "min 2 chars long"),
    email: Yup.string()
      .email("Must be a valid email address")
      .required("Must include email address"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Must contain 1 symbol 1 uppercase letter 1 lowercase letter min 8 characters long."
      )
      .min(6, "min 6 chars long"),
    agreement: Yup.boolean().oneOf(
      [true],
      "You must accept the Terms & Conditions."
    ),
  });

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => setIsValid(valid));
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    console.log('n',name, 'v', value,'c',checked )

    const newValue = name == "agreement" ? checked : value;
    
    const newState = {
      ...formData,
      [name]:newValue,
    }

    setFormData(newState);

    Yup.reach(formSchema, name)
      .validate(newValue)
      .then((valid) => {
        setErrorState({ ...errorState, [name]: "" });
      })
      .catch((err) => {
        setErrorState({ ...errorState, [name]: err.errors[0] });
      });
  };

  const handleSubmit = () => {
    console.log("lel");
  };

  return (
    <form>
      <h1>Üye Kayıt Formu</h1>
      <div className="inputClass">
        <label htmlFor="name">Name:</label>
        <input
          value={formData.name}
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
        />
      </div>
      {errorState.name && (
        <div className="error">
          {" "}
          <p data-test='error'>{errorState.name}</p>
        </div>
      )}

      
      <div className="inputClass">
        <label htmlFor="email">Email:</label>
        <input
          value={formData.email}
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
        />
      </div>
      {errorState.email&& (
        <div className="error">
          {" "}
          <p data-test='error'>{errorState.email}</p>
        </div>
      )}
      <div className="inputClass">
        <label htmlFor="password">Password:</label>
        <input
          value={formData.password}
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
        />
      </div>
      {errorState.password && (
        <div className="error">
          {" "}
          <p data-test='error'>{errorState.password}</p>
        </div>
      )}

      <div className="inputClass">
        <label htmlFor="agreement">Terms & Conditions</label>
        <input
          checked={formData.agreement}
          type="checkbox"
          name="agreement"
          id="agreement"
          onChange={handleChange}
        />
      </div>
      {errorState.agreement && (
        <div className="error">
          {" "}
          <p data-test='error'>{errorState.agreement}</p>
        </div>
      )}
      <div className="inputClass">
        <button disabled={!isValid} onSubmit={handleSubmit}>
          Send
        </button>
      </div>
    </form>
  );
}

export default Form;
