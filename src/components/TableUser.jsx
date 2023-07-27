import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../sevices/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash';
import ModalDeleteUser from './ModalDeleteUser';


const TableUser = (props) => {
  const [listUsers, setlistUsers] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});


  const [isShowModleAddNewUser, setIsShowModleAddNewUser] = useState(false)
  const [isShowModleEditUser, setIsShowModleEditUser] = useState(false)
  const [IsShowModleDeleteUser, setIsShowModleDeleteUser] = useState(false)

  const handleClose = () => {
    setIsShowModleAddNewUser(false);
    setIsShowModleEditUser(false);
    setIsShowModleDeleteUser(false);
  }

  const handleUpdateTable = (user) => {
    setlistUsers([user, ...listUsers]);
  }

  const handleUpdateUserFromModle = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    let index = listUsers.findIndex(item => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setlistUsers(cloneListUsers);
  }

  const handleDeleteUserModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers=cloneListUsers.filter(item=> item.id !== user.id)
    setlistUsers(cloneListUsers);
  }

  useEffect(() => {
    getUsers(2);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    // console.log(res)

    if (res && res.data) {
      setlistUsers(res.data);
      setpageCount(res.total_pages)
    }
  }
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
  }

  const handlEditUser = (user) => {
    // console.log(user)
    setDataUserEdit(user);
    setIsShowModleEditUser(true);

  }

  const handleDeleteUser = (user) => {
    setDataUserDelete(user);
    setIsShowModleDeleteUser(true);
  }



  return (
    <>
      <div className="my-3 add-new">
        <span><b>List User:</b></span>
        <button
          className="btn btn-success "
          onClick={() => {
            setIsShowModleAddNewUser(true);
          }}
        >Add new user</button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        handlEditUser(item)
                      }}
                    >Edit</button>
                    <button 
                    className='btn btn-danger'
                    onClick={()=>{
                      handleDeleteUser(item)
                    }}
                    >Delete</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <ModalAddNewUser
        handleClose={handleClose}
        show={isShowModleAddNewUser}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser
        show={isShowModleEditUser}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleUpdateUserFromModle={handleUpdateUserFromModle}

      />
      <ModalDeleteUser
        show={IsShowModleDeleteUser}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserModal={handleDeleteUserModal}
      />

    </>
  );
}
export default TableUser;