"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import useAuth from "@/hooks/useAuth";

export default function Page() {
  const { setAuth } = useAuth();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async () => {
    try {
      const response = await fetch("https://api.findflyerswith.us/login", {
        //https://api.findflyerswith.us/login
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: user, pwd: pwd }),
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setAuth({
          user: result.user,
          phone: result.phone,
          coords: result.coords,
          accessToken: result.accessToken,
        });
        router.push("/create");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="font-advercase text-4xl font-semibold">Login</h1>
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <Button onClick={login} className="w-full">
              Login <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
