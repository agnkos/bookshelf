import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import ShelfImg from "../../../assets/shelf.jpg"
import { type SignupFormData } from "../auth.types"

const Signup = () => {
  const onSubmit = (values: SignupFormData) => console.log("values", values)

  const signupInitialValues = {
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  }
  const signupValidationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Invalid email address"
      ),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 6 characters long or more"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords don't match")
      .required("Repeat password"),
  })

  return (
    <div className="h-screen max-h-screen flex flex-col justify-center px-8 py-6 text-center bg-light-bg">
      <img
        src={ShelfImg}
        className="mx-auto max-w-full max-h-[25%]"
        alt="a shelf with books illustration"
      />
      <h1 className="text-4xl max-[320px]:text-3xl mb-2 font-bold text-main-accent">
        BookJourney
      </h1>
      <p className="text-xl font-medium mb-4">Create an account</p>

      <Formik
        initialValues={signupInitialValues}
        validationSchema={signupValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, status }) => (
          <Form className="w-11/12 mx-auto flex flex-col items-center gap-4 max-w-md">
            <div className="w-full">
              <Field
                type="email"
                name="email"
                id="email"
                value={values.email}
                placeholder="Email"
                className="w-11/12 mb-1 px-4 py-2 rounded-md border"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <div className="w-full">
              <Field
                type="text"
                name="username"
                id="username"
                value={values.username}
                placeholder="Username"
                className="w-11/12 mb-1 px-4 py-2 rounded-md border"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <div className="w-full">
              <Field
                type="password"
                name="password"
                id="password"
                value={values.password}
                placeholder="Password"
                className="w-11/12 mb-1 px-4 py-2 rounded-md border"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-500"
              />
            </div>
            <div className="w-full">
              <Field
                type="password"
                name="repeatPassword"
                id="repeatPasswrod"
                value={values.repeatPassword}
                placeholder="Confirm password"
                className="w-11/12 mb-1 px-4 py-2 rounded-md border"
              />
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className="text-sm text-red-500"
              />
              <p className="text-sm text-red-500">{status}</p>
            </div>
            <button
              type="submit"
              className="w-11/12 px-4 py-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md"
            >
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-xs text-main-accent fixed bottom-4 left-2/4 -translate-x-2/4">
        Image by
        <a href="https://pl.freepik.com/darmowe-wektory/recznie-rysowane-ilustracja-kregoslupa-ksiazki-o-plaskiej-konstrukcji_24307294.htm#from_view=detail_serie">
          Freepik
        </a>
      </p>
    </div>
  )
}
export default Signup
