import { useRef } from 'react';

import { isDepsSame } from './helper';

const useCreation = <T = any>(factory: () => T, deps: any[]): T => {
    const data = useRef<{
        isInit: boolean,
        value: T | null,
        deps: any[],
    }>({
        isInit: false,
        value: null,
        deps,
    });

    if (!data.current.isInit || !isDepsSame(data.current.deps, deps)) {
        data.current.isInit = true;
        data.current.value = factory();
    }

    return data.current.value as T;
}

export default useCreation;