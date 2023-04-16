

export default function ThoughtSpace() {

    //Filter thoughts based on filtered search
    //Display thoughts by recency with reactions underneath them
    //FLEX - make reactions after one a collapsable

    return (
        <section>
            <div className="singleThought" style={{ display: "flex", flexDirection: "column", marginBottom: '5px' }}>
                <div className="originalThought" style={{ display: "flex", alignItems: "center" }}>
                    <h1>User</h1>
                    <p>Example Thought.</p>
                </div>
                <div className="reactions" style={{ display: "flex", alignItems: "center", marginLeft: `${1 * 50}px` }}>
                    <h4>User</h4>
                    <p>This is a reaction to your thought</p>
                </div>
                <div className="reactionsToReactions" style={{ display: "flex", alignItems: "center", marginLeft: `${2 * 50}px` }}>
                    <h4>User</h4>
                    <p>This is a reaction to your thought</p>
                </div>
            </div>
        </section>
    )
}