"use client";

import React from "react";
import CrudTable from "../../components/CRUD/crudTable"; // Adjust the import path as needed

// --- Sample Data ---
const data = [
  { id: 1, name: "Item 1", description: "Description 1" },
  { id: 2, name: "Item 2", description: "Description 2" },
  { id: 3, name: "Item 3", description: "Description 3" },
];

// --- Table Column Definitions ---
const columns = [
  { header: "Name", accessor: "name" },
  { header: "Description", accessor: "description" },
];

// --- CRUD Handlers ---
const handleAdd = () => {
  alert("Add action triggered!");
};

const handleEdit = (item: { id: number; name: string }) => {
  alert(`Editing ${item.name}`);
};

const handleDelete = (item: { id: number; name: string }) => {
  alert(`Deleting ${item.name}`);
};

// --- Page Component ---
const Page: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD Table Example</h1>
      <CrudTable
        title="Manage Items"
        data={data}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Page;
