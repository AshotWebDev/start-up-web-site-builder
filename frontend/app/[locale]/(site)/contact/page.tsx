import React from "react";
import Contact from "@/components/Contact/index";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page - Solid SaaS Boilerplate",

  // other metadata
  description: "This is Contact page for A&V Sites",
};
function ContactPage() {
  return (
    <div className="pt-40 pb-20">
      <Contact />
    </div>
  );
}

export default ContactPage;
