import { useSelector } from 'react-redux';
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
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <ProfileContainer>Loading profile...</ProfileContainer>;
  }

  return (
    <ProfileContainer>
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