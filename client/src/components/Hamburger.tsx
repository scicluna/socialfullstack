import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import SlidingMenu from './SlidingMenu';

interface HamburgerProps {
    dark: boolean
    handleDark: () => void
}

//left menu
export default function Hamburger({ dark, handleDark }: HamburgerProps) {
    return (
        <SlidingMenu icon={faBars} direction='left'>
            <button className="flex items-center w-32" onClick={() => handleDark()}>
                <FontAwesomeIcon icon={dark ? faSun : faMoon} size='3x' />
                <p>{dark ? "Light Mode" : "Dark Mode"}</p>
            </button>
        </SlidingMenu>
    )
}