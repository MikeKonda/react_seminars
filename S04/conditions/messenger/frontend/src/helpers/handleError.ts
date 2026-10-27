export function handleError(error: unknown): string {
  if (typeof error === "string") return error;
  if (!error) return "Неизвестная ошибка";

  const anyError = error as any;

  if (anyError.response) {
    if (anyError.response.status === 401) {
      return "Сессия истекла или неверные данные. Войдите заново.";
    }
    const msg = anyError.response.data?.message;
    if (typeof msg === "string") return msg;
    return `Ошибка сервера: ${anyError.response.status}`;
  }

  if (anyError.code === "ERR_NETWORK" || anyError.message === "Network Error") {
    return "Сетевая ошибка. Проверьте, что сервер запущен на http://localhost:3001.";
  }

  if (anyError.name === "TypeError" && /fetch/i.test(String(anyError.message))) {
    return "Сетевая ошибка. Проверьте соединение с сервером.";
  }

  if (anyError.message) return anyError.message as string;
  return "Запрос не выполнен";
}

export async function parseJsonResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  if (!text) throw new Error("Пустой ответ от сервера");
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("Некорректный JSON в ответе");
  }
}
