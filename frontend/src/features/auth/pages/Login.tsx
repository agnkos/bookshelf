import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import ShelfImg from "../../../assets/shelf.jpg"
import { type LoginFormData } from "../auth.types"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
  const { login } = useAuth()
  const onSubmit = (values: LoginFormData) => {
    console.log("values", values)
    login({ email: values.email, password: values.password })
  }

  const initialValues = {
    email: "",
    password: "",
  }

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  })

  return (
    <div className="h-screen max-h-screen flex flex-col justify-center items-center px-8 py-6 text-center bg-light-bg">
      <div className="flex flex-col justify-center w-full p-0 md:p-6 max-h-[95%] mid:max-h-[100%] md:grid md:grid-cols-2 md:items-center md:border md:border-main-accent md:rounded-lg max-w-4xl md:shadow-[4px_4px_0px_rgb(65,174,153)]">
        <img
          src={ShelfImg}
          alt="a shelf with books illustration"
          className="max-w-full max-h-[35%] mx-auto md:max-h-[80%]"
        />
        <div className="w-full">
          <h1 className="text-4xl max-[400px]:text-3xl mb-2 font-bold text-main-accent">
            Bookshelf
          </h1>
          <p className="text-xl max-[400px]:text-base font-medium mb-4">
            Log In
          </p>
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
                      value={values.email}
                      name="email"
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
        </div>
      </div>
      <p className="flex grow md:grow-0 items-end text-xs text-main-accent md:mt-4 bg-light-bg">
        Image by
        <a href="https://pl.freepik.com/darmowe-wektory/recznie-rysowane-ilustracja-kregoslupa-ksiazki-o-plaskiej-konstrukcji_24307294.htm#from_view=detail_serie">
          &nbsp; Freepik
        </a>
      </p>
    </div>
  )
}

export default Login
