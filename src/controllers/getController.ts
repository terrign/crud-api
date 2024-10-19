import { serverEndpoints } from '@/controllers/constants';
import type { TApi, TController, TDynamicRoute } from '@/types';
import { isController, isDynamicRoute } from '@/types/guards';

const getController = (path: string, method?: string): TController | null => {
  if (!method) {
    return null;
  }

  const pathToController = [...path.split('/').filter(Boolean), method];

  let current: TApi | TController | null = serverEndpoints;

  for (const path of pathToController) {
    if (!current) {
      break;
    }

    if (isController(current)) {
      break;
    }

    if (path in current) {
      current = current[path];
      continue;
    }

    const dynamicRoute: TDynamicRoute | undefined = Object.keys(current).find(isDynamicRoute);

    if (dynamicRoute) {
      current = current[dynamicRoute];
      continue;
    }

    current = null;
  }

  if (isController(current)) {
    return current;
  }

  return null;
};

export { getController };
