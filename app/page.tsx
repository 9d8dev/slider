import Image from "next/image";
import { MultiStepForm } from "@/components/form";

export default function Home() {
  return (
    <main className="p-12">
      <p>Hello World</p>
      <MultiStepForm />
    </main>
  );
}
