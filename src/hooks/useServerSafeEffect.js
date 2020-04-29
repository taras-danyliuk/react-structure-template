import { useEffect } from "react";
import { useSelector } from "react-redux";


function useServerSafeEffect(action, dependencies) {
  useEffect(action, dependencies);

  const shouldTrack = useSelector(state => state.ssr.shouldTrack);
  if (!shouldTrack) return;

  action();
}

export default useServerSafeEffect;
