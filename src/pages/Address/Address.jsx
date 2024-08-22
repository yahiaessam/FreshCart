import { useContext, useState } from "react";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router";
import { StoreContext } from "../../context/storeContext";

function Address() {
  const [loading, setLoading] = useState(false);
  const { checkoutSession } = useContext(StoreContext);
  const { id } = useParams();

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
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values, actions) => {
      sendDataToApi(values);
      actions.resetForm();
    },
  });

  async function sendDataToApi(values) {
    setLoading(true);
    try {
      const data  = await checkoutSession(id,values)

      if (data.status == "success") {
        window.location.href = data.session.url
      }
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <>
      <div className=" min-h-screen flex items-center justify-center bg-[#fff]">
        <div className="hero-content flex-col w-full">
          <div className="card shrink-0 w-full max-w-[800px]">
            <form onSubmit={handleSubmit} className="card-body w-full">

              <h1 className="title text-2xl">Address :</h1>

              <div className="form-control">
                <label htmlFor="details" className="label">
                  <span className="title">details :</span>
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.details}
                  type="text"
                  id="details"
                  name="details"
                  className={errors.details && touched.details ? "input-error" : ""}
                />
              </div>

              <div className="form-control">
                <label htmlFor="phone" className="label">
                  <span className="title">phone :</span>
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  type="text"
                  id="phone"
                  name="phone"
                  className={errors.phone && touched.phone ? "input-error" : ""}
                />
              </div>

              <div className="form-control">
                <label htmlFor="city" className="label">
                  <span className="title">city :</span>
                </label>
                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.city}
                  type="text"
                  id="city"
                  name="city"
                  className={
                    errors.city && touched.city ? "input-error" : ""
                  }
                />
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
                    "Pay"
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

export default Address;
