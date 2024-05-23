'use client';
import CircularProgress from '@mui/material/CircularProgress';

export default function Circulator() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <CircularProgress className="text-primary" />
    </div>
  );
}
