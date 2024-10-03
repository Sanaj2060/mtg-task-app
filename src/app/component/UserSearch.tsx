"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Define the shape of a user object
type User = {
  id: string;
  name: string;
  email: string;
};

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]); // Explicitly type the users array
  const router = useRouter();

  useEffect(() => {
    if (query.length > 0) {
      const fetchUsers = async () => {
        try {
          const res = await fetch(`/api/search-users?q=${query}`);

          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await res.json();

          if (data) {
            setUsers(data);
          } else {
            setUsers([]); // Handle cases where data is null or undefined
          }
        } catch (error) {
          console.error("Failed to fetch users:", error);
          setUsers([]); // Set an empty array in case of an error
        }
      };
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [query]);

  const handleUserClick = (user: User) => {
    console.log("User clicked:", user.email, user.name);
    router.push(`/form/select-form?by=${user.id}`);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search by name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <ul className="mt-4 border-t">
        {users.map((user) => (
          <li
            key={user.id}
            className="py-2 cursor-pointer hover:bg-gray-100"
            onClick={() => handleUserClick(user)}
          >
            <strong>{user.name}</strong> - {user.email}
          </li>
        ))}
      </ul>
      <div>
        <p>Hard coded business</p>
      </div>
    </div>
  );
};

export default UserSearch;
