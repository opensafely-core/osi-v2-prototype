import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useWizard, Wizard } from "react-use-wizard";
import * as Yup from "yup";
import { devtools } from "zustand/middleware";
import create from "zustand";

const useFormStore = create(
  devtools(
    (set) => ({
      formData: {},
      addData: (data) =>
        set((state) => ({ formData: { ...state.formData, data } }), false, {
          type: "addData",
        }),
    }),
    { name: "formData" }
  )
);

const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Step1 = () => {
  const { handleStep, activeStep, nextStep } = useWizard();
  const addData = useFormStore((state) => state.addData);

  // Attach an optional handler
  handleStep(() => {
    alert(`Going to step ${activeStep + 2}`);
  });

  return (
    <>
      <div>
        <h1>Signup</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
          }}
          validationSchema={FormSchema}
          onSubmit={(values) => {
            addData(values);
            nextStep();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="firstName">First name</label>
              <Field name="firstName" />
              {errors.firstName && touched.firstName ? (
                <div>{errors.firstName}</div>
              ) : null}

              <label htmlFor="lastName">Last name</label>
              <Field name="lastName" />
              {errors.lastName && touched.lastName ? (
                <div>{errors.lastName}</div>
              ) : null}

              <label htmlFor="email">Email address</label>
              <Field name="email" type="email" />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
const Step2 = () => {
  const { handleStep, previousStep, nextStep, activeStep } = useWizard();

  // Attach an optional handler
  handleStep(() => {
    alert(`Going to step ${activeStep + 2}`);
  });

  return (
    <>
      <h1>Step: {activeStep + 1}</h1>
      <button onClick={() => previousStep()}>Previous ⏮️</button>
      <button onClick={() => nextStep()}>Next ⏭</button>
    </>
  );
};

const Step3 = () => {
  const { handleStep, previousStep, activeStep } = useWizard();

  // Attach an optional handler
  handleStep(() => {
    alert(`Going to step ${activeStep + 2}`);
  });

  return (
    <>
      <h1>Step: {activeStep + 1}</h1>
      <button onClick={() => previousStep()}>Previous ⏮️</button>
    </>
  );
};

function App() {
  return (
    <div className="container">
      <Wizard>
        <Step1 />
        <Step2 />
        <Step3 />
      </Wizard>
    </div>
  );
}

export default App;
