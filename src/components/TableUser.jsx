import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../sevices/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';


const TableUser = (props) => {
  const [listUsers, setlistUsers] = useState([]);
  const [pageCount, setpageCount] = useState(0);

  const [isShowModleAddNewUser, setIsShowModleAddNewUser] = useState(false)
  const handleClose = () => {
    setIsShowModleAddNewUser(false);
  }

  const handleUpdateTable =(user)=>{
    setlistUsers([user,...listUsers]);
  }

  useEffect(() => {
    getUsers(2);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    console.log(res)

    if (res && res.data) {
      setlistUsers(res.data);
      setpageCount(res.total_pages)
    }
  }
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
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
            <th>Fist Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.fist_name}</td>
                  <td>{item.last_name}</td>
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

    </>
  );
}
export default TableUser;