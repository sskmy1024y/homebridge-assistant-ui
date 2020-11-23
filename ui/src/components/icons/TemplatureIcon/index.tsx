import React from 'react'

const path = `M67 18.5V73.2491V80.25V80.3634C73.55 83.8049 78 90.648 78 98.5C78 109.794 68.7942 119 57.375 119C45.9558 119 36.75 109.794 36.75 98.5C36.75 90.7483 41.087 83.9799 47.5 80.4969V80.25V73.345V18.5C47.5 13.1152 51.8652 8.75 57.25 8.75C62.6348 8.75 67 13.1152 67 18.5ZM41.25 76.7867V18.5C41.25 9.66344 48.4134 2.5 57.25 2.5C66.0866 2.5 73.25 9.66344 73.25 18.5V76.6046C80.0654 81.5091 84.5 89.4891 84.5 98.5C84.5 113.412 72.3557 125.5 57.375 125.5C42.3943 125.5 30.25 113.412 30.25 98.5C30.25 89.5997 34.5764 81.7053 41.25 76.7867ZM61.5 39.5H53V82.9104C47.1813 86.529 41.75 90.6864 41.75 97.75C41.75 106.587 48.7456 113.75 57.375 113.75C66.0044 113.75 73 106.587 73 97.75C73 90.5853 67.4122 86.4106 61.5 82.7554V39.5ZM95 19.75H80V26H95C96.3807 26 97.5 24.8807 97.5 23.5V22.25C97.5 20.8693 96.3807 19.75 95 19.75ZM80 35.5H90C91.3807 35.5 92.5 36.6193 92.5 38V39C92.5 40.3807 91.3807 41.5 90 41.5H80V35.5ZM95 51H80V57H95C96.3807 57 97.5 55.8807 97.5 54.5V53.5C97.5 52.1193 96.3807 51 95 51Z`

const TemplatureIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox='0 0 128 128' fill='none'>
    <g filter='url(#filter0_b)'>
      <path fillRule={'evenodd'} clipRule={'evenodd'} d={path} fill={color} />
    </g>
    <defs>
      <filter
        id='filter0_b'
        x='-4'
        y='-4'
        width='136'
        height='136'
        filterUnits='userSpaceOnUse'
        colorInterpolationFilters='sRGB'
      >
        <feFlood floodOpacity={0} result='BackgroundImageFix' />
        <feGaussianBlur in='BackgroundImage' stdDeviation='2' />
        <feComposite
          in2='SourceAlpha'
          operator='in'
          result='effect1_backgroundBlur'
        />
        <feBlend
          mode='normal'
          in='SourceGraphic'
          in2='effect1_backgroundBlur'
          result='shape'
        />
      </filter>
    </defs>
  </svg>
)

export default TemplatureIcon
