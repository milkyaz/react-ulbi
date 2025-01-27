import { useState, useRef } from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
import PostForm from "./components/PostForm";
import "./styles/App.css";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "wqrqw", body: "dd" },
    { id: 2, title: "rsraaw 2", body: "aa" },
    { id: 3, title: "Jaqwwt 3", body: "cc" },
  ]);

  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  function getSortedPosts() {
    console.log("ОТРАБОТАЛА ФУНКЦИЯ СОРТИРОВКИ");
    if (selectedSort) {
      return [...posts].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      );
    }
    return posts;
  }

  const sortedPosts = getSortedPosts();

  const sortPosts = (sort) => {
    setSelectedSort(sort);
  };
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <div>
        <MyInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск..."
        />
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          options={[
            { value: "title", name: "По названию " },
            { value: "body", name: "По описанию " },
          ]}
        />
      </div>
      {posts.length ? (
        <PostList
          remove={removePost}
          posts={sortedPosts}
          title="Список постов"
        />
      ) : (
        <h1 style={{ textAlign: "center" }}>Посты не найдены!</h1>
      )}
    </div>
  );
}

export default App;
