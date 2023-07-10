import request from "@/utils/request";

const fetchRegister = (formValues: { username: string; password: string }) => {
  return request.post("/users/register", {
    data: formValues,
  });
};

const fetchLogin = (formValues: { username: string; password: string }) => {
  return request.post<{ token: string }>(
    "/users/login",
    {
      data: formValues,
    }
  );
};

export { fetchRegister, fetchLogin };
