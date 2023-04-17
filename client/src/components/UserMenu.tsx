import { useState, useRef } from "react"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons"

interface UserMenuProps {
    user: User | undefined
    handleUser: (user: User) => void
}

export default function UserMenu({ user, handleUser }: UserMenuProps) {
    const [open, setOpen] = useState<boolean>(false)
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    async function handleLogin(e: React.MouseEvent<HTMLButtonElement>, username: HTMLInputElement, password: HTMLInputElement) {
        e.preventDefault()

        if (!username || !password) return

        console.log(username.value)
        console.log(password.value)

        try {
            const response = await fetch('http://localhost:3001/api/users/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userName: username.value,
                        password: password.value
                    })
                })
            if (response.ok) {
                const data = await response.json();
                handleUser(data)
            } else {
                console.error('Login failed')
            }
        } catch (err) {
            console.error(err)
        }
    }

    async function handleSignup() {

    }

    return (
        <div>
            <button onClick={() => setOpen(open ? false : true)} className="bg-slate-300 border-solid rounded-full flex justify-center items-center w-16 h-16">
                <FontAwesomeIcon icon={faUser} size='3x' />
            </button>
            <div className={`fixed bg-slate-300 h-screen top-0 right-0 transition-all ease-in duration-200 w-64 ${open ? "translate-x-0" : "translate-x-96"}`}>
                <div className={`p-2 transition-all ease-in duration-200`}>
                    <ul className="flex flex-col items-end">
                        <button onClick={() => setOpen(open ? false : true)}>
                            <FontAwesomeIcon icon={faClose} size='3x' className="opacity-50 hover:opacity-100" />
                        </button>
                        <form className="flex flex-col items-end gap-2">
                            <label htmlFor="username">Username</label>
                            <input ref={username} name="username" type="text" placeholder="username..." />
                            <label htmlFor="password">Password</label>
                            <input ref={password} name="password" type="password" placeholder="password..." />
                            <div className="flex justify-around w-full">
                                <button className="bg-slate-500 w-16 rounded-sm opacity-50 hover:opacity-100" type="submit" onClick={(e) => {
                                    if (username.current && password.current) handleLogin(e, username.current, password.current);
                                }}>Login</button>
                                <button className="bg-slate-500 w-16 rounded-sm opacity-50 hover:opacity-100" type="submit">Sign Up</button>
                            </div>
                        </form>
                    </ul>
                </div>
            </div>
        </div>
    )
}

