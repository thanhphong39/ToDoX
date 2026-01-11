import React from 'react'

const NotFound = () => {
  return (
    <div className= "flex flex-col items-center justify-center min-h-screen bg-gray-50">
       <img
        src="404_NotFound.png"
        alt="not found"   
        className="w-1/2 max-w-md mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">  Sorry, the page you are looking for does not exist. </p>
      <a
        href="/"
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Trở về trang chủ
      </a>
    </div>
  )
}

export default NotFound