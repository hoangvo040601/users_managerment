import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCrateUser } from '../sevices/UserService';
import { toast } from 'react-toastify';


const ModalAddNewUser = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  }
  const handleChangeJob = (e) => {
    setJob(e.target.value);
  }

  const handleSaveUser = async () => {
    let res = await postCrateUser(name, job);
    if (res && res.id) {
      //success
      handleClose();
      setName('');
      setJob('');
      toast.success('A user is created succeed!')
      handleUpdateTable({fist_name: name, id: res.id});
    }
    else {
      //error
      toast.error('An error...!')
    }
    // console.log(res)
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
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
                placeholder="Password"
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
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalAddNewUser;
