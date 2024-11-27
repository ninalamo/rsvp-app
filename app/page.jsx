"use client";

import {  Suspense } from "react";
import RsvpForm from "./rsvps/RsvpForm";


export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RsvpForm />
    </Suspense>
  );
}
