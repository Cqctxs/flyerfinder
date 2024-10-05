"use client";

import FlyerSquareOne from "@/components/flyer-square-one";
import PersistLogin from "@/components/withAuth";

const test = () => {
  return (
    <div className="flex justify-between">
      <FlyerSquareOne />
      <FlyerSquareOne />
      <FlyerSquareOne />
      <FlyerSquareOne />
    </div>
  );
};

export default PersistLogin(test);
