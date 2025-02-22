import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup"
import { addProduct } from "../services/productsService";
import { error } from "console";
interface AddProductProps {
  onHide:Function; 
  refresh:Function; 
}
 
const AddProduct: FunctionComponent<AddProductProps> = ({onHide,refresh}) => {
    const formik = useFormik({
      initialValues: {
        
        name: "",
        price: 0,
        description: "",
        image: "",
        category: "",
        
      },
      validationSchema: yup.object({
        name: yup.string().required(),
        price: yup.number().required().min(0),
        category: yup.string().required().min(2),
        description: yup.string().required(),
        image: yup.string().required().url(),
      }),
      onSubmit: (values) => {
          console.log(values);
        addProduct({ ...values, available: true })
            .then((res) => {
                alert("add success");
                refresh();
                onHide();
            })
            .catch((error) => {
              console.log(error);
            });
      },
    });
    return (
      <>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder=""
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="name">name</label>
            {formik.touched.name && formik.errors.name && (
              <p className="text-danger">{formik.errors.name}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="number"
              className="form-control"
              id="price"
              placeholder="0"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="price">price</label>
            {formik.touched.price && formik.errors.price && (
              <p className="text-danger">{formik.errors.price}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="category"
              placeholder="0"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="category">category</label>
            {formik.touched.category && formik.errors.category && (
              <p className="text-danger">{formik.errors.category}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="image"
              placeholder="0"
              name="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="image">image(url)</label>
            {formik.touched.image && formik.errors.image && (
              <p className="text-danger">{formik.errors.image}</p>
            )}
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="description">description</label>
            {formik.touched.description && formik.errors.description && (
              <p className="text-danger">{formik.errors.description}</p>
            )}
          </div>
          <button
            className="btn btn-success w-100 mt-3"
            type="submit"
            disabled={!formik.dirty || !formik.isValid}
          >
            add
          </button>
        </form>
      </>
    );
}
 
export default AddProduct;