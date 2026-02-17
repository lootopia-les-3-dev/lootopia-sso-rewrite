import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema } from "../../schemas/loginSchema";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(loginSchema) });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Email:</label>
      <input {...register("email")} type="email" required />
      <p>{errors.email?.message}</p>

      <label>Password:</label>
      <input {...register("password")} type="password" required />
      <p>{errors.password?.message}</p>

      <input type="submit" />
    </form>
  );
};

export default LoginForm;
