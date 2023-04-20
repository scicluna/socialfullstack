import Hamburger from './Hamburger'
import UserMenu from './UserMenu'

interface NavbarProp {
    filter: string
    handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
    user: User | undefined
    handleUser: (user?: User | undefined) => void
    dark: boolean
    handleDark: () => void
}

export default function Navbar({ filter, handleFilter, user, handleUser, dark, handleDark }: NavbarProp) {

    //dropdown when profile button pressed allowing for login
    //username/signin logic
    //implement darkmode/lightmode


    return (
        <nav className="fixed flex w-screen justify-between items-center p-5 bg-slate-100 h-16">
            <Hamburger dark={dark} handleDark={handleDark} />
            <input value={filter} onChange={handleFilter} type="text" placeholder='Search...'
                className="bg-slate-200 w-96 h-12 text-xl shadow-md" />
            <UserMenu user={user} handleUser={handleUser} />
        </nav>
    )
}