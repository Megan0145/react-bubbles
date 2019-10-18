import React, { useState, useEffect } from "react";
import withAuth from '../axios';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    getColors();
  }, [colorList])

  const getColors = () => {
    withAuth()
    .get("http://localhost:5000/api/colors")
    .then(res => setColorList(res.data))
    .catch(err => console.log(err))
  }
  const deleteColor = color => {
    // make a delete request to delete this color
    withAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      console.log(res.data)
      console.log(colorList)
    })
    .catch(err => console.log(err))
  };
  

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} deleteColor={deleteColor}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
