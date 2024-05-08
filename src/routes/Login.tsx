import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../@types/types";
import dialogs, { showSuccessDialog } from "../ui/dialogs";
import patterns from "../validation/patterns";
import { useAuth } from "../contexts/AuthContext";
import './CreateCard.scss';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onLogin = (data: LoginUser) => {
    login(data.email, data.password)
      .then(() => {
        showSuccessDialog("Login", "Logged in").then(() => {
          // send the user to home page
          navigate("/");
        });
      })
      .catch((e: any) => {
        dialogs.error("Login Error", e.response.data);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>();

  return (
    <div className="create-card-container bg-purple-900  text-white dark:bg-slate-600">
      <form noValidate onSubmit={handleSubmit(onLogin)}>
        {/* email */}
        <section>
          <input
            className="create-card-input"
            placeholder="Email"
            autoCapitalize="true"
            autoCorrect="false"
            autoComplete="email"
            type="email"
            {...register("email", {
              required: "This field is mandatory",
              pattern: patterns.email,
            })}
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </section>



        {/* password */}
        <section>
          <input
            className="create-card-input"
            autoComplete="current-password"
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "This field is mandatory",
              pattern: patterns.password,
            })}
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </section>

        <button type="submit" className="submit-button">Login</button>

        <div className="relative flex items-center mt-8">
          <div className="border h-0 w-2/4 border-stone-300"></div>
          <div className=" text-stone-300 px-4 text-sm font-normal">OR</div>
          <div className=" border h-0 w-2/4 border-stone-300"></div>
        </div>
        <Link to="/register" type="submit"
          className="border border-indigo-900 rounded-lg  text-center  text-indigo-900 bg-white text-base font-semibold w-full py-3 mt-9">Signup
          now</Link>
      </form>
    </div>
  );
};

export default Login;