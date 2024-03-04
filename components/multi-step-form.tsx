"use client";

import { useState } from "react"; // Import useState
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  // Add more fields as needed for other steps
});

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1); // Step state
  const totalSteps = 3; // Adjust based on the number of steps you have

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      // Initialize default values for other fields
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle final submission here
  }

  // Function to go to the next step
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      form.handleSubmit(onSubmit)(); // Submit at the last step
    }
  };

  // Function to go back to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => e.preventDefault()} // Prevent form submission on intermediate steps
        className="space-y-8 md:min-w-96"
      >
        {currentStep === 1 && <FirstStep form={form} />}
        {currentStep === 2 && <SecondStep form={form} />}
        {currentStep === 3 && <ContactStep form={form} />}

        <div id="button-container" className="flex gap-2">
          <Button onClick={nextStep}>
            {currentStep === totalSteps ? "Submit" : "Next"}
          </Button>{" "}
          {currentStep > 1 && (
            <Button variant="link" onClick={prevStep}>
              Back
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

// Step Components

const FirstStep = (form: any) => {
  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>First Step</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SecondStep = (form: any) => {
  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Second Step</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ContactStep = (form: any) => {
  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="shadcn" {...field} />
          </FormControl>
          <FormDescription>This is your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
