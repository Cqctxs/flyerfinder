"use client";

import withAuth from "@/components/withAuth";

const create = () => {
  return (
    <div>
      <h1>Create</h1>
    </div>
  );
};

export default withAuth(create);
