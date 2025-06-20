export default function formatDate(date, format) {
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    aa: date.getFullYear().toString().slice(-2),
    aaaa: date.getFullYear(),
  };

  return format.replace(/mm|dd|aa|aaaa/gi, (matched) => map[matched]);
}

export function getDate_lastDays(lastDaysAgo) {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);

  // const d_inicial = new Date(ano_inicial, mes_inicial);
  const temp = new Date().setDate(today.getDate() - lastDaysAgo);
  const d_inicial = new Date(temp);

  const data_inicia_final = {
    data_inicial: formatDate(d_inicial, "aa-mm-dd"),
    data_final: formatDate(today, "aa-mm-dd"),
  };

  return data_inicia_final;
}

export function getDate_last30Days() {
  return getDate_lastDays(29);
}

export function getDate_last7Days() {
  return getDate_lastDays(6);
}

export function errorHandling(json, message) {
  if (json["status"] == "ok") {
    alert(message);
  } else if (json["status"] == "Token has expired") {
    alert("O login expirou. Refaça o login");
    authData.logOut();
  } else {
    alert("Erro:" + json["status"]);
  }
}
