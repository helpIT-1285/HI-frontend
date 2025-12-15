import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApiBaseUrl } from "../config";

import Stars from "./Stars.jsx";

function TicketDetail() {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);

    const navigate = useNavigate();

    async function deleteTicket(id) {
        if (!window.confirm('Do you want to delete this ticket?')) {
            return
        }
 
        const res = await fetch(`${getApiBaseUrl()}/tickets/${id}`, {
            method: "DELETE"
        })

        if (!res.ok) {
            throw new Error("Failed to delete ticket")
        }

        navigate("/");
    }

    useEffect(() => {
        async function fetchTicket() {
            const res = await fetch(`${getApiBaseUrl()}/tickets/${id}`);
            const data = await res.json();
            setTicket(data.data);
        }

        fetchTicket();
    }, [id]);

    if (!ticket) return <p>Loading…</p>;

    return (
        <div className="ticketDetail">
            <h1>{ticket.title}</h1>
            <p>{ticket.description}</p>
            <hr />
            <p>Assigned To: <b>{ticket.assignedTo}</b></p>
            <p>Customer: <b>{ticket.customer}</b></p>
            <br />
            <Stars priority={ticket.priority}/>
            <p>{ticket.state}</p>
            <br />
            <p>Created: {ticket.creationDate}</p>
            <p>Updated: {ticket.updateDate}</p>
            <br />
            <p>Comments:</p>
            <p>{ticket.comment}</p>
            <br />
            <div>
                <Link className="editButton" to={`/ticket/${id}/edit`}>Edit</Link>
                <button className="deleteButton" onClick={() => deleteTicket(id)}>Delete</button>
            </div>
        </div>
    );
}

export default TicketDetail;
