import React from 'react'
import { DropdownButton, Dropdown, FormControl, InputGroup } from 'react-bootstrap'

const SubCategForm = ({
  addSubCateg,
  newSubCateg,
  handleSubCategChange,
  selectedNewSubCateg,
  handleSelectedNewSubCategChange,
  subCategories,
  newName,
  handleNameChange,
  newDescription,
  handleDescriptionChange,
  newImage,
  handleImageChange,
  title,
  selectedCateg
}) => {
  return (
    <div>
      <form onSubmit={addSubCateg}>
        <div>
          <h3>{title}</h3>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Main category</span>
            </div>
            <input
              value={selectedCateg.mainCateg}
              disabled={true}
              id="main-category"
              type="text"
              class="form-control"
              aria-describedby="inputGroup-sizing-default" />
          </div>

          <InputGroup>
            <FormControl
              placeholder="Type new subcategory or select existing one (optional)"
              value={newSubCateg}
              onChange={handleSubCategChange}
              id="subcategory"
            />

            <DropdownButton
              as={InputGroup.Append}
              variant="outline-secondary"
              title={selectedNewSubCateg}
              id="input-group-dropdown-2"
              onSelect={e =>
                handleSelectedNewSubCategChange(e)
              }
            >
              {subCategories.map(categ => (
                <Dropdown.Item eventKey={categ}>{categ}</Dropdown.Item>
              ))}
            </DropdownButton>
          </InputGroup>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Name</span>
            </div>
            <input
              value={newName}
              onChange={handleNameChange}
              id="name"
              type="text"
              class="form-control"
              aria-describedby="inputGroup-sizing-default" />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Description</span>
            </div>
            <input
              value={newDescription}
              onChange={handleDescriptionChange}
              id="description"
              type="text"
              class="form-control"
              aria-describedby="inputGroup-sizing-default" />
          </div>
        </div>
        <div className="process">
          <h4 className="process_heading">Image</h4>
          <p className="process_details">Upload image to server</p>

          <input type="file" className="process_upload-btn" onChange={handleImageChange} />
          <img src={newImage !== undefined ? newImage.multerImage : null} id="upload-image" className="process_image" />
        </div>
        <br></br>
        <button class="btn btn-success" type="submit" id="save_blog">Create</button>
      </form>
      <br></br>
    </div>
  )}

export default SubCategForm
