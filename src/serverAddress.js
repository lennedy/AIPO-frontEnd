// endereço do servidor onde está a API
export default function getApiAddress() {
  const apiAddress = {
    database: process.env.REACT_APP_API_URL || "/api",
    serial: "http://127.0.0.1:8000" 
  };
  return apiAddress;
}

// const apiAddress = { api: "https://192.168.1.29/api", serial: "localhost" };

// export default apiAddress;
