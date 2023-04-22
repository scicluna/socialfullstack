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

//cool navbar
export default function Navbar({ filter, handleFilter, user, handleUser, dark, handleDark }: NavbarProp) {
    return (
        <nav className="fixed flex w-screen justify-between items-center p-5 bg-slate-100 dark:bg-slate-700 h-16 shadow-slate-500 shadow-sm">
            <Hamburger dark={dark} handleDark={handleDark} />
            <input value={filter} onChange={handleFilter} type="text" placeholder='Search...'
                className=" w-96 h-12 text-xl shadow-md" />
            <div className='relative'>
                {user ? '' : <span className='absolute top-8 -left-12 text-xl w-fit text-white'>Log In</span>}
                <UserMenu user={user} handleUser={handleUser} />
            </div>
        </nav>
    )
}