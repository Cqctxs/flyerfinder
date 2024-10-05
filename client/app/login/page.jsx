"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";

export default function Page() {
  const { setAuth } = useAuth();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const router = useRouter();

  const login = async () => {
    const response = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: user, pwd: pwd }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
      setAuth({ user: result.user, phone: result.phone, coords: result.coords, accessToken: result.accessToken });
      router.push("/create"); // Redirect to /create after successful login
    }
  };

  return (
    <div>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="User"
      />
      <input
        type="password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
        placeholder="Password"
      />
      <button onClick={login}>Login</button>
      <p>Don't have an account?</p>
      <Link href="/register">Register</Link>
    </div>
  );
}
