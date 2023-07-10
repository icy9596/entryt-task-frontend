import request from "@/utils/request";

const fetchRegister = (formValues: { username: string; password: string }) => {
  return request.post("/users/register", {
    data: formValues,
  });
};

const fetchLogin = (formValues: { username: string; password: string }) => {
  return request.post<{ id: number; token: string; username: string }>(
    "/users/login",
    {
      data: formValues,
    }
  );
};

export { fetchRegister, fetchLogin };
