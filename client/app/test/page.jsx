'use client';

import FlyerSquareOne from "@/public/components/flyer-square-one";
import withAuth from "@/public/components/withAuth";

const test = () => {
  return (
    <div className="flex justify-between">
      <FlyerSquareOne />
      <FlyerSquareOne />
      <FlyerSquareOne />
      <FlyerSquareOne />
    </div>
  );
}

export default withAuth(test);