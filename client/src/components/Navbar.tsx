import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Hamburger from './Hamburger'

interface NavbarProp {
    filter: string
    handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Navbar({ filter, handleFilter }: NavbarProp) {

    //dropdown when profile button pressed allowing for login
    //options dropdown when hamburgers pressed


    return (
        <nav className="fixed flex w-screen justify-between items-center p-5 bg-slate-100 h-16">
            <Hamburger />
            <input value={filter} onChange={handleFilter} type="text" placeholder='Search...'
                className="bg-slate-200 w-96 h-12 text-xl shadow-md" />
            <button className="bg-slate-300 border-solid rounded-full flex justify-center items-center w-16 h-16">
                <FontAwesomeIcon icon={faUser} size='3x' />
            </button>
        </nav>
    )
}