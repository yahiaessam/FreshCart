import {  useContext, useState } from "react";
import { loginSchema } from "../Schemas";
import { useFormik } from "formik";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { StoreContext } from "../../../context/storeContext";
import { toast } from "react-toastify";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgetPassword } = useContext(StoreContext);
  const navigate = useNavigate();

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    touched,
    values,
    errors,
    dirty,
    isValid,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, actions) => {
      sendDataToApi(values);
      actions.resetForm();
    },
  });

  async function forgotPassword(email) {
    const data = await forgetPassword(email);
    if (data.statusMsg === 'success') {
      toast(data.message);
    }
    console.log(data);
  }

  async function sendDataToApi(values) {
    setLoading(true);
    try {
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message == "success") {
        localStorage.setItem('token', data.token)
        navigate("/");
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
              <h1 className="title text-2xl">Login Now :</h1>

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

              {errorMessage ? <p className="error">{errorMessage}</p> : ""}

              <div className="flex items-center justify-between mt-4">
                <div>
                  <button className="title hover:text-[#0aad0a] hover:underline" type="button" onClick={()=> forgotPassword(values.email)}>
                    Forgot your password?
                  </button>
                </div>
                <div>
                  <button
                    disabled={!(isValid && dirty)}
                    type="submit"
                    className="btn btn-accent"
                  >
                    {loading ? (
                      <FontAwesomeIcon icon={faSpinner} spinPulse />
                    ) : (
                      "login"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
