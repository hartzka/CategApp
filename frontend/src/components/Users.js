import { Table } from 'react-bootstrap'
import React from 'react'

const Users = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th></th>
            <th>Category items created</th>
          </tr>
          {users.map(user =>
            <tr align='left'>
              <th>{user.name}</th>
              <th>{user.categs.length}</th>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
