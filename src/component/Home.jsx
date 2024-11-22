import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function Home() {
  const [record, setRecord] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    recordCall();
  }, []);

  const recordCall = () => {
    fetch('http://localhost:3000/posts', {
      method: 'GET',
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setRecord(data);
      })
      .catch((err) => console.log(err));
  };

  const deleteData = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('Data deleted');
        recordCall();
      })
      .catch((err) => console.log(err));
  };

  const editData = (id) => {
    navigate(`/EdiePage/${id}`);
  };

  const sortData = (key) => {
    const sortedRecords = [...record].sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
    setRecord(sortedRecords);
  };

  const filteredRecords = record.filter((item) =>
    item.Recipe?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.discrption?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Data Page</h2>
      <Link to="/" className="btn btn-primary mb-3">Form</Link>
      <div className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Recipe or Description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
        </div>
        <div className="btn-group mt-3">
          <button
            className="btn btn-outline-dark"
            onClick={() => sortData('Recipe')}
          >
            Sort by Recipe
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={() => sortData('discrption')}
          >
            Sort by Description
          </button>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-dark table-striped-columns table-hover table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th colSpan="2" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((data, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={data.Image || 'https://via.placeholder.com/100'}
                    alt="Recipe"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                </td>
                <td>{data.Recipe}</td>
                <td>{data.discrption}</td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteData(data.id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => editData(data.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
