"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSession } from "next-auth/react";

// interface RegisterProps {
//   sessionEmail: string;
// }

const Register = () => {
  const { data: session, status } = useSession();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState(session?.user?.email);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [googlepic, setGooglPic] = useState(session?.user?.image);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          address,
          googlepic,
        }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      console.error("Error submitting registration form:", err);
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center lg:w-5/6 h-screen">
      <div className="p-6 shadow-lg rounded md:w-[400px]">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1" htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={session?.user?.email || ""}
              className="border p-2 w-full rounded"
              required
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 w-full">Mobile Number</label>

            <PhoneInput
              country={"in"}
              value={phone}
              onChange={(e) => setPhone(e)}
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border p-2 w-full rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
