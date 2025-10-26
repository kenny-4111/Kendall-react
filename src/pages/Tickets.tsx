import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

// Define allowed status and priority options
const STATUS_OPTIONS = ["open", "in_progress", "closed"];
const PRIORITY_OPTIONS = ["low", "medium", "high"];

type Ticket = {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority?: string;
  created: string;
};

type TicketForm = {
  title: string;
  description?: string;
  status: string;
  priority?: string;
};

// Retrieve tickets from localStorage
const getTickets = (): Ticket[] => {
  const stored = localStorage.getItem("kendall_manager_pro_tickets");
  return stored ? (JSON.parse(stored) as Ticket[]) : [];
};

// Save updated tickets to localStorage
const saveTickets = (tickets: Ticket[]) => {
  localStorage.setItem("kendall_manager_pro_tickets", JSON.stringify(tickets));
};

// Initial empty form
const initialForm: TicketForm = {
  title: "",
  description: "",
  status: "open",
  priority: "",
};

const Tickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [form, setForm] = useState<TicketForm>(initialForm);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Toast for success or error feedback
  const [toast, setToast] = useState<{ message: string; type: "success" | "" }>(
    {
      message: "",
      type: "",
    }
  );

  // Inline validation error messages
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // For delete confirmation
  const [confirmingId, setConfirmingId] = useState<number | null>(null);

  const navigate = useNavigate();

  // Check if user session exists, otherwise redirect to login
  useEffect(() => {
    const session = localStorage.getItem("kendall_manager_pro_session");
    if (!session) {
      setToast({
        message: "Your session has expired — please log in again.",
        type: "",
      });
      setTimeout(() => navigate("/auth/login"), 2000);
      return;
    }

    try {
      setTickets(getTickets());
    } catch {
      setToast({ message: "Failed to load tickets. Please retry.", type: "" });
    }
  }, [navigate]);

  // Validation rules for form fields
  const validate = (data: TicketForm): { [key: string]: string } => {
    const newErrors: { [key: string]: string } = {};

    if (!data.title || !data.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (data.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    if (!data.status) {
      newErrors.status = "Status is required.";
    } else if (!STATUS_OPTIONS.includes(data.status)) {
      newErrors.status = "Status must be one of: open, in_progress, closed.";
    }

    if (data.description && data.description.length < 5) {
      newErrors.description =
        "Description must be at least 5 characters if provided.";
    }

    if (data.priority && data.priority.length > 0 && data.priority.length < 3) {
      newErrors.priority =
        "Priority must be at least 3 characters if provided.";
    }

    return newErrors;
  };

  // Handle user input and reset error for that field
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // Display toast (success or info)
  const showToast = (message: string, type: "success" | "") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
  };

  // Handle form submission for ticket creation or update
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      if (editingId !== null) {
        // Update existing ticket
        const updated = tickets.map((t) =>
          t.id === editingId ? { ...t, ...form } : t
        );
        setTickets(updated);
        saveTickets(updated);
        showToast("Ticket updated successfully.", "success");
      } else {
        // Create new ticket
        const newTicket: Ticket = {
          ...form,
          id: Date.now(),
          created: new Date().toISOString(),
        };
        const updated = [newTicket, ...tickets];
        setTickets(updated);
        saveTickets(updated);
        showToast("Ticket created successfully.", "success");
      }

      setForm(initialForm);
      setEditingId(null);
      setErrors({});
    } catch {
      setToast({ message: "Failed to save ticket. Please retry.", type: "" });
    }
  };

  // Edit an existing ticket
  const handleEdit = (id: number) => {
    const ticket = tickets.find((t) => t.id === id);
    if (ticket) {
      setForm({
        title: ticket.title,
        description: ticket.description,
        status: ticket.status,
        priority: ticket.priority || "",
      });
      setEditingId(id);
      setErrors({});
    }
  };

  // Trigger delete confirmation
  const handleDelete = (id: number) => {
    setConfirmingId(id);
  };

  // Confirm deletion of ticket
  const confirmDelete = () => {
    if (confirmingId === null) return;

    const updated = tickets.filter((t) => t.id !== confirmingId);
    setTickets(updated);
    saveTickets(updated);
    showToast("Ticket deleted successfully.", "success");

    if (editingId === confirmingId) {
      setForm(initialForm);
      setEditingId(null);
    }

    setConfirmingId(null);
  };

  // Cancel deletion confirmation
  const cancelDelete = () => {
    setConfirmingId(null);
  };

  // Navigation handlers
  const handleReturnDashboard = () => navigate("/dashboard");
  const handleLogout = () => {
    logout();
    showToast("You have been logged out successfully.", "success");
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 p-6 relative">
      {/* Toast Notification */}
      <div
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 text-center text-sm font-semibold transition-all duration-500 ease-in-out ${
          toast.message
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-6 pointer-events-none"
        } ${
          toast.type === "success"
            ? "bg-white text-gray-800"
            : "bg-red-600 text-white"
        }`}>
        {toast.message}
      </div>

      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        Ticket Management
      </h1>
      <p className="mb-6 text-gray-700">
        Create, view, edit, and delete tickets below.
      </p>

      {/* Ticket Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-xl shadow p-6 mb-8 flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">
          {editingId ? "Edit Ticket" : "Create New Ticket"}
        </h2>

        {/* Title Input */}
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && (
          <div className="text-red-600 text-xs font-semibold mt-1">
            {errors.title}
          </div>
        )}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <div className="text-red-600 text-xs font-semibold mt-1">
            {errors.description}
          </div>
        )}

        {/* Status Selector */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.status ? "border-red-500" : "border-gray-300"
          }`}>
          <option value="">Select status</option>
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt.replace(/_/g, " ")}
            </option>
          ))}
        </select>
        {errors.status && (
          <div className="text-red-600 text-xs font-semibold mt-1">
            {errors.status}
          </div>
        )}

        {/* Priority Selector */}
        <select
          name="priority"
          value={form.priority || ""}
          onChange={handleChange}
          className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.priority ? "border-red-500" : "border-gray-300"
          }`}>
          <option value="">Select priority (optional)</option>
          {PRIORITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
        {errors.priority && (
          <div className="text-red-600 text-xs font-semibold mt-1">
            {errors.priority}
          </div>
        )}

        {/* Form Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition">
            {editingId ? "Update Ticket" : "Create Ticket"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setForm(initialForm);
                setEditingId(null);
                setErrors({});
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Ticket List */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tickets.length === 0 ? (
          <div className="col-span-full text-gray-500 text-center">
            No tickets found.
          </div>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-blue-700">
                  {ticket.title}
                </h3>

                {/* Status Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ml-4 whitespace-nowrap ${
                    ticket.status === "open"
                      ? "bg-green-100 text-green-700"
                      : ticket.status === "in_progress"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-gray-200 text-gray-700"
                  }`}>
                  {ticket.status.replace(/_/g, " ")}
                </span>
              </div>

              <p className="text-gray-700 mb-2">{ticket.description}</p>
              {ticket.priority && (
                <p className="text-sm text-gray-600">
                  Priority:{" "}
                  <span className="font-semibold capitalize">
                    {ticket.priority}
                  </span>
                </p>
              )}

              {/* Edit/Delete or Confirm/Cancel */}
              <div className="flex gap-2 mt-2">
                {confirmingId === ticket.id ? (
                  <>
                    <button
                      onClick={confirmDelete}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                      Confirm
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm">
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(ticket.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                      Delete
                    </button>
                  </>
                )}
              </div>

              <div className="text-xs text-gray-400 mt-2">
                Created: {new Date(ticket.created).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8 mb-8">
        <button
          onClick={handleReturnDashboard}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded transition border border-blue-600">
          Return to Dashboard
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition border border-red-600">
          Logout
        </button>
      </div>

      {/* Decorative SVG */}
      <svg
        className="absolute left-0 bottom-0 w-full h-32 md:h-48 pointer-events-none -z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320">
        <path fill="#fff" fillOpacity="0.5" d="M0,192L1440,128L1440,0L0,0Z" />
      </svg>
    </div>
  );
};

export default Tickets;
