import React from "react"

interface ThoughtSpaceProps {
    thoughts: Thought[]
    filter: string
}

export default function ThoughtSpace({ thoughts, filter }: ThoughtSpaceProps) {

    //FLEX - make reactions after one a collapsable

    //define the structure of our reactions
    function constructReaction(reaction: Reaction, depth: number) {
        return (
            <div className="flex items-center border-b border-slate-600 shadow-lg" style={{ marginLeft: `${depth * 50}px` }}>
                <h4 className="font-extrabold pr-5">{reaction.userName}</h4>
                <p className={reaction.reactionBody.toLowerCase().includes(filter.toLowerCase()) && filter != '' ? 'bg-yellow-100' : ''}>{reaction.reactionBody}</p>
            </div>
        )
    }

    //recursively generates jsx for each reaction and their children
    function recursiveReactions(reaction: Reaction, depth: number, firstTime = false) {
        if (firstTime) {
            return (
                <div key={reaction._id}>
                    {constructReaction(reaction, depth)}
                    {recursiveReactions(reaction, 1 + depth)}
                </div>
            )
        }
        if (!reaction.reactions || reaction.reactions.length < 1) return null

        return reaction.reactions.map((react) => {
            return (
                <div key={react._id}>
                    {constructReaction(react, depth)}
                    {recursiveReactions(react, 1 + depth)}
                </div>
            )
        })
    }

    return (
        <section className="bg-slate-200 mt-12 pt-5">
            <div className="flex flex-col m-5" >
                {thoughts.map(thought => (
                    <div key={thought._id}>
                        <div className="flex items-center border-b border-slate-600 shadow-lg">
                            <h1 className="font-extrabold pr-5">{thought.userName}</h1>
                            <p className={thought.thoughtText.toLowerCase().includes(filter.toLocaleLowerCase()) && filter != '' ? 'bg-yellow-100' : ''}>{thought.thoughtText}</p>
                        </div>
                        {thought.reactions.map(reaction => (
                            <React.Fragment key={reaction._id}>{recursiveReactions(reaction, 1, true)}</React.Fragment>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}