"use client";

import { Asterisk } from "lucide-react";

import React from "react";
import { useState, createContext, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
});

const FormContext = createContext<UseFormReturn<
  z.infer<typeof formSchema>
> | null>(null);

const useFormContext = () => useContext(FormContext)!;

const stepValidationFields: Array<Array<keyof z.infer<typeof formSchema>>> = [
  ["first_name", "last_name"],
  ["ex_options"],
  ["email", "phone"],
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = stepComponents.length;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      ex_options: "",
      email: "",
      phone: "",
    },
  });

  const nextStep = async () => {
    const fieldsToValidate = stepValidationFields[currentStep - 1];
    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) return;

    setCurrentStep(currentStep < totalSteps ? currentStep + 1 : currentStep);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <FormContext.Provider value={form}>
      <Form {...form}>
        <form className="w-full" onSubmit={(e) => e.preventDefault()}>
          <div className="p-8 border max-w-[720px] m-auto shadow-sm rounded-md space-y-8">
            {React.createElement(stepComponents[currentStep - 1].component)}
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
    </FormContext.Provider>
  );
}

const FirstStep = () => {
  const form = useFormContext();
  return (
    <>
      <h3 className="text-xl font-medium">
        Welcome to Slider by <a href="https://9d8.dev">9d8</a>
      </h3>
      <p>
        This is a multi-step form template using Next.js, Tailwind, React, and
        Shadcn/ui.
      </p>
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

const SecondStep = () => {
  const form = useFormContext();
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

const ContactStep = () => {
  const form = useFormContext();
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

const stepComponents = [
  {
    component: FirstStep,
    validationFields: ["first_name", "last_name"],
  },
  {
    component: SecondStep,
    validationFields: ["ex_options"],
  },
  {
    component: ContactStep,
    validationFields: ["email", "phone"],
  },
];
