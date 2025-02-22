import { FormikValues, useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup"
import { checkUser } from "../services/userService";
import { Link, useNavigate } from "react-router-dom";

interface LoginProps {
  changeIsAdmin:(isAdmin:boolean)=>void;
}
 
const Login: FunctionComponent<LoginProps> = ({changeIsAdmin}) => {
    let navigator = useNavigate()
    const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().required().email(),
      password: yup.string().required().min(8),
    }),
    onSubmit: (values,{resetForm}) => {
      console.log(values);
      
      checkUser(values).then((res) => {
        console.log(res.data);
        localStorage.setItem("token", JSON.stringify(res.data))
        alert("ok")
        navigator("/home")
      }).catch((error) => {
        console.log(error);alert("error")
      })
    },
  });
  return (
    <div className="container w-50 mt-5">
      <h5 className="display-5 my-2 text-center text-text-info-emphasis">Login</h5>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingInput">Email address</label>
          {formik.touched.email && formik.errors.email && (
            <p className="text-danger">{formik.errors.email}</p>
          )}
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label htmlFor="floatingPassword">Password</label>
          {formik.touched.password && formik.errors.password && (
            <p className="text-danger">{formik.errors.password}</p>
          )}
        </div>
        <button className="btn btn-primary w-100 mt-3" type="submit" disabled={!formik.dirty || !formik.isValid}>Login</button>
      </form>
      <p className=" text-center">
      <Link className=" text-secondary" to="/register">new user? register now</Link>

      </p>
    </div>
  );
}
 
export default Login;