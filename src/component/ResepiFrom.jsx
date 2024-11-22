import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function RecipeForm() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success('Data added successfully!');
      })
      .catch((err) => {
        console.error('Error:', err);
      });

    setTimeout(() => {
      navigate('/Home');
    }, 500);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-black text-white">
              <h4 className="mb-0 text-center">Add Recipe</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="bg-dark">
                <div className="mb-3">
                  <label className="form-label">Image URL</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Image"
                    placeholder="Enter image URL"
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Recipe Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Recipe"
                    placeholder="Enter recipe name"
                    onChange={handleInput}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="discrption"
                    rows="3"
                    placeholder="Enter description"
                    onChange={handleInput}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
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
