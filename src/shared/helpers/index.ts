export const debounce = (fn: Function, ms = 2000) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export const AwaitScrollIntoView = (
    elem: Element,
    options?: ScrollIntoViewOptions,
    direction: string = 'left'
):Promise<void> => {
  return new Promise<void>( (resolve) => {
    if( !( elem instanceof Element ) ) {
      throw new TypeError( 'Argument 1 must be an Element' );
    }
    let same: number = 0;
    let lastPos: number | null = null;
    const scrollOptions: ScrollIntoViewOptions = Object.assign( { behavior: 'smooth' }, options );

    elem.scrollIntoView( scrollOptions );
    requestAnimationFrame( check );
    
    function check() {
        const DOMRectValues = elem.getBoundingClientRect()
        const newPos: number = DOMRectValues[direction as keyof DOMRect] as number;
      
        if(newPos === lastPos ) {
            if(same ++ > 2) return resolve();
        }
        else {
            same = 0;
            lastPos = newPos;
        }
        requestAnimationFrame(check);
    }
    });
}