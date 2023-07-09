
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { fetchAllUser } from '../sevices/UserService';

const TableUser = (props)=>{
  const [listUsers, setlistUsers] = useState([]);

  useEffect(()=>{
    getUsers();
  },[]);

  const getUsers = async () =>{
    let res = await fetchAllUser();
    console.log(res)

    if(res && res.data && res.data.data){
      setlistUsers(res.data.data);
    }
  }

    return (
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
            listUsers.map((item, index)=>{
              return(
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
  );
}
export default TableUser;