// src/hooks/useLoader.ts
import { useState, useCallback } from "react";

/**
 * A simple hook to control a loading state.
 * @param initialState - The initial loading state (default is false).
 * @returns An object with `loading` and a `toggleLoader` function.
 */
export function useLoader(initialState: boolean = false) {
  const [loading, setLoading] = useState(initialState);

  /**
   * Updates the loading state.
   * @param state - A boolean value to set the loading state.
   */
  const toggleLoader = useCallback((state: boolean) => {
    setLoading(state);
  }, []);

  return { loading, toggleLoader };
}
