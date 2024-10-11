import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {

  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        setPosts(data); 
      } catch (err) {
        setError(err.message); 
      }
    };

    fetchPosts();
  }, []); 
  return (
    <div className="App">
      <h1>Blog Posts</h1>
      {error ? (
        <div className="error">
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      ) : posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
