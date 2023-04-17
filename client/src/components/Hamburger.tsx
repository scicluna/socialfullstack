import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function Hamburger() {
    const [hamburger, setHamburger] = useState<boolean>(false)
    const [dark, setDark] = useState<boolean>(false)
    return (
        <div>
            <button onClick={() => { hamburger ? setHamburger(false) : setHamburger(true) }}>
                <FontAwesomeIcon icon={faBars} size='3x' className="text-slate-600 hover:text-slate-900" />
            </button>
            <div className={`fixed bg-slate-300 h-screen top-0 left-0 transition-all ease-in duration-200 ${hamburger ? "w-64" : "w-0"} `}>
                <div className={`p-2 transition-all ease-in duration-200 ${hamburger ? "translate-x-0" : "-translate-x-96"}`}>
                    <ul className="flex flex-col items-start">
                        <button onClick={() => { hamburger ? setHamburger(false) : setHamburger(true) }}>
                            <FontAwesomeIcon icon={faClose} size='3x' className="opacity-50 hover:opacity-100" />
                        </button>
                        <button className="flex items-center" onClick={() => setDark(dark ? false : true)}>
                            <FontAwesomeIcon icon={dark ? faSun : faMoon} size='3x' />
                            <p>{dark ? "Light Mode" : "Dark Mode"}</p>
                        </button>
                    </ul>
                </div>
            </div>
        </div >
    )
}