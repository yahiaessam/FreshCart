import { useState } from "react";
import { registerSchema } from "../Schemas"
import {useFormik} from 'formik'
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router";

function Register() {

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { handleBlur, handleChange, handleSubmit, touched, values, errors, dirty, isValid } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: registerSchema,
    onSubmit: (values, actions) => {
      sendDataToApi(values);
      actions.resetForm();
    }
  });

  async function sendDataToApi(values) {
    setLoading(true);
      try {
        let { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/signup",
          values
        );
        if (data.message == 'success') {
          navigate("/login");
        }
      } catch (error) {
        setLoading(false);
        setErrorMessage(error.response.data.message);
      }
    }

  return (
    <>
      <div className=" min-h-screen flex items-center justify-center bg-[#fff]">
        <div className="hero-content flex-col w-full">
          <div className="card shrink-0 w-full max-w-[800px]">
            <form onSubmit={handleSubmit} className="card-body w-full">

              <h1 className="title text-2xl">Register Now :</h1>

              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="title">name :</span>
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  type="text"
                  id="name"
                  name="name"
                  className={errors.name && touched.name ? "input-error" : ""}
                />
                {errors.name && touched.name ? (
                  <p className="error">{errors.name}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="title">email :</span>
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  type="email"
                  id="email"
                  name="email"
                  className={errors.email && touched.email ? "input-error" : ""}
                />
                {errors.email && touched.email ? (
                  <p className="error">{errors.email}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="title">password :</span>
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  type="password"
                  id="password"
                  name="password"
                  className={
                    errors.password && touched.password ? "input-error" : ""
                  }
                />
                {errors.password && touched.password ? (
                  <p className="error">{errors.password}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-control">
                <label htmlFor="rePassword" className="label">
                  <span className="title">rePassword :</span>
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rePassword}
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  className={
                    errors.rePassword && touched.rePassword ? "input-error" : ""
                  }
                />
                {errors.rePassword && touched.rePassword ? (
                  <p className="error">{errors.rePassword}</p>
                ) : (
                  ""
                )}
              </div>

              <div className="form-control">
                <label htmlFor="phone" className="label">
                  <span className="title">phone :</span>
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  type="tel"
                  id="phone"
                  name="phone"
                  className={errors.phone && touched.phone ? "input-error" : ""}
                />
                {errors.phone && touched.phone ? (
                  <p className="error">{errors.phone}</p>
                ) : (
                  ""
                )}
                {errorMessage ? <p className="error">{errorMessage}</p> : ""}
              </div>

              <div className="self-end mt-4">
                <button
                  disabled={!(isValid && dirty)}
                  type="submit"
                  className="btn btn-accent"
                >
                  {loading ? (
                    <FontAwesomeIcon icon={faSpinner} spinPulse />
                  ) : (
                    "register"
                  )}
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register