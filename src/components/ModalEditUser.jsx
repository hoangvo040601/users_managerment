import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { putUpdateUser } from '../sevices/UserService'
import { toast } from 'react-toastify';

const ModalEditUser = (props) => {
  const { show, handleClose, dataUserEdit, handleUpdateUserFromModle } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  }
  const handleChangeJob = (e) => {
    setJob(e.target.value);
  }

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job)
    if (res && res.updatedAt) {
      //ss
      handleUpdateUserFromModle({
        first_name: name,
        id: dataUserEdit.id
      })
      handleClose();
      toast.success('Update succeed!')
    } else {
      //er
      toast.error('User not succeed!')
    }
  }

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name)
      setJob(dataUserEdit.job);
    }

  }, [dataUserEdit])

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="body-add-newUser">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={handleChangeName}
              />
            </div>
            <div className="form-group">
              <label>Job</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Job"
                value={job}
                onChange={handleChangeJob}
              />
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalEditUser;
