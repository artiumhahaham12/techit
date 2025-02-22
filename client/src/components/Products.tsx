import { FunctionComponent, useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import Product from "../interfaces/Product";
import User from "../interfaces/User";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getAllProducts } from "../services/productsService";
import { getUserById } from "../services/userService";

import React from "react";
import AddproductModal from "./AddProductModal";
import UpdateProductModal from "./UpdateProductModal";
import DeleteProductModal from "./DeleteProductModal";
import { addToCart } from "../services/cartService";

interface ProductsProps {
  isAdmin: boolean;
}

const Products: FunctionComponent<ProductsProps> = ({ isAdmin }) => {
  const navigator = useNavigate();
  let [productFlag, setProductFlag] = useState<boolean>(false);
  let refresh = () => {
    setProductFlag(!productFlag);
  };
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [productId, setProductId] = useState<string>("");
  const userId: string = JSON.parse(
    localStorage.getItem("user") as string
  ) as string;
  let [products, setProducts] = useState<Product[]>([
    {
      name: "",
      price: 0,
      category: "",
      description: "",
      image: "",
      
    },
  ]);
  let [user, setUser] = useState<User>({ email: "", password: "", });
  useEffect(() => {
    getUserById()
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
        
      });
    getAllProducts().then((res:any) => setProducts(res.data));
  }, [productFlag]);
  console.log(isAdmin);

  return (
    <>
      <Navbar />
      <h3 className="m-0 m-auto my-5">Market</h3>
      {isAdmin && (
        <button
          className="m-0 m-auto btn btn-success my-3"
          onClick={() => {
            setOpenAddModal(true);
            setProductFlag(!productFlag);
          }}
        >
          add product
        </button>
      )}
      <div className="container">
        <div className="row m-3">
          {products.length ? (
            products.map((product: Product) => {
              if (product.available) {
                return (
                  <div className="col-6 my-1" key={product.id}>
                    <div className="card">
                      <img
                        className="card-img-top h-25"
                        src={product.image}
                        alt="Card image cap"
                        style={{ height: "100%" }}
                      ></img>
                      <div className="card-body h-75 ">
                        <h5 className="card-title">{product.name}</h5>
                        <h6 className="card-text text-success">{product.price}$</h6>
                        <p
                          className="card-text"
                          style={{  overflowY: "scroll" }}
                        >
                          {product.description}
                        </p>
                        {user.isAdmin ? (
                          <div className="h-25">
                            <button className="btn btn-danger m-1">
                              <i
                                className="fa-solid fa-trash"
                                
                                  onClick={() => {
                                setOpenDeleteModal(true);
                                setProductId(product.id as string);
                              
                                
                                }}
                              ></i>
                            </button>
                            <button
                              className="btn btn-info m"
                              onClick={() => {
                                setOpenUpdateModal(true);
                                setProductId(product.id as string);
                              }}
                            >
                              <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className="btn btn-primary mx-1"  onClick={() => {
                          addToCart(product.id as string)
                            .then(() => {
                              alert("Product was added successfully");
                            })
                            .catch((err) => console.log(err));
                        }}>
                              add to cart
                            </button>
                          </div>
                        ) : (
                          <button className="btn btn-primary mx-1">
                            add to cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <>No Products Yet</>
          )}
        </div>
      </div>
      <AddproductModal
        show={openAddModal}
        onHide={() => {
          setOpenAddModal(false);
        }}
        refresh={refresh}
      />
      <UpdateProductModal
        show={openUpdateModal}
        onHide={() => {
          setOpenUpdateModal(false);
        }}
        refresh={refresh}
        productId={productId}
      />
      <DeleteProductModal
        show={openDeleteModal}
        onHide={() => {
          setOpenDeleteModal(false);
        }}
        refresh={refresh}
        productId={productId}
      />
    </>
  );
};

export default Products;
