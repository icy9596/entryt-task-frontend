import { lazy, Suspense } from "react";

import { useCreation } from "@/hooks";
import Loading from "./Loading";

type Factory = () => Promise<{ default: (...args: any[]) => JSX.Element }>;

interface Props {
  factory: Factory;
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

const lazyCom = (factory: Factory) => {
  return (): JSX.Element => {
    return <LazyComponent factory={factory} />;
  };
};

export { lazyCom };
