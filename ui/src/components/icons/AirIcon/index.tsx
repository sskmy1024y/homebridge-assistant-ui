import React from 'react'

const path1 = `M9.0794 70.1895H100.521C113.778 70.1895 124.563 59.404 124.563 46.1472C124.563 32.9099 113.809 22.1367 100.578 22.1054C99.2746 22.0857 90.8114 22.2028 84.4917 28.3646C80.2577 32.4926 78.1114 38.1648 78.1114 45.2228C78.1114 48.3393 80.6375 50.8656 83.7542 50.8656C86.8708 50.8656 89.3967 48.3391 89.3967 45.2228C89.3967 41.3572 90.3791 38.422 92.3154 36.4993C95.3332 33.5022 100.028 33.3943 100.403 33.3905C100.456 33.3922 100.449 33.3913 100.52 33.3913C107.554 33.3913 113.277 39.1137 113.277 46.1472C113.277 53.1811 107.555 58.9035 100.52 58.9035H9.0794C5.96285 58.9035 3.43652 61.43 3.43652 64.5464C3.43652 67.6629 5.96285 70.1895 9.0794 70.1895Z`
const path2 = `M9.0794 48.0854H52.6649C65.9214 48.0854 76.7067 37.2999 76.7067 24.0431C76.7067 10.805 65.9532 0.0314253 52.722 0.00130767C51.4031 -0.0170976 42.9532 0.100445 36.6352 6.26055C32.4015 10.389 30.2548 16.0611 30.2548 23.1191C30.2548 26.2357 32.7809 28.7624 35.8977 28.7624C39.0145 28.7624 41.5402 26.2359 41.5402 23.1191C41.5402 19.2536 42.5225 16.3184 44.4589 14.3957C47.4763 11.399 52.1709 11.2902 52.5475 11.2864C52.6002 11.2881 52.5931 11.2873 52.6647 11.2873C59.6982 11.2873 65.4209 17.0096 65.4209 24.0431C65.4209 31.0771 59.6986 36.7994 52.6647 36.7994H9.0794C5.96285 36.7994 3.43652 39.326 3.43652 42.4427C3.43652 45.5595 5.96285 48.0854 9.0794 48.0854Z`
const path3 = `M100.521 79.9149H9.0794C5.96285 79.9149 3.43652 82.4415 3.43652 85.5578C3.43652 88.674 5.96264 91.2007 9.0794 91.2007H100.521C107.554 91.2007 113.277 96.9231 113.277 103.957C113.277 110.991 107.555 116.713 100.521 116.713C100.45 116.713 100.456 116.712 100.403 116.714C100.028 116.71 95.333 116.602 92.3156 113.605C90.3793 111.682 89.3969 108.747 89.3969 104.881C89.3969 101.764 86.871 99.2377 83.7544 99.2377C80.6379 99.2377 78.1116 101.764 78.1116 104.881C78.1116 111.939 80.2579 117.612 84.4919 121.74C90.557 127.654 98.5901 128.001 100.386 128C100.462 128 100.526 128 100.578 127.999C113.809 127.967 124.563 117.194 124.563 103.957C124.563 90.7 113.778 79.9149 100.521 79.9149Z`

const AirIcon = ({ size, color }: { size: number; color: string }) => (
  <svg width={size} height={size} viewBox='0 0 128 128' fill='none'>
    <path d={path1} fill={color} />
    <path d={path2} fill={color} />
    <path d={path3} fill={color} />
  </svg>
)

export default AirIcon