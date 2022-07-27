/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container className="navigation">
        <Link passHref href="/">
          <Navbar.Brand>🏀 TEAM ROSTER 🏀</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="justify-content-end">
          <Nav className="ml-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Players</Nav.Link>
            </Link>
            <Link passHref href="/players/new">
              <Nav.Link>Add Player</Nav.Link>
            </Link>
            <Link passHref href="../teams/teams">
              <Nav.Link>Teams</Nav.Link>
            </Link>
            <Link passHref href="/teams/new">
              <Nav.Link>Add Team</Nav.Link>
            </Link>
            <Link passHref href="/profile">
              <Nav.Link>
                <img src={user.photoURL} alt="user" className="user-icon" />
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
