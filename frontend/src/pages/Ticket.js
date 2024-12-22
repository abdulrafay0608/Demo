import React, { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import TicketTable from "../components/Table/TicketTable";

const generateRandomTicket = (id) => {
  const issueTypes = ["Technical", "Billing", "General Inquiry", "Support"];
  const statuses = ["Open", "In Progress", "Answered", "On Hold", "Closed"];
  const priorities = ["Low", "Medium", "High"];
  const agents = ["Agent A", "Agent B", "Agent C", "Agent D"];

  return {
    ticketId: id,
    customerName: `Customer ${id}`,
    issueType: issueTypes[Math.floor(Math.random() * issueTypes.length)],
    subject: `Issue ${id} Subject`,
    description: `Description for issue ${id}.`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    createdDate: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60)
    ).toISOString(),
    dueDate: new Date(
      2024,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1,
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60)
    ).toISOString(),
    assignedAgent: agents[Math.floor(Math.random() * agents.length)],
  };
};
const Ticket = () => {
  const [statusFilter, setStatusFilter] = useState("");

  // Generate Random Data (20 Tickets)
  const data = useMemo(() => {
    const tickets = [];
    for (let i = 1; i <= 55; i++) {
      tickets.push(generateRandomTicket(i));
    }
    return tickets;
  }, []);

  return (
    <div>
      <div className="flex m-3 text-sm space-x-2">
        <button
          className="text-sm bg-black text-white py-1 px-3 rounded-md font-inherit hover:bg-opacity-90"
          onClick={() => setStatusFilter("")}
        >
          <span className="flex items-center gap-1.5">
            <FiPlus />
            New Ticket
          </span>
        </button>

        <button
          className="text-sm bg-transparent py-1 px-3 rounded-md border border-gray-500 font-inherit text-red-500 hover:bg-red-50"
          onClick={() => setStatusFilter("open")}
        >
          Open
        </button>

        <button
          className="text-sm bg-transparent py-1 px-3 rounded-md border border-gray-500 font-inherit text-green-500 hover:bg-green-50"
          onClick={() => setStatusFilter("in progress")}
        >
          In Progress
        </button>

        <button
          className="text-sm bg-transparent py-1 px-3 rounded-md border border-gray-500 font-inherit text-blue-500 hover:bg-blue-50"
          onClick={() => setStatusFilter("answered")}
        >
          Answered
        </button>

        <button
          className="text-sm bg-transparent py-1 px-3 rounded-md border border-gray-500 font-inherit text-gray-500 hover:bg-gray-50"
          onClick={() => setStatusFilter("on hold")}
        >
          On Hold
        </button>

        <button
          className="text-sm bg-transparent py-1 px-2 rounded-lg border border-gray-500 font-inherit text-blue-400 hover:bg-blue-50"
          onClick={() => setStatusFilter("closed")}
        >
          Closed
        </button>
      </div>
      <div className="w-full">
        <TicketTable
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          data={data}
        />
      </div>
    </div>
  );
};

export default Ticket;
