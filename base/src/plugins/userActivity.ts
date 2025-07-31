import { throttleFilter, useIdle } from '@vueuse/core';

export const useUserActivity = (idleDelay = 30_1000) => {
  const { idle, lastActive } = useIdle(idleDelay, {
    events: ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'],
    eventFilter: throttleFilter(1000),
    listenForVisibilityChange: true,
  });
  return { idle, lastActive };
};
