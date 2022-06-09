import { useState } from "react";
import { useRouter } from "next/router";
import { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "@components/AuthLayout";
import { Input } from "@components/FormElements/Input";
import { RegistrationFormInputs, registrationSchema } from "utils/schema";
import { Button } from "@components/Button";
import { useMutation } from "react-query";
import { signup } from "@lib/api";
import { handleError } from "@utils/error_handler";

const SignUpPage = () => {
  const [error, setError] = useState(null);
  const methods = useForm<RegistrationFormInputs>({
    resolver: zodResolver(registrationSchema),
  });

  const {
    formState: { isSubmitting },
    reset,
  } = methods;

  const router = useRouter();

  const signupMutation = useMutation<
    AxiosResponse<{ data: string }>,
    AxiosError,
    Parameters<typeof signup>["0"]
  >(signup, {
    onMutate: () => {
      setError(null);
    },
    onSuccess: (response) => {
      router.push("/");
      reset();
    },
    onError: (responseError) => {
      const error = handleError(responseError);
      setError(error);
    },
  });

  const onSubmit: SubmitHandler<RegistrationFormInputs> = (data) => {
    const { confirm_password, ...payload } = data;
    signupMutation.mutate(payload);
  };

  return (
    <AuthLayout>
      <div>
        <h1 className="text-xl text-gray-800 font-medium">
          Create a free account
        </h1>
        {error ? (
          <div className="px-4 py-2 my-2 bg-red-200 rounded-md transition-all duration-150">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        ) : null}
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input label="Name" name="username" placeholder="John Doe" />
            <Input
              label="Email"
              name="email"
              type={"email"}
              placeholder="johndoe@gmail.com"
            />
            <Input label="Password" name="password" type={"password"} />
            <Input
              label="Confirm Password"
              name="confirm_password"
              type={"password"}
            />
            <Button className="w-full" type="submit" loading={isSubmitting}>
              Sign Up
            </Button>
          </form>
        </FormProvider>
        <div className="text-base text-gray-800 text-center my-6">
          <span className="">Or {` `}</span>
          <Link href={"/signin"}>
            <a className=" underline decoration-solid decoration-gray-500 ">
              sign in
            </a>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUpPage;
