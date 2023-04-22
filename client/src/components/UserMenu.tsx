import { useState, useRef } from "react"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import SlidingMenu from "./SlidingMenu"

const API_URL = process.env.NODE_ENV === 'production'
    ? window.location.origin
    : 'http://localhost:3001';

interface UserMenuProps {
    user: User | undefined
    handleUser: (user?: User | undefined) => void
}

export default function UserMenu({ user, handleUser }: UserMenuProps) {
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)

    //handles user login
    async function handleLogin(e: React.MouseEvent<HTMLButtonElement>, username: HTMLInputElement, password: HTMLInputElement) {
        e.preventDefault()
        if (!username || !password) return
        try {
            const response = await fetch(`${API_URL}/api/users/login`,
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
                window.alert('Login Failed. Invalid Username or Password. Please try again.')
            }
        } catch (err) {
            console.error(err)
        }
    }

    //handles the signup button
    async function handleSignup(e: React.MouseEvent<HTMLButtonElement>, username: HTMLInputElement, password: HTMLInputElement, email: HTMLInputElement) {
        e.preventDefault()
        if (!username || !password || !email) return
        try {
            const response = await fetch(`${API_URL}/api/users/signup`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userName: username.value,
                        password: password.value,
                        email: email.value
                    })
                })
            if (response.ok) {
                const data = await response.json();
                handleUser(data)
            } else {
                window.alert('Signup Failed. Invalid Username, Password, or Email. Please try again.')
            }
        } catch (err) {
            console.error(err)
        }
    }

    //actual jsx / right menu
    return (
        <div>
            <SlidingMenu icon={faUser} direction="right">
                {!user ? <form className="flex flex-col items-end gap-2">
                    <label htmlFor="username">Username</label>
                    <input className="text-black" ref={username} name="username" type="text" required placeholder="username..." />
                    <label htmlFor="password">Password</label>
                    <input className="text-black" ref={password} name="password" type="password" required placeholder="password..." />
                    <label htmlFor="email">Password</label>
                    <input className="text-black" ref={email} name="email" type="email" placeholder="email..." />
                    <div className="flex justify-around w-full">
                        <button className="bg-slate-500 dark:text-slate-50 w-16 rounded-sm opacity-50 hover:opacity-100" type="submit" onClick={(e) => {
                            if (username.current && password.current) handleLogin(e, username.current, password.current);
                        }}>Login</button>
                        <button className="bg-slate-500 dark:text-slate-50 w-16 rounded-sm opacity-50 hover:opacity-100" type="submit" onClick={(e) => {
                            if (username.current && password.current && email.current) {
                                handleSignup(e, username.current, password.current, email.current)
                            }
                        }}>Sign Up</button>
                    </div>
                </form> : <button className="bg-slate-500 dark:text-slate-100 w-36 h-16 rounded-lg opacity-50 hover:opacity-100 text-lg"
                    onClick={(e) => handleUser()}>
                    Sign Out</button>}
            </SlidingMenu>
        </div>
    )
}

