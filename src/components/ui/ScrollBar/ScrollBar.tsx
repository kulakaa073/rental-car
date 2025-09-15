import clsx from 'clsx';
import { forwardRef } from 'react';
import Scrollbar from 'react-scrollbars-custom';

interface ScrollBarProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollBar = forwardRef<HTMLDivElement, ScrollBarProps>(
  ({ children, className }: ScrollBarProps, ref) => {
    return (
      <div ref={ref} className={clsx(className, 'w-full h-full')}>
        <Scrollbar
          noDefaultStyles
          disableTracksWidthCompensation
          noScrollX
          style={{ width: '100%', height: '100%' }}
          wrapperProps={{
            className: 'absolute inset-0',
          }}
          scrollerProps={{
            className: 'p-0 m-0 min-h-full',
          }}
          trackYProps={{
            className: `
              absolute right-0 top-2 h-[calc(100%-1rem)] w-2
              bg-none rounded-md hover:bg-gray-200/50 transition-colors z-50
            `,
          }}
          thumbYProps={{
            className: `
              w-full bg-gray-300 rounded-md cursor-pointer
              hover:bg-gray-400 [&.dragging]:bg-gray-400 transition-colors z-50
            `,
          }}
        >
          {children}
        </Scrollbar>
      </div>
    );
  }
);
