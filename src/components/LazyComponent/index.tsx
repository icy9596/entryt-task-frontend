import { lazy, Suspense } from "react";

import { useCreation } from "@/hooks";
import Loading from './Loading';

interface Props {
  factory: () => Promise<{ default: (...args: any[]) => JSX.Element }>;
}

const LazyComponent = ({ factory }: Props): JSX.Element => {
  const Component = useCreation(() => {
    return lazy(factory);
  }, []);

  return (
    <Suspense fallback={<Loading />}>
      <Component />
    </Suspense>
  );
};

export default LazyComponent;
