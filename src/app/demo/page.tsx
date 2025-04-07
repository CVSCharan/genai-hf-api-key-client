"use client";

import React from "react";

import { DemoProvider } from "@/contexts/DemoContext";
import DemoContent from "@/components/demo/Content";

const DemoPage = () => {
  return (
    <DemoProvider>
      <DemoContent />
    </DemoProvider>
  );
};

export default DemoPage;
