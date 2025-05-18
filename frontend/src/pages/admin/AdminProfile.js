import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from "react";
import { authSuccess, updateProfilePhoto } from "../../redux/userRelated/userSlice";
import { FiEdit2 } from 'react-icons/fi';


import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled components
const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.6s ease-out forwards;
`;

const ProfileHeader = styled.h2`
  color: #3a4a6d;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
    margin: 0.5rem auto;
    border-radius: 2px;
  }
`;


const Avatar = styled.div`
  width: 100px;
  height: 100px;
  background: #4facfe;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
   
   

`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: rgba(0,0,0,0.6);
  border-radius: 50%;
  padding: 4px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;





const ProfileDetail = styled.div`
  background: white;
  padding: 1.5rem;
  margin: 1rem 0;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: #4a5568;
  min-width: 100px;
  display: inline-block;
`;

const DetailValue = styled.span`
  color: #2d3748;
  flex-grow: 1;
`;

const EditButton = styled.button`
  display: block;
  margin: 2rem auto 0;
  padding: 0.8rem 2rem;
  background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 172, 254, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 172, 254, 0.4);
    animation: ${pulse} 1.5s infinite;
  }
`;

const AdminProfile = () => {

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser.profilePhoto) {
      setPreview(currentUser.profilePhoto);
    }
  }, [currentUser.profilePhoto]);





  const [preview, setPreview] = useState(currentUser.profilePhoto || "");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const openFileDialog = () => {
    document.getElementById("fileInput").click();
  };


  const handleUpload = async () => {
    if (!file) return alert("Please select an image first.");

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const adminId = currentUser._id; //get admin id here

      const res = await fetch(`http://localhost:5000/upload-avatar/${adminId}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      dispatch(updateProfilePhoto(data.url));
      dispatch(authSuccess(data.admin))

      alert("Profile picture updated!");
    } catch (err) {
      console.error("upload error", err);
      alert("Upload failed");
    }
  };


  if (!currentUser) {
    return <ProfileContainer>Loading profile...</ProfileContainer>;
  }

  return (
    <ProfileContainer>
      <Avatar>
        {preview ? (
          <img src={preview} alt="Avatar" />
        ) : (
          currentUser.name.charAt(0)
        )}

        <IconWrapper onClick={openFileDialog}>
          <FiEdit2 size={16} />

        </IconWrapper>
      </Avatar>

      <input
        type="file"
        accept="image/*"
        id="fileInput"
        style={{ display: "none" }}
        onChange={handleFileChange} />

      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <EditButton onClick={handleUpload}>Upload Photo</EditButton>
      </div>

      <ProfileHeader>Admin Profile</ProfileHeader>

      <ProfileDetail>
        <DetailLabel>Name:</DetailLabel>
        <DetailValue>{currentUser.name}</DetailValue>
      </ProfileDetail>

      <ProfileDetail>
        <DetailLabel>Email:</DetailLabel>
        <DetailValue>{currentUser.email}</DetailValue>
      </ProfileDetail>

      <ProfileDetail>
        <DetailLabel>School:</DetailLabel>
        <DetailValue>{currentUser.schoolName}</DetailValue>
      </ProfileDetail>

      <EditButton>Edit Profile</EditButton>
    </ProfileContainer>
  );
};

export default AdminProfile;