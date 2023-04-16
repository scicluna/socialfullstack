interface ThoughtSpaceProps {
    thoughts: Thought[]
}

export default function ThoughtSpace({ thoughts }: ThoughtSpaceProps) {

    //Filter thoughts based on filtered search
    //Display thoughts by recency with reactions underneath them
    //FLEX - make reactions after one a collapsable

    function recursiveReactions(reaction: Reaction, depth: number = 2) {
        if (!reaction.reactions || reaction.reactions.length < 1) return null

        return reaction.reactions.map((react) => {
            return (
                <div key={react._id}>
                    <div className="flex items-center border-b border-slate-600 shadow-lg" style={{ marginLeft: `${depth * 50}px` }}>
                        <h4 className="font-extrabold pr-5">{react.userName}</h4>
                        <p>{react.reactionBody}</p>
                    </div>
                    {recursiveReactions(react, 1 + depth)}
                </div>
            )
        })
    }

    return (
        <section className="bg-slate-200">
            <div className="flex flex-col m-5" >
                {thoughts.map(thought => (
                    <div key={thought._id}>
                        <div className="flex items-center border-b border-slate-600 shadow-lg">
                            <h1 className="font-extrabold pr-5">{thought.userName}</h1>
                            <p>{thought.thoughtText}</p>
                        </div>
                        {thought.reactions.map(reaction => (
                            <div key={reaction._id}>
                                <div className="flex items-center border-b border-slate-600 shadow-lg" style={{ marginLeft: `${1 * 50}px` }}>
                                    <h4 className="font-extrabold pr-5">{reaction.userName}</h4>
                                    <p>{reaction.reactionBody}</p>
                                </div>
                                {recursiveReactions(reaction, 2)}
                            </div>
                        ))}
                    </div>
                ))}
                <div className="flex items-center border-b border-slate-600 shadow-lg" style={{ marginLeft: `${2 * 50}px` }}>
                    <h4 className="font-extrabold pr-5">User</h4>
                    <p>This is a reaction to your thought</p>
                </div>
            </div>
        </section>
    )
}