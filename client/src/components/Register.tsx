import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addUser } from "../services/userService";
import User from "../interfaces/User";
import { AxiosResponse } from "axios";
import { createCart } from "../services/cartService";

interface RegisterProps {
  changeIsAdmin: (isAdmin: boolean) => void;
}

const Register: FunctionComponent<RegisterProps> = ({changeIsAdmin}) => {
  let navigator = useNavigate();
  const formik = useFormik({
    initialValues: { name:"",email: "", password: "", },
      validationSchema: yup.object({
        name:yup.string().required().min(2),
        email: yup.string().required().email(),
        password: yup.string().required().min(8),
    }),
      onSubmit: (values, { resetForm }) => {
          console.log(values);
        addUser({ ...values, isAdmin: false }).then((res: any) => {
          navigator("/home"); localStorage.setItem("user", JSON.stringify(res.data.id));
          createCart(res.data.id).then((res) => {
              console.log("cart created succefully")
              
            }).catch((error)=>{console.log(error);
            })
          })
        
    },
  });
    return (
      <div className="container w-50 mt-5">
        <h5 className="display-5 my-2 text-center text-text-info-emphasis">
          Register
        </h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="name@example.com"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="name">name address</label>
            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="email">Email address</label>
            {formik.touched.email && formik.errors.email && (
              <p className="text-danger">{formik.errors.email}</p>
            )}
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="password">Password</label>
            {formik.touched.password && formik.errors.password && (
              <p className="text-danger">{formik.errors.password}</p>
            )}
          </div>
          <button
            className="btn btn-outline-secondary w-100 mt-3"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            Registertion
          </button>
        </form>
        <p className=" text-center">
          <Link className=" text-secondary" to="/">
            already our user? sign in
          </Link>
        </p>
      </div>
    );
};

export default Register;
