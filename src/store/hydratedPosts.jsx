import { dehydrate, Hydrate } from '@tanstack/react-query';
import getQueryClient from './getQueryClient';

export default async function HydratedPosts() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['posts'], getPosts);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      {' '}
      // Posts 컴포넌트로 내려줄땐 다시 Hydrate한다.
      <Posts />
    </Hydrate>
  );
}
