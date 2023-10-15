import React from 'react'
import Header from '../components/Header/Header'
import Uploader from '../components/Uploader/Uploader'
import "./uploadpage.css"
import List from '../components/List/List'
const UploadPage = () => {
  return (
    <>
        <Header />
        <main className = "main-container">
            <div className="content-wrapper">
                <Uploader />
                <List />  
            </div>
        </main>
    </>
  )
}

export default UploadPage