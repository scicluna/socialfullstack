

export default function Navbar() {
    return (
        <nav style={
            { display: "flex", width: "100%", justifyContent: "space-between", marginBottom: "10px" }
        }>
            <h4>Hamburger</h4>
            <input type="text" />
            <div>user</div>
        </nav>
    )
}