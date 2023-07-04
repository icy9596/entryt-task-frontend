/**
 * 比较hook的依赖项
 * @param prevDeps 
 * @param deps 
 * @returns 
 */
const isDepsSame = (prevDeps: any[], deps: any[]) => {
  if (prevDeps === deps) return true;
  if (prevDeps.length !== deps.length) return false;

  for (let i = 0, len = prevDeps.length; i < len; i++) {
    if (prevDeps[i] !== deps[i]) {
      return false;
    }
  }

  return true;
};

export { isDepsSame };
