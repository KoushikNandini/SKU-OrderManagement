import ReusableButton from "../Components/Button";
import Table from "../Components/Table";
import { useState } from "react";
const mockOrders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    total: 12999,
    createdAt: "2025-06-12T14:45:00Z",
    status: "New",
  },
  {
    id: "ORD002",
    customerName: "Alice Smith",
    total: 4999,
    createdAt: "2025-06-13T10:30:00Z",
    status: "Delivered",
  },
  {
    id: "ORD003",
    customerName: "Bob Lee",
    total: 999,
    createdAt: "2025-06-13T16:15:00Z",
    status: "Cancelled",
  },
];
const tableHeader = ["Order ID", "Customer", "Total", "Created At", "Status"];
const OrderManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [statusFilter, setStatusFilter] = useState("All");
  const tabsHeader = ["All", "New", "Delivered", "Cancelled"];

  const updateOrderStatus = (id, newStatus) => {
    const updated = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
  };

  const filterdData = orders
    .filter((order) => {
      const matchTab = tab === "All" || order.status === tab;
      const matchStatus =
        statusFilter === "All" || order.status === statusFilter;
      const matchSearch =
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchStatus && matchSearch;
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === "ASC" ? timeA - timeB : timeB - timeA;
    });

  const rowData = (order, index) => {
    return (
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.customerName}</td>
        <td>₹{order.total}</td>
        <td>{new Date(order.createdAt).toLocaleString()}</td>
        <td>
          <span
            className={`badge bg-${
              order.status === "New"
                ? "info"
                : order.status === "Delivered"
                ? "success"
                : "danger"
            }`}
          >
            {order.status}
          </span>
        </td>
        <td>
          {order.status === "New" ? (
            <>
              <ReusableButton
                variant="success"
                className="me-2 mb-1"
                onClick={() => updateOrderStatus(order.id, "Delivered")}
              >
                Mark Delivered
              </ReusableButton>
              <ReusableButton
                variant="danger"
                onClick={() => updateOrderStatus(order.id, "Cancelled")}
              >
                Cancel
              </ReusableButton>
            </>
          ) : (
            <span className="text-muted">No actions</span>
          )}
        </td>
      </tr>
    );
  };
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4 fw-bold">Order Management</h2>
      <div className="d-flex gap-3 justify-content-center mb-4 flex-wrap">
        {tabsHeader.map((t) => (
          <ReusableButton
            key={t}
            variant={t === tab ? "primary" : "outline-secondary"}
            onClick={() => setTab(t)}
          >
            {t}
          </ReusableButton>
        ))}
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 px-2">
        <input
          type="text"
          className="form-control me-2 mb-2"
          style={{ maxWidth: "250px" }}
          placeholder="Search by Order ID or Customer Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ReusableButton
          variant="outline-dark"
          className="mb-2"
          onClick={() => setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")}
        >
          Sort: Created {sortOrder === "ASC" ? "↑" : "↓"}
        </ReusableButton>
        <select
          className="form-select mb-2"
          style={{ maxWidth: "180px" }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">Filter: All</option>
          <option value="New">New</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Orders</h4>
        <Table
          tableHeader={tableHeader}
          tableData={filterdData}
          row={rowData}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
