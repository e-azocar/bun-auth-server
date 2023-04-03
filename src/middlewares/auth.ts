import { AppContext } from '../types/user';

export const isAuth = async ({ set, bearer, jwt }: AppContext) => {
  if (!bearer) {
    set.status = 401;
    return { message: 'Unauthorized' };
  }

  const tokenData = await jwt.verify(bearer);

  if (!tokenData || !tokenData?.id) {
    set.status = 401;
    return { message: 'Unauthorized' };
  }
}
