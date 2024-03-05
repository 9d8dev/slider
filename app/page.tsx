import Image from "next/image";
import bg from "@/public/bg.png";
import { MultiStepForm } from "@/components/multi-step-form";

export default function Home() {
  return (
    <main className="p-6 md:p-12 h-screen w-screen relative flex overflow-hidden items-center justify-center">
      <Image
        className="absolute -z-10 top-0 right-0 left-0 min-h-screen"
        src={bg}
        alt="background"
      ></Image>
      <MultiStepForm />
    </main>
  );
}
