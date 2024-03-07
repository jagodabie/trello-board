export const Plus = ({ color }: { color?: string }) => (
  <svg
    width='17'
    height='16'
    viewBox='0 0 17 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clip-path='url(#clip0_2753_209)'>
      <path
        d='M7.83331 7.33334V3.33334H9.16665V7.33334H13.1666V8.66668H9.16665V12.6667H7.83331V8.66668H3.83331V7.33334H7.83331Z'
        fill={color ? color : '#001C39'}
      />
    </g>
    <defs>
      <clipPath id='clip0_2753_209'>
        <rect width='16' height='16' fill='white' transform='translate(0.5)' />
      </clipPath>
    </defs>
  </svg>
);
