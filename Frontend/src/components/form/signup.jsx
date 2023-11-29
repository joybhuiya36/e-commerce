import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./signup.style.scss";
import axiosIntance from "../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ isOpen, onclose }) => {
  if (!isOpen) return null;

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [er, setEr] = useState("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handlerOnSubmit = () => {
    // console.log("Form is submitted ");

    const userData = {
      name: getValues("name"),
      email: getValues("email"),
      password: getValues("password"),
      phone: getValues("phone"),
      address: getValues("address"),
    };
    // console.log("The user data", userData);
    axiosIntance
      .post("/auth/signup", userData)
      .then((res) => {
        onclose();
        if (res.data.success) toast("Successfully Signed Up!");
        else {
          setEr(res.data.message);
          toast("Failed to Sign Up!");
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  return (
    <div className="modalSignup">
      <div className="modal-content">
        <h1>SignUp</h1>
        <ToastContainer />
        {er.length > 0 && (
          <h4 style={{ color: "red", marginBottom: "2em" }}>{er}</h4>
        )}
        <form onSubmit={handleSubmit(handlerOnSubmit)}>
          <div>
            <label htmlFor="name">
              Full Name<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Full Name is required",
              }}
              render={({ field }) => (
                <input
                  placeholder="Ex. John Doe"
                  {...field}
                  style={{ border: errors.name ? "1px solid red" : "" }}
                />
              )}
            />
            {errors.name && (
              <p style={{ color: "red", fontSize: ".85em", marginTop: ".3em" }}>
                {errors.name.message}
              </p>
            )}
          </div>
          <br />
          <div>
            <label htmlFor="email">
              Email<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  placeholder="abc@email.com"
                  {...field}
                  style={{ border: errors.name ? "1px solid red" : "" }}
                />
              )}
            />
            {errors.email && (
              <p style={{ color: "red", fontSize: ".85em", marginTop: ".3em" }}>
                {errors.email.message}
              </p>
            )}
          </div>
          <br />
          <div>
            <label htmlFor="password">
              Password<span style={{ color: "red" }}>*</span>
            </label>{" "}
            <br />
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum length must be 6",
                },
                maxLength: {
                  value: 20,
                  message: "Max length must be 20",
                },
              }}
              render={({ field }) => (
                <input
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                  style={{ border: errors.password ? "1px solid red" : "" }}
                />
              )}
            />
            <span
              onClick={togglePassword}
              style={{
                position: "absolute",
                cursor: "pointer",
                margin: "6px",
                fontSize: ".9em",
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            {errors.password && (
              <p style={{ color: "red", fontSize: ".85em", marginTop: ".3em" }}>
                {errors.password.message}
              </p>
            )}
          </div>
          <br />
          <div>
            <label htmlFor="confirmPassword">
              Confirm Password<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Confirm Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum length must be 6",
                },
                maxLength: {
                  value: 20,
                  message: "Max length must be 20",
                },
                validate: (value) =>
                  value === watch("password") ||
                  "Confirm password should match with given password",
              }}
              render={({ field }) => (
                <input
                  placeholder="Enter Password"
                  type={showPassword2 ? "text" : "password"}
                  {...field}
                  style={{
                    border: errors.confirmPassword ? "1px solid red" : "",
                  }}
                />
              )}
            />
            <span
              onClick={togglePassword2}
              style={{
                position: "absolute",
                cursor: "pointer",
                margin: "6px",
                fontSize: ".9em",
              }}
            >
              {showPassword2 ? "Hide" : "Show"}
            </span>
            {errors.confirmPassword && (
              <p style={{ color: "red", fontSize: ".85em", marginTop: ".3em" }}>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <br />
          <div>
            <label htmlFor="phone">
              Phone<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone Number is required",
                min: {
                  value: 100000000,
                  message: "Phone must be 9 digit",
                },
                max: {
                  value: 999999999,
                  message: "Phone must be 9 digit",
                },
                validate: {
                  isInteger: (value) => {
                    const isInteger = /^\d+$/.test(value);
                    return isInteger || "Phone must be an integer";
                  },
                },
              }}
              render={({ field }) => (
                <input
                  placeholder="123456789"
                  {...field}
                  style={{ border: errors.phone ? "1px solid red" : "" }}
                />
              )}
            />
            {errors.phone && (
              <p style={{ color: "red", fontSize: ".85em", marginTop: ".3em" }}>
                {errors.phone.message}
              </p>
            )}
          </div>
          <br />
          <div>
            <label htmlFor="address">
              Address<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <Controller
              name="address"
              control={control}
              rules={{
                required: "Address is required",
              }}
              render={({ field }) => (
                <input
                  placeholder="Dhaka"
                  {...field}
                  style={{ border: errors.address ? "1px solid red" : "" }}
                />
              )}
            />
            {errors.address && (
              <p style={{ color: "red", fontSize: ".85em", marginTop: ".3em" }}>
                {errors.address.message}
              </p>
            )}
          </div>
          <button type="submit" className="signup">
            Submit
          </button>
        </form>
        <button className="close" onClick={onclose}>
          X
        </button>
      </div>
    </div>
  );
};

export default SignUp;
