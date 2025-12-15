import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiBaseUrl } from "../config";

import Stars from "./StarsEdit.jsx";

function TicketCreate() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(1);
    const [state, setState] = useState("In Progress");
    const [assignedTo, setAssignedTo] = useState("");
    const [customer, setCustomer] = useState("");
    const [error, setError] = useState(null);

    async function createTicket() {
        // Validation
        if (!title.trim()) {
            setError("Title is required.");
            return;
        }

        if (priority < 1 || priority > 5) {
            setError("Priority must be between 1 and 5.");
            return;
        }

        try {
            const res = await fetch(`${getApiBaseUrl()}/tickets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    description,
                    priority,
                    state,
                    assignedTo,
                    customer
                })
            });

            if (!res.ok) throw new Error("Failed to create ticket");

            const data = await res.json();
            navigate(`/ticket/${data.data.id}`);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="ticketEdit">
            <h1>Create Ticket</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <p>Title:</p>
            <input
                placeholder="Enter ticket title"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <p>Description:</p>
            <textarea
                placeholder="Enter a description"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <p>Priority:</p>
            <Stars priority={priority} setPriority={setPriority}/>

            <br />

            <p>Status:</p>
            <select
                value={state}
                onChange={e => setState(e.target.value)}
            >
                <option value="In Progress">In Progress</option>
                <option value="On Hold">On Hold</option>
                <option value="Solved">Solved</option>
                <option value="Cancelled">Cancelled</option>
            </select>

            <p>Assigned To:</p>
            <input
                placeholder="Who is handling this ticket?"
                value={assignedTo}
                onChange={e => setAssignedTo(e.target.value)}
            />

            <p>Customer:</p>
            <input
                placeholder="Customer name"
                value={customer}
                onChange={e => setCustomer(e.target.value)}
            />

            <button onClick={createTicket}>
                Create
            </button>
        </div>
    );
}

export default TicketCreate;
