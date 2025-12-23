import React from "react";

export const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader" />
      <style jsx>{`
        .loader {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          position: relative;
          animation: rotate 1s linear infinite;
        }

        .loader::before,
        .loader::after {
          content: "";
          box-sizing: border-box;
          position: absolute;
          inset: 0px;
          border-radius: 50%;
          border: 6px solid #e5e7eb;
          animation: prixClipFix 2s linear infinite;
        }

        .loader::after {
          inset: 8px;
          transform: rotate3d(90, 90, 0, 180deg);
          border-color: var(--primary-600);
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes prixClipFix {
          0% {
            clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
          }
          50% {
            clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
          }
          75%,
          100% {
            clip-path: polygon(
              50% 50%,
              0 0,
              100% 0,
              100% 100%,
              100% 100%,
              100% 100%
            );
          }
        }
      `}</style>
    </div>
  );
};
