# Multi-Step Form Template Documentation

This documentation outlines the structure and usage of the Multi-Step Form component built with React, React Hook Form, and Zod for form validation. The form is designed to handle multiple steps, each with its own set of fields and validations.

## Overview

The Multi-Step Form is structured into several key components and utilizes a context ([FormContext](file:///Users/brijr/9d8/slider/components/multi-step-form.tsx#39%2C7-39%2C7)) to manage form state across different steps. The form schema is defined using Zod, allowing for straightforward validation rules.

### Key Components

- [MultiStepForm](file:///Users/brijr/9d8/slider/components/multi-step-form.tsx#51%2C17-51%2C17): The main component that orchestrates the multi-step form logic.
- [FirstStep](file:///Users/brijr/9d8/slider/components/multi-step-form.tsx#235%2C16-235%2C16), [SecondStep](file:///Users/brijr/9d8/slider/components/multi-step-form.tsx#138%2C7-138%2C7), [ContactStep](file:///Users/brijr/9d8/slider/components/multi-step-form.tsx#181%2C7-181%2C7): Components representing individual steps of the form.
- [StepIndicator](file:///Users/brijr/9d8/slider/components/multi-step-form.tsx#215%2C7-215%2C7): A component to indicate the current step in the form process.

### Form Schema

The form schema is defined using Zod. It includes fields for first name, last name, options selection, email, and phone number, each with specific validation rules.

```typescript
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
```

### Form Context

`FormContext` is used to pass the form instance created by `useForm` hook from `react-hook-form` to the child components. This allows each step to access the form state and methods.

```typescript
const FormContext = createContext<UseFormReturn<z.infer<typeof formSchema>> | null>(null);
```

### Navigation and Validation

The form supports navigation between steps with validation at each step. The `nextStep` function triggers validation for the current step before moving to the next step.

```typescript
const nextStep = async () => {
  const fieldsToValidate = stepValidationFields[currentStep - 1];
  const isValid = await form.trigger(fieldsToValidate);
  if (!isValid) return;

  setCurrentStep(currentStep < totalSteps ? currentStep + 1 : currentStep);
};
```

### Step Components

Each step component (`FirstStep`, `SecondStep`, `ContactStep`) renders its respective form fields and utilizes `FormField`, `FormItem`, `FormLabel`, `FormControl`, and `FormMessage` components for layout and validation messages.

### Step Indicator

`StepIndicator` component visually indicates the current step and the total number of steps in the form.

```typescript
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
```

### Usage

To use the Multi-Step Form, simply include the `MultiStepForm` component in your application. The form and its steps are fully configured and ready to use.

```typescript
<MultiStepForm />
```

This template provides a robust starting point for implementing multi-step forms with validation in React applications.
