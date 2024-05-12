import "./profileUpdatePage.scss";
import apiRequest from "../../lib/apiRequest";
import { useContext, useState } from "react";
import {AuthContext} from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

function ProfileUpdatePage() {
  const [error,setError] = useState("")
  const {currestUser,updateUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const {username,email,password} = Object.fromEntries(formData)


    try{
      const res = await apiRequest.put(`/users/${currestUser.id}`,{
        username,
        email,
        password
      })

      updateUser(res.data)
      navigate("/")
      
    }catch(err){
      console.log(err);
      setError(err.response.data.message)
    }
  }


  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img src="" alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
