import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteProduct } from "../services/productsService";

interface DeleteProductModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    productId: string;
}
const DeleteProductModal: FunctionComponent<DeleteProductModalProps> = ({onHide,show,refresh,productId}) => {
    return (
      <>
        <Modal
          show={show}
          onHide={() => onHide()}
          refresh={refresh}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body><p>are you sure?</p></Modal.Body>
          <Modal.Footer>
                    <Button variant="secondary" onClick={() => {onHide()
            }}>Cancel</Button>
                    <Button variant="danger" onClick={() => {
                        deleteProduct(productId).then(() => { refresh();onHide() }).catch((err)=>{console.log(err);
                        })
                    }}>Delete</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
 
export default DeleteProductModal;