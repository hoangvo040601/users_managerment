import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { deleteUser } from '../sevices/UserService'
import { toast } from 'react-toastify';


const ModalDeleteUser = (props) => {
    const { show, handleClose, dataUserDelete, handleDeleteUserModal} = props;
    const confirmDeleteUser = async () => {
        let res = await deleteUser(dataUserDelete.id)
        if (res && +res.statusCode === 204) {
            toast.success("Delete user succeeded")
            handleClose();
            handleDeleteUserModal(dataUserDelete);
        } else {
            toast.error("Delete user failed")
        }
    }
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a User!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="body-add-newUser">
                        Are you sure you want to delete!
                        Do you want to delete this user
                        <br />
                        <b>
                            email= {dataUserDelete.email}.
                        </b>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={confirmDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalDeleteUser;