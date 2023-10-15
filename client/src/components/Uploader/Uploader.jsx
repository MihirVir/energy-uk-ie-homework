import React, {useState} from 'react'
import axios from 'axios';
import "./uploader.css"
const Uploader = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(false);

    const handleFile = (event) => {
        const file = event.target.files[0];
        setFile(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = new FormData();
            data.append('pdfFile', file);
            await axios.post("http://localhost:5000/home", data);
            setFile(null);
            setError(null)
        } catch (err) {
            setError(true);
        }
    }
  return (
    <>
        <div className = "uploader-container">
            {error && <p style = {{color: "red"}}>Error uploading the file</p>}
            <form onSubmit = {handleSubmit}>
                <label htmlFor="file" className = "file-input-label">
                    Choose a file
                </label>
                <input onChange = {handleFile} type="file" id = "file" className = "file-input"/>
                <button>
                    Submit
                </button>
            </form>
            <div className = "file-name-container">
                {file && (
                    <>
                        <p>{file.name} </p>
                        <button onClick = {() => {setFile(null)}} >delete</button>
                    </>
                )}
            </div>
        </div>
        
    </>
  )
}

export default Uploader