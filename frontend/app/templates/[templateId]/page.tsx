"use client";
import { useParams } from "next/navigation";

export default function TemplatePage() {
  const { templateId } = useParams();

  if (templateId === "wedding") {
    return <h1>💒 Wedding Template</h1>;
  }

  if (templateId === "shop") {
    return <h1>🎨 Portfolio Template</h1>;
  }

  return <h1>🚧 Template not found</h1>;
}
