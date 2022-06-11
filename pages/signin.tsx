import { AuthLayout } from "@components/AuthLayout";
import { Input } from "@components/FormElements/Input";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormInputs, loginSchema } from "utils/schema";
import { Button } from "@components/Button";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { handleError } from "@utils/error_handler";
import { signin } from "@lib/api";
import { useRouter } from "next/router";

const SignInPage = () => {
  const [error, setError] = useState(null);

  const methods = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const {
    formState: { isSubmitting },
    reset,
  } = methods;

  const router = useRouter();

  const signinMutation = useMutation<
    AxiosResponse<{ data: string }>,
    AxiosError,
    Parameters<typeof signin>["0"]
  >(signin, {
    onMutate: () => {
      setError(null);
    },
    onSuccess: (response) => {
      router.push("/dashboard");
      reset();
    },
    onError: (responseError) => {
      const error = handleError(responseError);
      setError(error);
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    signinMutation.mutate(data);
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="text-xl text-gray-800 font-medium">Welcome Back</h1>
        {error ? (
          <div className="px-4 py-2 my-2 bg-red-200 rounded-md transition-all duration-150">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        ) : null}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input
              label="Email"
              name="email"
              type={"email"}
              placeholder="johndoe@gmail.com"
            />
            <Input label="Password" name="password" type={"password"} />

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Sign In
            </Button>
          </form>
        </FormProvider>
        <div className="text-base text-gray-800 text-center my-6">
          <span className="">Or {` `}</span>
          <Link href={"/signup"}>
            <a className=" underline decoration-solid decoration-gray-500 ">
              sign up
            </a>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignInPage;
