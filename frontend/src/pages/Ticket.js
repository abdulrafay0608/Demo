import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import TicketTable from "../components/Table/TicketTable";

const Ticket = () => {
  const [statusFilter, setStatusFilter] = useState("");
  return (
    <div>
      <div className="m-3 text-sm">
        <Stack direction="row">
          <Button
            sx={{
              fontSize: "14px",
              backgroundColor: "black",
              color: "white",
              padding: "4px 12px",
              borderRadius: "8px",
              fontFamily: "inherit",
              textTransform: "none",
            }}
            startIcon={<FiPlus />}
            onClick={() => setStatusFilter("")}
          >
            New Ticket
          </Button>
          <Button
            sx={{
              fontSize: "13px",
              backgroundColor: "transparent",
              padding: "4px 12px",
              border: "1px solid #808080",
              borderRadius: "8px",
              ml: 1,
              fontFamily: "inherit",
              textTransform: "none",
              color: "#FB4842",
            }}
            onClick={() => setStatusFilter("open")}
          >
            Open
          </Button>
          <Button
            sx={{
              fontSize: "13px",
              backgroundColor: "transparent",
              padding: "4px 12px",
              border: "1px solid #808080",
              borderRadius: "8px",
              ml: 1,
              fontFamily: "inherit",
              textTransform: "none",
              color: "#63CD96",
            }}
            onClick={() => setStatusFilter("in progress")}
          >
            In Progress
          </Button>
          <Button
            sx={{
              fontSize: "13px",
              backgroundColor: "transparent",
              padding: "4px 12px",
              border: "1px solid #808080",
              borderRadius: "8px",
              ml: 1,
              fontFamily: "inherit",
              textTransform: "none",
              color: "#2572EC",
            }}
            onClick={() => setStatusFilter("answered")}
          >
            Answered
          </Button>
          <Button
            sx={{
              fontSize: "13px",
              backgroundColor: "transparent",
              padding: "4px 12px",
              border: "1px solid #808080",
              borderRadius: "8px",
              ml: 1,
              fontFamily: "inherit",
              textTransform: "none",
              color: "#75748B",
            }}
            onClick={() => setStatusFilter("on hold")}
          >
            On Hold
          </Button>
          <Button
            sx={{
              fontSize: "13px",
              borderRadius: "10px",
              ml: 1,
              fontFamily: "inherit",
              textTransform: "none",
              backgroundColor: "transparent",
              color: "#19ADF4",
              padding: "3px 8px",
              border: "1px solid #808080",
            }}
            onClick={() => setStatusFilter("closed")}
          >
            Closed
          </Button>
        </Stack>
      </div>
      <div className="w-full">
        <TicketTable statusFilter={statusFilter} />
      </div>
    </div>
  );
};

export default Ticket;
