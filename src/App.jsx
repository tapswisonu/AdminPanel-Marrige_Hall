// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from "react";

const App = () => {
  // Mock data for bookings
  const [bookings, setBookings] = useState([
    {
      id: "BK-1001",
      clientName: "John Smith",
      serviceType: "Home Decoration",
      date: "2025-06-20",
      status: "Pending",
      phone: "+1 234-567-8901",
      email: "john.smith@example.com",
      address: "123 Main St, New York",
    },
    {
      id: "BK-1002",
      clientName: "Emily Johnson",
      serviceType: "Marriage Hall",
      date: "2025-06-25",
      status: "Approved",
      phone: "+1 345-678-9012",
      email: "emily.j@example.com",
      address: "456 Park Ave, Boston",
    },
    {
      id: "BK-1003",
      clientName: "Michael Brown",
      serviceType: "Home Decoration",
      date: "2025-06-18",
      status: "Completed",
      phone: "+1 456-789-0123",
      email: "michael.b@example.com",
      address: "789 Oak St, Chicago",
    },
    {
      id: "BK-1004",
      clientName: "Sarah Williams",
      serviceType: "Marriage Hall",
      date: "2025-06-30",
      status: "Rejected",
      phone: "+1 567-890-1234",
      email: "sarah.w@example.com",
      address: "321 Elm St, Los Angeles",
    },
    {
      id: "BK-1005",
      clientName: "David Miller",
      serviceType: "Home Decoration",
      date: "2025-07-05",
      status: "Pending",
      phone: "+1 678-901-2345",
      email: "david.m@example.com",
      address: "654 Pine St, Seattle",
    },
    {
      id: "BK-1006",
      clientName: "Jennifer Davis",
      serviceType: "Marriage Hall",
      date: "2025-07-10",
      status: "Approved",
      phone: "+1 789-012-3456",
      email: "jennifer.d@example.com",
      address: "987 Cedar St, Miami",
    },
    {
      id: "BK-1007",
      clientName: "Robert Wilson",
      serviceType: "Home Decoration",
      date: "2025-07-15",
      status: "Pending",
      phone: "+1 890-123-4567",
      email: "robert.w@example.com",
      address: "159 Maple St, Denver",
    },
    {
      id: "BK-1008",
      clientName: "Lisa Anderson",
      serviceType: "Marriage Hall",
      date: "2025-07-20",
      status: "Completed",
      phone: "+1 901-234-5678",
      email: "lisa.a@example.com",
      address: "753 Birch St, Atlanta",
    },
  ]);

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  // Filter bookings based on search and filters
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone.includes(searchTerm);

    const matchesService =
      serviceFilter === "All" || booking.serviceType === serviceFilter;
    const matchesStatus =
      statusFilter === "All" || booking.status === statusFilter;

    let matchesDate = true;
    if (startDate && endDate) {
      const bookingDate = new Date(booking.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      matchesDate = bookingDate >= start && bookingDate <= end;
    }

    return matchesSearch && matchesService && matchesStatus && matchesDate;
  });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setServiceFilter("All");
    setStatusFilter("All");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Completed":
        return "bg-blue-100 text-blue-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-indigo-700">Decor Admin</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4">
            <div className="flex items-center py-3 px-4 bg-indigo-50 rounded-lg text-indigo-700 font-medium">
              <i className="fas fa-calendar-alt mr-3"></i>
              <span>Bookings</span>
            </div>
            <div className="flex items-center py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg mt-2 cursor-pointer">
              <i className="fas fa-users mr-3"></i>
              <span>Customers</span>
            </div>
            <div className="flex items-center py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg mt-2 cursor-pointer">
              <i className="fas fa-chart-bar mr-3"></i>
              <span>Reports</span>
            </div>
            <div className="flex items-center py-3 px-4 text-gray-600 hover:bg-gray-50 rounded-lg mt-2 cursor-pointer">
              <i className="fas fa-cog mr-3"></i>
              <span>Settings</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Booking Management
              </h2>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button className="text-gray-500 hover:text-gray-700 focus:outline-none mr-5">
                  <i className="fas fa-bell text-xl"></i>
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
              <div className="flex items-center">
                <img
                  src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20male%20admin%20with%20short%20dark%20hair%20wearing%20a%20business%20suit%2C%20high%20quality%2C%20professional%20photography%2C%20neutral%20background%2C%20corporate%20portrait&width=40&height=40&seq=admin1&orientation=squarish"
                  alt="Admin"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
                <button className="ml-4 text-gray-600 hover:text-gray-800 cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Search and Filter Bar */}
          <div className="bg-white p-5 rounded-lg shadow-sm mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full md:w-auto flex-grow md:flex-grow-0 md:min-w-[300px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder="Search by name, ID or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="w-full sm:w-auto">
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                  >
                    <option value="All">All Services</option>
                    <option value="Home Decoration">Home Decoration</option>
                    <option value="Marriage Hall">Marriage Hall</option>
                  </select>
                </div>

                <div className="w-full sm:w-auto">
                  <select
                    className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="date"
                    className="block px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span className="text-gray-500">to</span>
                  <input
                    type="date"
                    className="block px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium cursor-pointer !rounded-button whitespace-nowrap"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Booking List
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Manage all your bookings from here
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Booking ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Service
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.clientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.serviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <a
                            href={`tel:${booking.phone}`}
                            className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                          >
                            <i className="fas fa-phone"></i>
                          </a>
                          <a
                            href={`https://wa.me/${booking.phone.replace(
                              /[^0-9]/g,
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-900 cursor-pointer"
                          >
                            <i className="fab fa-whatsapp"></i>
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {booking.status === "Pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(booking.id, "Approved")
                                }
                                className="px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 cursor-pointer !rounded-button whitespace-nowrap"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(booking.id, "Rejected")
                                }
                                className="px-2 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200 cursor-pointer !rounded-button whitespace-nowrap"
                              >
                                Reject
                              </button>
                            </>
                          )}
                          {booking.status === "Approved" && (
                            <button
                              onClick={() =>
                                handleStatusChange(booking.id, "Completed")
                              }
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 cursor-pointer !rounded-button whitespace-nowrap"
                            >
                              Complete
                            </button>
                          )}
                          <button className="px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 cursor-pointer !rounded-button whitespace-nowrap">
                            <i className="fas fa-edit"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } cursor-pointer !rounded-button whitespace-nowrap`}
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  } cursor-pointer !rounded-button whitespace-nowrap`}
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{indexOfFirstItem + 1}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, filteredBookings.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredBookings.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <select
                      className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                      value={itemsPerPage}
                      onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value={5}>5 per page</option>
                      <option value={10}>10 per page</option>
                      <option value={20}>20 per page</option>
                    </select>

                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                        } !rounded-button whitespace-nowrap`}
                      >
                        <i className="fas fa-chevron-left"></i>
                      </button>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === pageNum
                                  ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              } cursor-pointer !rounded-button whitespace-nowrap`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:bg-gray-50 cursor-pointer"
                        } !rounded-button whitespace-nowrap`}
                      >
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
