import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"

interface ThoughtSpaceProps {
    thoughts: Thought[]
    filter: string
    user: User | undefined
    handleUpdateThoughts: () => void;
}

export default function ThoughtSpace({ thoughts, filter, user, handleUpdateThoughts }: ThoughtSpaceProps) {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    //FLEX - make reactions after one a collapsable

    //Reaction template
    function Reaction(reaction: Reaction, depth: number, thoughtId: string,) {
        return (
            <>
                <div className="flex items-center border-b shadow-slate-500 shadow-sm w-fit m-2" style={{ marginLeft: `${depth * 50}px` }}>
                    <h4 className={`font-extrabold mr-5 ${reaction.userName.toLowerCase().includes(filter.toLowerCase()) && filter != '' ? 'bg-yellow-100' : ''}`}>{reaction.userName}</h4>
                    <p className={reaction.reactionBody.toLowerCase().includes(filter.toLowerCase()) && filter != '' ? 'bg-yellow-100' : ''}>{reaction.reactionBody}</p>
                    {user &&
                        <button className="ml-3 hover:text-slate-400" data-thought={reaction._id} data-depth={depth} onClick={createReaction}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    }
                </div>
                {selectedId === reaction._id && <input className="border-2 border-slate-600  text-black w-96" placeholder="Reaction..." type="text" style={{ marginLeft: `${(depth + 1) * 50}px` }}
                    onBlur={(e) => postReactionToReaction(e, thoughtId, reaction._id)}></input>}
            </>
        )
    }

    //recursively generates jsx for each reaction and their children
    function recursiveReactions(reaction: Reaction, depth: number, thoughtId: string, firstTime = false) {
        if (firstTime) {
            return (
                <div key={reaction._id}>
                    {Reaction(reaction, depth, thoughtId)}
                    {recursiveReactions(reaction, 1 + depth, thoughtId)}
                </div>
            )
        }
        if (!reaction.reactions || reaction.reactions.length < 1) return null

        return reaction.reactions.map((react) => {
            return (
                <div key={react._id}>
                    {Reaction(react, depth, thoughtId)}
                    {recursiveReactions(react, 1 + depth, thoughtId)}
                </div>
            )
        })
    }

    //generates the reaction input field
    function createReaction(e: React.MouseEvent<HTMLButtonElement>) {
        if (!e.currentTarget) return null

        const depth = e.currentTarget.dataset.depth
        const thoughtId = e.currentTarget.dataset.thought

        if (!depth || !thoughtId) return null

        setSelectedId(thoughtId)
    }

    //posts a new thought to the database
    async function createThought(e: React.FocusEvent<HTMLInputElement>) {
        try {
            if (!e.currentTarget) return null

            const reaction = {
                userName: user?.userName,
                thoughtText: e.currentTarget.value
            }
            await fetch(`http://localhost:3001/api/thoughts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reaction)
            })
            setSelectedId(null)
            handleUpdateThoughts()
        } catch (err) {
            console.log(err)
        }
    }

    //posts a new reaction to the database
    async function postReactionToThought(e: React.FocusEvent<HTMLInputElement>, thoughtId: string) {
        try {
            if (!e.currentTarget) return null

            const reaction = {
                userName: user?.userName,
                reactionBody: e.currentTarget.value
            }
            await fetch(`http://localhost:3001/api/thoughts/${thoughtId}/reactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reaction)
            })
            setSelectedId(null)
            handleUpdateThoughts()
        } catch (err) {
            console.log(err)
        }
    }

    //posts a new reaction to a reaction to the db
    function postReactionToReaction(e: React.FocusEvent<HTMLInputElement>, thoughtId: string, reactionId: string) {
        try {
            if (!e.currentTarget) return null

            const reaction = {
                userName: user?.userName,
                reactionBody: e.currentTarget.value
            }
            fetch(`http://localhost:3001/api/thoughts/${thoughtId}/reactions/${reactionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reaction)
            })
            setSelectedId(null)
            handleUpdateThoughts()
        } catch (err) {
            console.log(err)
        }
    }

    //core jsx
    return (
        <section className="bg-slate-200 dark:bg-slate-900 dark:text-slate-200 mt-12 pt-5 text-lg">
            {user &&
                <button className="ml-3 hover:text-slate-400" onClick={e => setSelectedId('0')}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            }
            {selectedId == '0' && <input className=" shadow-slate-500 shadow-sm w-96 text-black" placeholder="Reaction..." type="text" onBlur={createThought}></input>}
            <div className="flex flex-col m-5" >
                {thoughts.map(thought => (
                    <div key={thought._id}>
                        <div className="flex items-center border-b shadow-slate-500 shadow-sm w-fit mb-1.5">
                            <h1 className={`font-extrabold mr-5 ${thought.userName.toLowerCase().includes(filter.toLowerCase()) && filter != '' ? 'bg-yellow-100' : ''}`}>{thought.userName}</h1>
                            <p className={`${thought.thoughtText.toLowerCase().includes(filter.toLocaleLowerCase()) && filter != '' ? 'bg-yellow-100' : ''}`} >{thought.thoughtText}</p>
                            {user &&
                                <button className="ml-3 hover:text-slate-400 " data-thought={thought._id} data-depth={0} onClick={createReaction}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            }
                        </div>
                        {selectedId === thought._id &&
                            <input className=" shadow-slate-500 shadow-sm w-96 text-black" placeholder="Reaction..." type="text" style={{ marginLeft: `${1 * 50}px` }} onBlur={(e) => postReactionToThought(e, thought._id)}></input>
                        }
                        {thought.reactions.map(reaction => (
                            <React.Fragment key={reaction._id}>{recursiveReactions(reaction, 1, thought._id, true)}</React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}