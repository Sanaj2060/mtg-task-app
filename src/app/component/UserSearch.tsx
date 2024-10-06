"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

// Define the shape of a user object
type User = {
  id: string;
  name: string;
  email: string;
  image?: string; // Optional image property
};

const UserSearch = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]); // Explicitly type the users array
  const router = useRouter();

  // Hard-coded users
  const hardCodedUsers: User[] = [
    {
      id: "00d9c4e9-9609-4d77-aaaf-0a44c7257cfa",
      name: "The Dev",
      email: "thedev@dev.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocKZB4i-g1mK9UvMCVoonLt1V-CLS1madgVnJuc6xPNxzcTo2V23",
    },
    {
      id: "75c9379a-4166-46c9-91e7-91e417d505cb	",
      name: "Mateng",
      email: "justmateng@example.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocK6fwwU7gjrOZdkxtHGme7eQRe_xSLQ2DRhsVXSNFcJGjgHcFw",
    },
    {
      id: "3f7c261c-a222-43fe-8a31-88b8032dec8d",
      name: "Mathel",
      email: "makhalmathel04@gmail.com",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocLgK9v5-OSVWMWRNYraQYSKxm9V0NdXSg_vWaJXuDmx6ccOTA",
    },
  ];

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
      <div className="mt-8">
        <h2 className="text-lg font-bold">Suggested Users:</h2>
        <div className="flex flex-wrap gap-4 mt-4">
          {hardCodedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-yellow-100 flex-grow md:flex-basis-1/4 lg:flex-basis-1/5 bg-white shadow-md rounded cursor-pointer hover:bg-orange-200 flex flex-col items-center justify-center p-4"
              onClick={() => handleUserClick(user)}
            >
              {/* <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-full mb-2 object-cover"
              /> */}

              <Image
                src={user.image ? user.image : "/next.svg"}
                className="max-h-36 rounded-full w-24 cursor-pointer"
                width={0}
                height={0}
                sizes="100vw"
                alt={`profile photo of ${user.name}`}
              />
              <strong className="text-center">{user.name}</strong>
              <p className="text-sm text-green-900 text-center">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
