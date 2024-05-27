export const authUtil = () => {
  const login = async (email, password) => {
    try {
      const resp = await fetch("http://localhost:3900/user/login", {
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
    console.log('register')
    try {
      const resp = await fetch("http://localhost:3900/user/register", {
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
