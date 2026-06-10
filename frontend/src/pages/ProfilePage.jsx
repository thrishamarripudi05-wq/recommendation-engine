import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const ProfilePage = () => {
  const { user } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(user?.username || '')

  const handleSave = async () => {
    try {
      await fetch('http://localhost:8000/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({ username })
      })
      setIsEditing(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="container">
        <h1>My Profile</h1>

        <div className="profile-container">
          <div className="profile-info">
            <div className="info-field">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>

            <div className="info-field">
              <label>Username</label>
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                <p>{user?.username}</p>
              )}
            </div>

            <div className="actions">
              {isEditing ? (
                <>
                  <button onClick={handleSave} className="btn-primary">Save</button>
                  <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
                </>
              ) : (
                <button onClick={() => setIsEditing(true)} className="btn-primary">Edit Profile</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
