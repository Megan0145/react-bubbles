import React, { useState } from "react";
import withAuth from "../axios";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, deleteColor, props }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    console.log(colorToEdit)
  };

  const addColor = (e) => {
    e.preventDefault();
    withAuth()
    .post('http://localhost:5000/api/colors', {id: newColor.id, color: newColor.color, code: newColor.code})
    .then(res => {console.log(res)})
    .catch(err => {console.log(err)})
  }

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    withAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, {id: colorToEdit.id, color: colorToEdit.color, code: colorToEdit.code})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }



  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer">
      {/* stretch - build another form here to add a color */}
      <form>
        <h1>Add Color</h1>
        <input  placeholder='Color' onChange={e => setNewColor({color: e.target.value, ...newColor})}/>
        <input  placeholder='Hex' onChange={e => setNewColor({code: { hex: e.target.value }, ...newColor})}/>
        <button onClick={addColor}>Add Color</button>
      </form>
      </div>
    </div>
  );
};

export default ColorList;
