import type { UUID } from 'node:crypto';

import type { TApi, TController, TDynamicRoute } from '.';

const V4UUID_REG_EXP = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isValidId = (candidate: string | undefined): candidate is UUID => {
  if (!candidate) {
    return false;
  }

  return Boolean(candidate.match(V4UUID_REG_EXP));
};

const isController = (candidate: TController | TApi | null): candidate is TController => {
  if (typeof candidate === 'function') {
    return true;
  }

  return false;
};

const isDynamicRoute = (candidate: string): candidate is TDynamicRoute => {
  if (!candidate.startsWith('[')) {
    return false;
  }

  if (!candidate.endsWith(']')) {
    return false;
  }

  return true;
};

export { isController, isDynamicRoute, isValidId };
