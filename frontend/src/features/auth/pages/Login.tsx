import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import ShelfImg from "../../../assets/shelf.jpg"
import { type LoginFormData } from "../auth.types"

const Login = () => {
  const onSubmit = (values: LoginFormData) => console.log("values", values)

  const initialValues = {
    username: "",
    password: "",
  }

  const loginValidationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  })

  return (
    <div className="h-screen flex flex-col justify-center px-8 py-6 text-center items-center bg-light-bg">
      <img
        src={ShelfImg}
        alt="a shelf with books illustration"
        className="max-w-full max-h-[35%] mx-auto"
      />
      <h1 className="text-4xl max-[320px]:text-3xl mb-2 font-bold text-main-accent">
        BookJourney
      </h1>
      <p className="text-xl font-medium mb-4">Log In</p>
      {/* {location.state?.message && <h3>{location.state.message}</h3>} */}

      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={onSubmit}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form className="w-11/12 flex flex-col items-center gap-4 max-w-md mx-auto">
              <div className="w-full">
                <Field
                  type="text"
                  value={values.username}
                  name="username"
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
                  value={values.password}
                  name="password"
                  placeholder="Password"
                  className="w-11/12 mb-1 px-4 py-2 rounded-md border"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-11/12 px-4 py-2 mt-2 text-center bg-lighter-accent hover:bg-main-accent-hover text-light-bg font-semibold rounded-md"
                disabled={isSubmitting}
              >
                Log In
              </button>
            </Form>
          )
        }}
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

export default Login
