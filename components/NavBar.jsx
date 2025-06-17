'use client';

import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { useUser } from '@auth0/nextjs-auth0';

import PageLink from './PageLink';
import ClientAuthWrapper from './ClientAuthWrapper';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-container" data-testid="navbar">
      <Navbar color="light" light expand="md">
        <Container>
          <NavbarBrand className="logo" />
          <NavbarToggler onClick={toggle} data-testid="navbar-toggle" />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar data-testid="navbar-items">
              <NavItem>
                <PageLink href="/" className="nav-link" testId="navbar-home">
                  Home
                </PageLink>
              </NavItem>
              {user && (
                <>
                  <NavItem>
                    <PageLink href="/csr" className="nav-link" testId="navbar-csr">
                      Client-side rendered page
                    </PageLink>
                  </NavItem>
                  <NavItem>
                    <PageLink href="/ssr" className="nav-link" testId="navbar-ssr">
                      Server-side rendered page
                    </PageLink>
                  </NavItem>
                  <NavItem>
                    <PageLink href="/external" className="nav-link" testId="navbar-external">
                      External API
                    </PageLink>
                  </NavItem>
                </>
              )}
            </Nav>
            <ClientAuthWrapper />
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;