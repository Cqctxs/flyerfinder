'use client';

import { useQuery } from "@tanstack/react-query";

export default function Page({ params }) {
  const fetchFlyer = async () => {
    const res = await fetch(
      `https://api.findflyerswith.us/flyer/${params.slug}`
    );
    return res.json();
  };

  const {
    isLoading,
    error,
    data: response,
  } = useQuery({
    queryKey: ["flyerByID"],
    queryFn: fetchFlyer,
  });
  const flyer = response?.flyer;
  return <div>My slug is: {params.slug}</div>;
}
