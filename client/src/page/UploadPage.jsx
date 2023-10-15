import React from 'react'
import Header from '../components/Header/Header'
import Uploader from '../components/Uploader/Uploader'
import "./uploadpage.css"
const UploadPage = () => {
  return (
    <>
        <Header />
        <main className = "main-container">
            <div className="content-wrapper">
                <Uploader />
            </div>
        </main>
    </>
  )
}

export default UploadPage