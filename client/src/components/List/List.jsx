import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "./list.css"
const List = () => {
  const [pdfs, setPdfs] = useState([]);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [id, setId] = useState('');
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/home");
      setPdfs(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  const deleteFile = async (itemId) => {
    setId(itemId);
    try {
      const res = await axios.delete(`http://localhost:5000/home/${id}`);
      alert(res.status)
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchData()
  }, [pdfs])
  return (
    <>
      <div className="list-container">
          <h1>List</h1>
          <div className="card-container">
            {pdfs && pdfs.map((item) => {
              return (
                <>
                  <div key = {item.id} className="card">
                    <p>{item.mergedfile}</p>
                    <p>{item.filename}</p>
                    <button onClick = {() => {deleteFile(item.id)}} className = "delete-pdf-btn" >Delete</button>
                  </div>
                </>
              )
            })}
          </div>
      </div>
    </>
  )
}

export default List