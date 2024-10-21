import { serverEndpoints } from '@/controllers/constants';
import type { TApi, TController } from '@/types';
import { isDynamicRoute } from '@/types/guards';

const getController = (path: string, method?: string): TController | null => {
  if (!method) {
    return null;
  }

  const pathToController = [...path.split('/').filter(Boolean)];

  let current: TApi | null = serverEndpoints;

  for (const path of pathToController) {
    const dynamicRoute = Object.keys(current).find(isDynamicRoute) as string;

    if (!current[path] && !dynamicRoute) {
      current = null;
      break;
    }

    if (current[path]) {
      current = current[path] as TApi;
      continue;
    }

    if (dynamicRoute) {
      current = current[dynamicRoute] as TApi;
    }
  }

  if (!current) {
    return null;
  }

  const controller = current[method] as TController | undefined;

  return controller ?? null;
};

export { getController };
