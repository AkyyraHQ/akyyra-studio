export const useApi = () => {
  const config = useRuntimeConfig();
  const base = config.public.apiBase;

  const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
    const response = await fetch(`${base}/api/v1${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers ?? {}),
      },
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    return response.json() as Promise<T>;
  };

  return { request };
};
