"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PHONE_REGEX = /^\d{10}$/;
  const LATITUDE_REGEX = /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})?$/;
  const LONGITUDE_REGEX = /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})?$/;

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

  const register = async () => {
    if (
      validEmail &&
      validPwd &&
      validMatch &&
      validPhone &&
      validLatitude &&
      validLongitude
    ) {
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
        setSuccess(true);
        router.push("/login"); // Redirect to /login after successful registration
      } else {
        setError("Registration failed");
      }
    } else {
      setError("Invalid input");
    }
  };

  return (
    <div>
      <section>
        <h2>Register</h2>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {validEmail ? null : <p>Invalid email</p>}
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Password"
        />
        {validPwd ? null : <p>Invalid password</p>}
        <input
          type="password"
          value={matchPwd}
          onChange={(e) => setMatchPwd(e.target.value)}
          placeholder="Match Password"
        />
        {validMatch ? null : <p>Passwords do not match</p>}
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone Number"
        />
        {validPhone ? null : <p>Invalid phone number</p>}
        <input
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Latitude of Address"
        />
        {validLatitude ? null : <p>Invalid latitude</p>}
        <input
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Longitude of Address"
        />
        {validLongitude ? null : <p>Invalid longitude</p>}
        <button onClick={register}>Register</button>
        <p>{error}</p>
        <p>
          Already registered?
          <br />
          <Link href="/login">Login</Link>
        </p>
      </section>
    </div>
  );
}
