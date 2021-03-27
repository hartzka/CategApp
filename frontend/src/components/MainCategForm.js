import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'

const MainCategForm = ({
  addMainCateg,
  newMainCateg,
  handleMainCategChange
}) => {
  return (
    <div>
      <form onSubmit={addMainCateg}>
        <div>
          <h3>Add new category</h3>
          <InputGroup size="lg">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-lg">Category name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={newMainCateg} onChange={handleMainCategChange} aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
          </InputGroup>
        </div>
        <button class="btn btn-warning" type="submit" id="save_categ">Create</button>
      </form>
      <br></br>
    </div>
  )}

export default MainCategForm