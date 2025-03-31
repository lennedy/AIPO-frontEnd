import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Alert from "@mui/material/Alert";
import getApiAddress from "serverAddress";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [foto, setFoto] = useState(localStorage.getItem("site.foto") || "");
  const [tipoUsuario, setTipoUsuario] = useState(localStorage.getItem("site.tipoUsuario") || "");
  const [matricula, setMatricula] = useState(localStorage.getItem("site.matricula") || "");
  const [nome, setNome] = useState(localStorage.getItem("site.nome") || "");
  const [user, setUser] = useState({
    nome: nome,
    matricula: matricula,
    tipoUsuario: tipoUsuario,
    foto: foto,
  });
  const [token, setToken] = useState(localStorage.getItem("site.token") || "");
  const [nivelGerencia, setNivelGerencia] = useState(
    localStorage.getItem("site.nivelGerencia") || ""
  );

  const navigate = useNavigate();
  const loginAction = async (data, lembrar) => {
    const api = getApiAddress();
    try {
      const response = await fetch(api.database + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      console.log("Toronto");
      console.log(res);
      if (res.status == "ok") {
        setUser({
          nome: res.data.nome_usual,
          matricula: res.data.matricula,
          tipoUsuario: res.data.tipoUsuario,
          foto: res.data.foto,
        });
        console.log("Authprovider");
        console.log(res.data.nome_usual);

        setToken(res.data.token);
        setNivelGerencia(res.data.nivelGerencia);
        if (lembrar) {
          localStorage.setItem("site.token", res.data.token);
          localStorage.setItem("site.nivelGerencia", res.data.nivelGerencia);
          localStorage.setItem("site.nome", res.data.nome_usual);
          localStorage.setItem("site.matricula", res.data.matricula);
          localStorage.setItem("site.tipoUsuario", res.data.tipoUsuario);
          localStorage.setItem("site.foto", res.data.foto);
        }
        // navigate("/profile");
        if (res.data.nivelGerencia == "administrador") {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
        return;
      } else {
        throw new Error(res.status);
      }
      throw new Error(res.message);
    } catch (err) {
      if (err == "Error: falha_login") {
        alert("Login ou senha incorretos");
      } else {
        console.log(err);
        alert("Erro de acesso ao sistema, procure o administrador do sistema");
      }
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site.token");
    localStorage.removeItem("site.nivelGerencia");
    localStorage.removeItem("site.nome");
    localStorage.removeItem("site.matricula");
    localStorage.removeItem("site.tipoUsuario");
    localStorage.removeItem("site.foto");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, nivelGerencia, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
