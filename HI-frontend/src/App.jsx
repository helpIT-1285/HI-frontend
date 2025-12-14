import './App.css'
import './font.css'

import { Routes, Route } from "react-router-dom"

import Nav from "./components/Nav.jsx";
import TicketList from "./components/TicketList.jsx";
import TicketDetail from './components/TicketDetail.jsx';
import TicketEdit from './components/TicketEdit.jsx';
import TicketCreate from './components/TicketCreate.jsx'

function App() {
    return (
        <>
            <header>
                <Nav />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<TicketList filter={"All"}/>} />
                    <Route path="/inProgress" element={<TicketList filter={"In Progress"}/>} />
                    <Route path="/onHold" element={<TicketList filter={"On Hold"}/>} />
                    <Route path="/solved" element={<TicketList filter={"Solved"}/>} />
                    <Route path="/cancelled" element={<TicketList filter={"Cancelled"}/>} />
                    <Route path='/ticket/:id' element={<TicketDetail />} />
                    <Route path='/ticket/:id/edit' element={<TicketEdit />} />
                    <Route path='/newTicket' element={<TicketCreate />} />
                </Routes>
            </main>
        </>
    )
}

export default App
