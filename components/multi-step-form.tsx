"use client";

import { Asterisk } from "lucide-react";

import { useState } from "react"; // Import useState
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface StepProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  ex_options: z.string().min(1, {
    message: "Please select an option.",
  }),
  email: z.string().email(),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  // Add more fields as needed for other steps
});

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1); // Step state
  const totalSteps = 3; // Adjust based on the number of steps you have

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      ex_options: "",
      email: "",
      phone: "",
      // Initialize default values for other fields
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle final submission here
  }

  // Function to go to the next step
  const nextStep = async () => {
    let fieldsToValidate: Array<
      "first_name" | "last_name" | "ex_options" | "email" | "phone"
    > = [];
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["first_name", "last_name"];
        break;
      case 2:
        fieldsToValidate = ["ex_options"];
        break;
      case 3:
        fieldsToValidate = ["email", "phone"];
        break;
      default:
        break;
    }

    const isValid = await form.trigger(
      fieldsToValidate as (
        | "first_name"
        | "last_name"
        | "ex_options"
        | "email"
        | "phone"
      )[]
    );
    if (!isValid) return;

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
        className="w-full"
        onSubmit={(e) => e.preventDefault()} // Prevent form submission on intermediate steps
      >
        <div className="p-8 border max-w-[540px] m-auto shadow-sm rounded-md space-y-8">
          {/* Form Step Components */}
          {currentStep === 1 && <FirstStep form={form} />}
          {currentStep === 2 && <SecondStep form={form} />}
          {currentStep === 3 && <ContactStep form={form} />}
          {/* Next and Back Buttons */}
          <div id="button-container" className="flex gap-2">
            <Button onClick={nextStep}>
              {currentStep === totalSteps ? "Submit" : "Next"}
            </Button>
            {currentStep > 1 && (
              <Button variant="link" onClick={prevStep}>
                Back
              </Button>
            )}
          </div>
        </div>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </form>
    </Form>
  );
}

// Step Components

const FirstStep: React.FC<StepProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="first_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="Cameron" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="last_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Youngblood" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const SecondStep: React.FC<StepProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="ex_options"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Second Step</FormLabel>
          <FormControl>
            <ToggleGroup
              type="single"
              className="gap-2"
              defaultValue={field.value}
              onValueChange={(value) => {
                form.setValue("ex_options", value, {
                  shouldValidate: true,
                });
              }}
            >
              <ToggleGroupItem
                value="option_1"
                className="data-[state=on]:bg-primary data-[state=on]:text-background w-full border py-6 h-full grid items-center justify-center"
              >
                <Asterisk className="w-24 h-24" />
                Option 1
              </ToggleGroupItem>
              <ToggleGroupItem
                value="option_2"
                className="data-[state=on]:bg-primary data-[state=on]:text-background w-full border py-6 h-full grid items-center justify-center"
              >
                <Asterisk className="w-24 h-24" />
                Option 2
              </ToggleGroupItem>
            </ToggleGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ContactStep: React.FC<StepProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="cameron@test.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input placeholder="(999) 999-1738" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex justify-center space-x-2 mt-4">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
        <span
          key={step}
          className={`block w-2 h-2 rounded-full ${
            currentStep === step ? "bg-primary" : "bg-accent"
          }`}
        />
      ))}
    </div>
  );
};
