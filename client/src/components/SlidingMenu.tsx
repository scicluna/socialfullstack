import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { faClose } from "@fortawesome/free-solid-svg-icons"

interface SlidingMenuProps {
    children: React.ReactNode
    icon: IconDefinition
    direction: string
}

//cool sliding menu demoing "children" as a prop
export default function SlidingMenu({ children, icon, direction }: SlidingMenuProps) {
    const [hamburger, setHamburger] = useState<boolean>(false)
    return (
        <div>
            <button onClick={() => { hamburger ? setHamburger(false) : setHamburger(true) }}>
                <FontAwesomeIcon icon={icon} size='3x' className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 p-5" />
            </button>
            <div className={`fixed bg-slate-300 dark:bg-slate-800 dark:text-slate-300 h-screen ${direction == 'right' ? 'top-0 right-0' : 'top-0 left-0'} transition-all ease-in duration-200 ${hamburger ? "w-64" : "w-0"} `}>
                <div className={`p-2 transition-all ease-in duration-200 ${hamburger ? "translate-x-0" : direction == 'left' ? "-translate-x-96" : "translate-x-96"}`}>
                    <ul className={`flex flex-col ${direction == 'right' ? 'items-end' : 'items-start'}`}>
                        <button onClick={() => { hamburger ? setHamburger(false) : setHamburger(true) }}>
                            <FontAwesomeIcon icon={faClose} size='3x' className="opacity-50 hover:opacity-100" />
                        </button>
                        {children}
                    </ul>
                </div>
            </div>
        </div >
    )
}