"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import withAuth from "@/components/withAuth";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^\d{10}$/;
const LATITUDE_REGEX = /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$/;
const LONGITUDE_REGEX = /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/;

const Page = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [validLatitude, setValidLatitude] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [validLongitude, setValidLongitude] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");

  const router = useRouter();

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidLatitude(LATITUDE_REGEX.test(latitude));
  }, [latitude]);

  useEffect(() => {
    setValidLongitude(LONGITUDE_REGEX.test(longitude));
  }, [longitude]);

  const uploadImage = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await fetch(`http://localhost:3001/image/${email}`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setUploadSuccess("Image uploaded successfully!");
          setUploadError("");
        }
      } catch (error) {
        setUploadError("Image upload failed");
        setUploadSuccess("");
      }
    } else {
      setUploadError("Please select an image to upload");
      setUploadSuccess("");
    }
  };

  const register = async () => {
    if (
      validEmail &&
      validPwd &&
      validMatch &&
      validPhone &&
      validLatitude &&
      validLongitude
    ) {
      await uploadImage();
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: email,
          pwd: pwd,
          phone: phone,
          coords: { latitude: latitude, longitude: longitude },
        }),
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        setError("Registration failed");
      }
    } else {
      setError("Invalid input");
    }
  };

  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="font-advercase text-4xl font-semibold">Register</h1>
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {!validEmail && email && (
                <p className="text-red-500 text-sm">Invalid email</p>
              )}
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
              {!validPwd && pwd && (
                <p className="text-red-500 text-sm">Invalid password</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                value={matchPwd}
                onChange={(e) => setMatchPwd(e.target.value)}
                placeholder="Confirm your password"
              />
              {!validMatch && matchPwd && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
              {!validPhone && phone && (
                <p className="text-red-500 text-sm">Invalid phone number</p>
              )}
            </div>
            <h2 className="text-xl font-semibold">Store Information</h2>
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Enter latitude"
              />
              {!validLatitude && latitude && (
                <p className="text-red-500 text-sm">Invalid latitude</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Enter longitude"
              />
              {!validLongitude && longitude && (
                <p className="text-red-500 text-sm">Invalid longitude</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Upload Your Store Logo (PNG)</Label>
              <Input
                id="logo"
                type="file"
                accept=".png"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {uploadError && (
                <p className="text-red-500 text-sm">{uploadError}</p>
              )}
              {uploadSuccess && (
                <p className="text-green-500 text-sm">{uploadSuccess}</p>
              )}
            </div>
            <Button onClick={register} className="w-full">
              Register <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-center">
              Already registered?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Page;
