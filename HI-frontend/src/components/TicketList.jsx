import { useEffect, useState } from "react"

import TicketItem from "./TicketItem.jsx";
import { getApiBaseUrl } from "../config.js";

function Tickets({filter}) {
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadTickets() {
            try {
                const res = await fetch(`${getApiBaseUrl()}/api/v1/tickets`)
                if (!res.ok) throw new Error("Failed to fetch")
                const data = await res.json()

                const processedTickets = data.data
                .filter(ticket => {
                    if (filter === "All") return true
                    return ticket.state === filter
                })
                .sort((a, b) => {
                    if (b.priority !== a.priority) {
                        return b.priority - a.priority
                    }
                    return a.id - b.id
                })

                setTickets(processedTickets)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadTickets()
    }, [filter])

    if (loading) return <p>Loading…</p>
    if (error) return <p>Error: {error}</p>

    return (
        <>
            <h1>{filter}</h1>
            <div className="ticketList">
                {tickets.map(ticket => (
                    <TicketItem key={ticket.id} ticketId={ticket.id} title={ticket.title} description={ticket.description} priority={ticket.priority} state={ticket.state} assignedTo={ticket.assignedTo} />
                ))}
            </div>
        </>
    )
}

export default Tickets
