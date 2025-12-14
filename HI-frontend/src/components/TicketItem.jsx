import { useNavigate } from "react-router-dom";

function TicketItem({ ticketId, title, description, priority, state, assignedTo }) {
    const navigate = useNavigate();

    return (
        <div className="ticket" onClick={() => navigate("/ticket/" + ticketId)}>
            <h1>{title}</h1>
            <br />
            <p>{description}</p>
            <hr />
            <p>Priority: {priority}</p>
            <p>Assigned to: {assignedTo}</p>
            <br />
            <p>{state}</p>
        </div>
    );
}

export default TicketItem;
