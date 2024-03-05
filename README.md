# Multi-Step Form Component Documentation

This documentation provides an overview of the Multi-Step Form component implemented in TypeScript using React. The component is designed to handle forms that span multiple steps, with validation at each step using Zod for schema validation and React Hook Form for form state management.

## Overview

The Multi-Step Form component orchestrates the logic for navigating through multiple steps in a form, validating inputs at each step before proceeding. It leverages the [react-hook-form](https://github.com/9d8dev/slider/package.json#24%2C6-24%2C6) library for form state management and [zod](https://github.com/9d8dev/slider/package.json#27%2C6-27%2C6) for schema validation.

### Key Features

- Multi-step navigation with forward and backward capabilities.
- Schema-based validation using Zod.
- Context-based state management for form data across different steps.
- Customizable form fields and validation messages.

### Dependencies

- [react](https://github.com/9d8dev/slider/package.json#13%2C16-13%2C16)
- [react-hook-form](https://github.com/9d8dev/slider/package.json#24%2C6-24%2C6)
- `@hookform/resolvers/zod`
- [zod](https://github.com/9d8dev/slider/package.json#27%2C6-27%2C6)
- [framer-motion](https://github.com/9d8dev/slider/package.json#19%2C6-19%2C6) for animations

### Form Schema

The form schema is defined using Zod, allowing for straightforward validation rules. Here's an example schema:

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

A `FormContext` is created to pass the form instance and allow each step to access the form state and methods.

```typescript
const FormContext = createContext<UseFormReturn<z.infer<typeof formSchema>> | null>(null);
```

### Step Components

Each step of the form is represented by a component (`FirstStep`, `SecondStep`, `ContactStep`). These components render the form fields relevant to that step and utilize the `FormContext` to access and manipulate the form state.

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

### Step Indicator

A `StepIndicator` component visually indicates the current step and the total number of steps in the form.

### Usage

To use the Multi-Step Form, include the `MultiStepForm` component in your application. The form and its steps are fully configured and ready to use.

```typescript
<MultiStepForm />
```

This component provides a robust solution for implementing multi-step forms in React applications, with built-in validation and state management.
