import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import AddProduct from "./AddProduct";

interface AddproductModalProps {
    show: boolean;
    onHide:Function
    refresh:Function
}
 
const AddproductModal: FunctionComponent<AddproductModalProps> = ({show,refresh,onHide}) => {
    return (
      <>
        <Modal
          show={show}
          onHide={() => {
            onHide();
          }}
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
            <AddProduct onHide={onHide} refresh={refresh} />
          </Modal.Body>
          <Modal.Footer>
            {/* <Button onClick={()=>{}}>Close</Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
}
 
export default AddproductModal;