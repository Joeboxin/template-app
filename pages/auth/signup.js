import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useStateContext } from '@/context/StateContext';
import { signUp, checkSignInMethods } from '@/backend/Auth'; // Import the signUp and checkSignInMethods functions
import Link from 'next/link';
import Navbar from '@/components/Dashboard/Navbar';

const Signup = () => {
  const { user, setUser } = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State for error messages
  const router = useRouter();

  async function validateEmail() {
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return false;
    }
  
    try {
      const methods = await checkSignInMethods(email);
      if (methods.length > 0) {
        setError('Email is already in use.');
        return false;
      }
      return true; // Email is valid and not in use
    } catch (error) {
      console.error('Error checking email:', error.message);
      setError('An error occurred. Please try again.');
      return false;
    }
  }

  async function handleSignup() {
    setError(''); // Clear previous errors
    const isValidEmail = await validateEmail();
    if (!isValidEmail) return;

    try {
      await signUp(email, password);
      console.log('User signed up successfully');
      router.push('/dashboard'); // Redirect to dashboard after successful signup
    } catch (error) {
      console.error('Signup failed:', error.message);
      setError('An error occurred. Please try again.'); // Display error message
    }
  }

  return (
    <>
      <Navbar />
      <Section>
        <Header>Signup</Header>
        {error && <ErrorMessage>{error}</ErrorMessage>} {/* Display error message */}
        <InputTitle>Email</InputTitle>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <InputTitle>Password</InputTitle>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <UserAgreementText>
          By signing in, you automatically agree to our{' '}
          <UserAgreementSpan href="/legal/terms-of-use" rel="noopener noreferrer" target="_blank">
            Terms of Use
          </UserAgreementSpan>{' '}
          and{' '}
          <UserAgreementSpan href="/legal/privacy-policy" rel="noopener noreferrer" target="_blank">
            Privacy Policy.
          </UserAgreementSpan>
        </UserAgreementText>

        <MainButton onClick={handleSignup}>Signup</MainButton>
      </Section>
    </>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const InputTitle = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const MainButton = styled.button`
  background-color: #55d59e;
  color: #0e131f;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45b88d;
  }
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  text-align: center;
`;

const UserAgreementSpan = styled(Link)`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

export default Signup;