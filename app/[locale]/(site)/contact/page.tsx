import React from 'react'
import Contact from '@/components/Contact/index'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Page - Solid SaaS Boilerplate",

  // other metadata
  description: "This is Contact page for A&V Sites"
};
function ContactPage() {
  return (
     <div className="pb-20 pt-40">
      <Contact />
    </div>
  )
}

export default ContactPage