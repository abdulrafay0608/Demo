import React, { useMemo } from "react";
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
  // Generate Random Data (20 Tickets)
  const data = useMemo(() => {
    const tickets = [];
    for (let i = 1; i <= 55; i++) {
      tickets.push(generateRandomTicket(i));
    }
    return tickets;
  }, []);

  return (
    <div className="w-full">
      <TicketTable data={data} />
    </div>
  );
};

export default Ticket;
