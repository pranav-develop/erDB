import { debounce } from "@/lib/utils";
import {
    type DependencyList,
    type EffectCallback,
    useCallback,
    useRef,
    useEffect,
  } from "react";
  
  /**
   * @desc This hook is used to debounce the effect function.
   */
  export function useLazyEffect(
    effect: EffectCallback,
    deps: DependencyList = [],
    wait = 500,
  ) {
    const cleanUp = useRef<void | (() => void)>();
    const effectRef = useRef<EffectCallback>();
    const updatedEffect = useCallback(effect, deps);
    effectRef.current = updatedEffect;
    const lazyEffect = useCallback(
      debounce(() => {
        cleanUp.current = effectRef.current?.();
      }, wait),
      [],
    );
    useEffect(lazyEffect, deps);
    useEffect(() => {
      return () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-unused-expressions
        cleanUp.current instanceof Function ? cleanUp.current() : undefined;
      };
    }, []);
  }