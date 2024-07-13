import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../constants";

export const authUtil = () => {
  const login = async (email, password) => {
    try {
      const resp = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!resp.ok) {
        throw new Error("No se ha podido iniciar sesión");
      }
      return await resp.json();
    } catch (error) {
      console.log("Ha ocurrido un error en el login -> ", error);
    }
  };

  const register = async (name, nick, email, password) => {
    try {
      const resp = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          nick,
          email,
          password,
        }),
      });
      if (!resp.ok) {
        throw new Error("No se ha podido registrar");
      }
      return await resp.json();
    } catch (error) {
      console.log("Ha ocurrido un error en el registro -> ", error);
    }
  };

  return {
    login,
    register,
  };
};
