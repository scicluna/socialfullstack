import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {

    //dropdown when profile button pressed allowing for login
    //options dropdown when hamburgers pressed
    //filter options when searchbar queried

    return (
        <nav className="flex w-auto justify-between items-center p-5 bg-slate-100">
            <button>
                <FontAwesomeIcon icon={faBars} size='3x' />
            </button>
            <input type="text" placeholder='Search...' className="bg-slate-200 w-96 h-12 text-xl shadow-md"></input>
            <button className="bg-slate-300 border-solid rounded-full flex justify-center items-center w-16 h-16">
                <FontAwesomeIcon icon={faUser} size='3x' />
            </button>
        </nav>
    )
}