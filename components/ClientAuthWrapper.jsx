'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import {
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import PageLink from './PageLink';
import AnchorLink from './AnchorLink';

const ClientAuthWrapper = () => {
    const { user, isLoading } = useUser();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Prevent hydration mismatch by ensuring consistent initial state
    if (!isClient) {
        return (
            <Nav className="d-none d-md-block" navbar>
                <NavItem id="qsLoginBtn">
                    <AnchorLink
                        href="/api/auth/login"
                        className="btn btn-primary btn-margin"
                        tabIndex={0}
                        testId="navbar-login-desktop">
                        Log in
                    </AnchorLink>
                </NavItem>
            </Nav>
        );
    }

    return (
        <>
            <Nav className="d-none d-md-block" navbar>
                {!isLoading && !user && (
                    <NavItem id="qsLoginBtn">
                        <AnchorLink
                            href="/api/auth/login"
                            className="btn btn-primary btn-margin"
                            tabIndex={0}
                            testId="navbar-login-desktop">
                            Log in
                        </AnchorLink>
                    </NavItem>
                )}
                {user && (
                    <UncontrolledDropdown nav inNavbar data-testid="navbar-menu-desktop">
                        <DropdownToggle nav caret id="profileDropDown">
                            <img
                                src={user.picture}
                                alt="Profile"
                                className="nav-user-profile rounded-circle"
                                width="50"
                                height="50"
                                decode="async"
                                data-testid="navbar-picture-desktop"
                            />
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header data-testid="navbar-user-desktop">
                                {user.name}
                            </DropdownItem>
                            <DropdownItem className="dropdown-profile" tag="span">
                                <PageLink href="/profile" icon="user" testId="navbar-profile-desktop">
                                    Profile
                                </PageLink>
                            </DropdownItem>
                            <DropdownItem id="qsLogoutBtn">
                                <AnchorLink href="/api/auth/logout" icon="power-off" testId="navbar-logout-desktop">
                                    Log out
                                </AnchorLink>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                )}
            </Nav>

            {!isLoading && !user && (
                <Nav className="d-md-none" navbar>
                    <AnchorLink
                        href="/api/auth/login"
                        className="btn btn-primary btn-block"
                        tabIndex={0}
                        testId="navbar-login-mobile">
                        Log in
                    </AnchorLink>
                </Nav>
            )}

            {user && (
                <Nav
                    id="nav-mobile"
                    className="d-md-none justify-content-between"
                    navbar
                    data-testid="navbar-menu-mobile">
                    <NavItem>
                        <span className="user-info">
                            <img
                                src={user.picture}
                                alt="Profile"
                                className="nav-user-profile d-inline-block rounded-circle mr-3"
                                width="50"
                                height="50"
                                decode="async"
                                data-testid="navbar-picture-mobile"
                            />
                            <h6 className="d-inline-block" data-testid="navbar-user-mobile">
                                {user.name}
                            </h6>
                        </span>
                    </NavItem>
                    <NavItem>
                        <PageLink href="/profile" icon="user" testId="navbar-profile-mobile">
                            Profile
                        </PageLink>
                    </NavItem>
                    <NavItem id="qsLogoutBtn">
                        <AnchorLink
                            href="/api/auth/logout"
                            className="btn btn-link p-0"
                            icon="power-off"
                            testId="navbar-logout-mobile">
                            Log out
                        </AnchorLink>
                    </NavItem>
                </Nav>
            )}
        </>
    );
};

export default ClientAuthWrapper;