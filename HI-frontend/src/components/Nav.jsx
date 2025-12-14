import { Link } from "react-router-dom"

function Nav() {
    return (
        <nav>
            <div className="pages">
                <Link to="/">All</Link>
                <Link to="/inProgress">In Progress</Link>
                <Link to="/onHold">On Hold</Link>
                <Link to="/solved">Solved</Link>
                <Link to="/cancelled">Cancelled</Link>
            </div>
            <Link className="newTicket" to="/newTicket">New Ticket</Link>
        </nav>
    );
}

export default Nav;