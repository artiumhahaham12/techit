import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import AddProduct from "./AddProduct";
import UpdateProduct from "./UpdateProduct";

interface UpdateProductModalProps {
  show: boolean;
  onHide: Function;
  refresh: Function;
  productId:string;
}
console.log(1);

const UpdateProductModal: FunctionComponent<UpdateProductModalProps> = ({
  onHide,
  refresh,
  show,
  productId,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        refresh={refresh}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateProduct
            onHide={onHide}
            refresh={refresh}
            productId={productId}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
