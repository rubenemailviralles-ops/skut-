import type { SVGProps } from 'react';

type GenderPictogramProps = SVGProps<SVGSVGElement> & {
  variant: 'male' | 'female';
};

export default function GenderPictogram({ variant, className, ...props }: GenderPictogramProps) {
  if (variant === 'female') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={className}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <circle cx="12" cy="6.2" r="2.2" />
        <path d="M12 8.6v3.2" />
        <path d="M9.2 15.2L12 11.8l2.8 3.4" />
        <path d="M10.4 19.4l1.6-4.2 1.6 4.2" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="6.2" r="2.2" />
      <path d="M12 8.6v4.4" />
      <path d="M9.8 12.2L12 10l2.2 2.2" />
      <path d="M10.6 19.4V13.2" />
      <path d="M13.4 19.4V13.2" />
    </svg>
  );
}

