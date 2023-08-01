import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../sevices/UserService';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';
import ModalEditUser from './ModalEditUser';
import _ from 'lodash';
import ModalDeleteUser from './ModalDeleteUser';
import { debounce } from 'lodash'
import { CSVLink, CSVDownload } from "react-csv";
import './tableUser.scss'


const TableUser = (props) => {
  const [listUsers, setlistUsers] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [dataExporter, setDataExporter] = useState([]);
  // const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("esc")
  const [sortField, setSortField] = useState("id")

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
    cloneListUsers = cloneListUsers.filter(item => item.id !== user.id)
    setlistUsers(cloneListUsers);
  }

  useEffect(() => {
    getUsers(1);
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

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy)
    setSortField(sortField)
    let cloneListUsers = _.cloneDeep(listUsers);
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    setlistUsers(cloneListUsers);
  }

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    console.log('bhdvksbdvsv')
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers);
      cloneListUsers = cloneListUsers.filter(item => item.email.includes(term));
      setlistUsers(cloneListUsers);

    } else {
      getUsers(1);
    }
  }, 500)


  const getuserExport = (event, done) => {
    let result = [];
    if (listUsers && listUsers.length > 0) {
      result.push(['Id', 'Email', 'First name', 'Last name']);
      listUsers.map((item, index) => {
        let arr =[];
        arr[0]= item.id;
        arr[1]= item.email;
        arr[2]= item.first_name;
        arr[3]= item.last_name;
        result.push(arr)
      })
      setDataExporter(result);
      done();
    }

  }


  return (
    <>
      <div className="my-3 add-new">
        <span><b>List User:</b></span>
        <div className="btn-groups">
          <label
            className="btn btn-warning"
            htmlFor="test"
          >
            <i className="fa-solid fa-file-import"></i>
            Import
          </label>
          <input type='file' id='test' hidden />
          <CSVLink
            data={dataExporter}
            filename={"user.csv"}
            className="btn btn-primary"
            asyncOnClick={true}
            onClick={(event, done) => getuserExport(event, done)}
          >
            <i className="fa-solid fa-file-arrow-down"></i>
            Export
          </CSVLink>
          <button
            className="btn btn-success "
            onClick={() => {
              setIsShowModleAddNewUser(true);
            }}
          >
            <i className="fa-solid fa-circle-plus "></i>
            Add new</button>


        </div>
      </div>
      <div className="col-4 my-3">
        <input
          className="form-control"
          placeholder='search user by email...'
          // value={keyword}
          onChange={(event) => handleSearch(event)}

        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <span className="sort-header">
              <th>
                ID
              </th>
              <span>
                <i
                  class="fa-solid fa-arrow-up"
                  onClick={() => handleSort('asc', 'id')}
                >
                </i>
                <i
                  class="fa-solid fa-arrow-down"
                  onClick={() => handleSort('desc', 'id')}
                >
                </i>
              </span>
            </span>
            <th>Email</th>
            <span className="sort-header">
              <th>First Name</th>
              <span>
                <i
                  class="fa-solid fa-arrow-up"
                  onClick={() => handleSort('asc', 'first_name')}
                >
                </i>
                <i
                  class="fa-solid fa-arrow-down"
                  onClick={() => handleSort('desc', 'first_name')}
                >
                </i>
              </span>
            </span>
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
                      onClick={() => {
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
