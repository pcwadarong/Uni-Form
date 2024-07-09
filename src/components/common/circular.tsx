const CircularProgress = () => (
  <div className="inline-block w-12 h-12">
    <svg className="animate-spin" viewBox="25 25 50 50">
      <circle
        className="stroke-current stroke-primary"
        cx="50"
        cy="50"
        r="20"
        fill="none"
        strokeWidth="4"
        strokeDasharray="89, 200"
        strokeDashoffset="0"
        style={{ animation: 'dash 1.5s ease-in-out infinite' }}
      />
    </svg>
    <style jsx>{`
      @keyframes dash {
        0% {
          stroke-dasharray: 1, 200;
          stroke-dashoffset: 0;
        }
        50% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -35px;
        }
        100% {
          stroke-dasharray: 89, 200;
          stroke-dashoffset: -124px;
        }
      }
    `}</style>
  </div>
);

export default CircularProgress;
