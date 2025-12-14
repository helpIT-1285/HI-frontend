import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function TicketEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState(1);
    const [state, setState] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [customer, setCustomer] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadTicket() {
            try {
                const res = await fetch(`https://192.168.10.184/api/v1/tickets/${id}`);
                if (!res.ok) throw new Error("Failed to load ticket");
                let data = await res.json();
                data = data.data;

                setTitle(data.title);
                setDescription(data.description);
                setPriority(data.priority);
                setState(data.state);
                setAssignedTo(data.assignedTo);
                setCustomer(data.customer);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadTicket();
    }, [id]);

    async function saveTicket() {
        const res = await fetch(`https://192.168.10.184/api/v1/tickets/${id}`, {
            method: "PUT",
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

        if (!res.ok) {
            throw new Error("Failed to save ticket");
        }

        navigate(`/ticket/${id}`);
    }

    if (loading) return <p>Loading…</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="ticketEdit">
            <h1>Edit Ticket</h1>

            <p>Title:</p>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <br />
            <p>Description:</p>
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
            />

            <br />
            <p>Priority:</p>
            <input
                type="number"
                value={priority}
                onChange={e => setPriority(Number(e.target.value))}
            />

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

            <br />

            <p>Assigned To:</p>
            <input
                value={assignedTo}
                onChange={e => setAssignedTo(e.target.value)}
            />

            <p>Customer:</p>
            <input
                value={customer}
                onChange={e => setCustomer(e.target.value)}
            />

            <button onClick={saveTicket}>
                Save
            </button>
        </div>
    );
}

export default TicketEdit;
