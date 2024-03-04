import Image from "next/image";
import { MultiStepForm } from "@/components/multi-step-form";

export default function Home() {
  return (
    <main className="p-6 md:p-12 h-screen w-screen flex items-center justify-center">
      <MultiStepForm />
    </main>
  );
}
