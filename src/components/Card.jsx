import React, { useState, useEffect } from "react";
import "./Card.css";
import { postData, updateData } from "../API/PostApi";

function Card({ data, setData, setUpdateDataApi, updateDataApi }) {
  const [addData, setAddData] = useState({ title: "", body: "" });

  let isEmpty = Object.keys(updateDataApi).length === 0;

  useEffect(() => {
    if (!isEmpty) {
      setAddData({
        title: updateDataApi?.title || "",
        body: updateDataApi?.body || "",
      });
    }
  }, [updateDataApi]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({ ...prev, [name]: value }));
    console.log(`Field: ${name}, Value: ${value}`);
  };

  const addPostData = async () => {
    try {
      const res = await postData(addData);
      console.log("Response from API:", res);

      if (res && res.status === 201) {
        setData((prevData) => [...prevData, res.data]);
        setAddData({ title: "", body: "" });
      } else {
        console.error("Failed to add data:", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);
      if (res.status === 200) {
        setData((prev) =>
          prev.map((curEle) => (curEle.id === res.data.id ? res.data : curEle))
        );
        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEmpty) {
      addPostData();
    } else {
      updatePostData();
    }
  };

  return (
    <form className="card-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        autoComplete="off"
        id="title"
        name="title"
        placeholder="Add Title"
        className="input-field"
        value={addData.title}
        onChange={handleInputChange}
        required
      />

      <input
        type="text"
        autoComplete="off"
        id="body"
        name="body"
        placeholder="Add Post"
        className="input-field"
        value={addData.body}
        onChange={handleInputChange}
        required
      />

      <button type="submit" className="add-button">
        {isEmpty ? "Add" : "Edit"}
      </button>
    </form>
  );
}

export default Card;
