import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RecipeForm() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add data');
        }
        return response.json();
      })
      .then((result) => {
        console.log('Data added:', result);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
    
    setTimeout(() => {
      navigate('/Home');
    }, 500);
  };

  return (
<div class="container mt-5">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="card shadow-lg">
        <div class="card-header bg-black text-white text-center">
          <h4 class="mb-0">Add Recipe</h4>
        </div>
        <div class="card-body bg-light">
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label class="form-label">Image URL</label>
              <input
                type="text"
                class="form-control"
                name="Image"
                placeholder="Enter image URL"
                onChange={handleInput}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Recipe Name</label>
              <input
                type="text"
                class="form-control"
                name="Recipe"
                placeholder="Enter recipe name"
                onChange={handleInput}
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea
                class="form-control"
                name="discrption"
                rows="4"
                placeholder="Enter a brief description"
                onChange={handleInput}
              ></textarea>
            </div>
            <button type="submit" class="btn btn-success w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
}

export default RecipeForm;
