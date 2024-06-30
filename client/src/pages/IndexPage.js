import Post from "../Post";
import {useEffect, useState} from "react";
import axios from "axios"

import serverUrlFunction from "../config";

const serverUrl = serverUrlFunction();

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const result = await axios.get(`${serverUrl}/post`)
  
      setPosts(result.data)
    }
    getPosts()
  }, [])

  return (
    <>
      {posts.length > 0 && posts.map((post,index) => (
        <Post key={index} {...post} />
      ))}
    </>
  );
}