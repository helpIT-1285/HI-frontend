import { useNavigate } from "react-router-dom";

import Stars from "./Stars.jsx";

function TicketItem({ ticketId, title, description, priority, state, assignedTo }) {
    const navigate = useNavigate();

    return (
        <div className="ticket" onClick={() => navigate("/ticket/" + ticketId)}>
            <h1>{title}</h1>
            <br />
            <p>{description}</p>
            <hr />
            <Stars priority={priority}/>
            <p>Assigned to: {assignedTo}</p>
            <br />
            <p>{state}</p>
        </div>
    );
}

export default TicketItem;
