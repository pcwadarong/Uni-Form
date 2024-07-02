'use client';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <CircularProgress className="text-primary" />
    </div>
  );
}
