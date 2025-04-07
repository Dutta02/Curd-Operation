import { useEffect, useState } from "react";
import { GetPost, deletePost } from "../API/PostApi.jsx";
import "./Posts.css";
import Card from "./Card.jsx";

function Posts() {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPostData = async () => {
    try {
      const res = await GetPost();
      if (res && res.data) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const updatedPosts = data.filter((curPost) => curPost.id !== id);
        setData(updatedPosts);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdatePost = (curEle) => setUpdateDataApi(curEle);

  return (
    <>
      <section className="section-Post">
        <section>
          <Card
            data={data}
            setData={setData}
            updateDataApi={updateDataApi}
            setUpdateDataApi={setUpdateDataApi}
          />
        </section>
        <ul>
          {data.map((curEle) => {
            const { id, body, title } = curEle;
            return (
              <li key={id}>
                <p>
                  <strong>{title}</strong>
                </p>
                <p>{body}</p>
                <button onClick={() => handleUpdatePost(curEle)}>Edit</button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeletePost(id)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Posts;
