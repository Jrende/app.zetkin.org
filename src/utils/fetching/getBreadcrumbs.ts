import APIError from 'utils/apiError';
import { Breadcrumb } from '../types';
import defaultFetch from './defaultFetch';

export default function getBreadcrumbs(
  pathname: string,
  queryString: string,
  fetch = defaultFetch
) {
  return async (): Promise<Breadcrumb[]> => {
    const url = `/breadcrumbs?pathname=${pathname}&${queryString}`;
    const bRes = await fetch(url);
    if (!bRes.ok) {
      throw new APIError('GET', url);
    }
    const bData = await bRes.json();
    return bData.breadcrumbs;
  };
}
