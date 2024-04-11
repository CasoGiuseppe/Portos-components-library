import type { IResizeObserver } from './interfaces/useResizeObserver';

export default function useResizeObserver({ action } : { action?: (e:any) => any }): IResizeObserver {
  const createObserver = ({ trigger = document.body }: { trigger?: HTMLElement | Element }) : void => {
    const observer = _settingObserver()
    observer.observe(trigger);
  };

  const _settingObserver = () : ResizeObserver => {
    const observerEvent = new ResizeObserver(async (mutations: any) => {
        for(const mutation of mutations) {
          if(action) action(mutation)
        }
    });

    observerEvent.disconnect()
    return observerEvent
  };

  return { createObserver }
}