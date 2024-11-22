import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPage() {
    const [user, setUser] = useState({
        Image: '',
        Recipe: '',
        discrption: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((data) => {
                setUser(data);
            })
            .catch((Error) => {
                console.log(Error);
            });
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Submitting data:", user);
  
      fetch(`http://localhost:3000/posts/${id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
      })
          .then((res) => {
              if (!res.ok) {
                  throw new Error('Failed to update data');
              }
              console.log("Data updated successfully");
              navigate('/Home'); 
          })
          .catch((err) => {
              console.error("Error updating data:", err);
          });
  };
  
  

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg">
                        <div className="card-header bg-black text-white text-center">
                            <h4 className="mb-0">Edit Recipe</h4>
                        </div>
                        <div className="card-body bg-light">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Image URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="Image"
                                        placeholder="Enter image URL"
                                        onChange={handleInput}
                                        value={user.Image || ''}
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
                                        value={user.Recipe || ''}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control"
                                        name="discrption"
                                        rows="4"
                                        placeholder="Enter a brief description"
                                        onChange={handleInput}
                                        value={user.discrption || ''}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-success w-100">
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

export default EditPage;
