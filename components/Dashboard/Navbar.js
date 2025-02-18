import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { logOut } from '@/backend/Auth';
import { useStateContext } from '@/context/StateContext';
import { signUp, signIn } from '@/backend/Auth'; // Import your API functions

const Navbar = () => {
  const { setUser } = useStateContext();

  // Example email and password for sign-up and sign-in
  const handleSignUp = async () => {
    const email = 'user@example.com';
    const password = 'password123';
    try {
      await signUp(email, password);
      console.log('User signed up successfully');
      // Redirect or update UI as needed
    } catch (error) {
      console.error('Sign-up failed:', error.message);
    }
  };

  const handleSignIn = async () => {
    const email = 'user@example.com';
    const password = 'password123';
    try {
      await signIn(email, password);
      console.log('User signed in successfully');
      // Redirect or update UI as needed
    } catch (error) {
      console.error('Sign-in failed:', error.message);
    }
  };

  return (
    <Nav>
      <Logo onClick={() => logOut(setUser)} href="/">
        Loose
      </Logo>
      <NavLinks>
        <ButtonLink href="/auth/signup" onClick={handleSignUp}>
          Sign Up
        </ButtonLink>
        <ButtonLink href="/auth/login" onClick={handleSignIn}>
          Login
        </ButtonLink>
      </NavLinks>
    </Nav>
  );
};

// Keep the styled components the same as before
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #0E131F;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: #55D59E;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const ButtonLink = styled(Link)`
  background-color: #55D59E;
  color: #0E131F;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45b88d;
  }
`;

export default Navbar;