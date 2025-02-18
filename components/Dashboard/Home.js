import React from 'react';
import styled from 'styled-components';
import { logOut } from '@/backend/Auth'; // Import your API functions
import { uploadFile, getFileURL } from '@/backend/Storage'; // Import storage functions

const Home = () => {
  const handleLogOut = async () => {
    try {
      await logOut();
      console.log('User logged out successfully');
      // Redirect or update UI as needed
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  const handleUploadFile = async () => {
    const file = new File(['Hello, world!'], 'example.txt', { type: 'text/plain' });
    const path = 'uploads/example.txt';
    try {
      const downloadURL = await uploadFile(file, path);
      console.log('File uploaded. Download URL:', downloadURL);
    } catch (error) {
      console.error('File upload failed:', error.message);
    }
  };

  const handleDownloadFile = async () => {
    const path = 'uploads/example.txt';
    try {
      const downloadURL = await getFileURL(path);
      console.log('File download URL:', downloadURL);
      // Optionally, open the download URL in a new tab
      window.open(downloadURL, '_blank');
    } catch (error) {
      console.error('File download failed:', error.message);
    }
  };

  return (
    <Container>
      <Title>Welcome to Loose</Title>
      <Button onClick={handleUploadFile}>Upload File</Button>
      <Button onClick={handleDownloadFile}>Download File</Button>
      <Button onClick={handleLogOut}>Log Out</Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #0E131F;
  margin-bottom: 20px;
`;

const Button = styled.button`
  background-color: #55D59E;
  color: #0E131F;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45b88d;
  }
`;

export default Home;