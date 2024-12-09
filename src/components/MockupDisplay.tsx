import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

interface MockupDisplayProps {
  imageUrl: string;
  onClose: () => void;
}

export function MockupDisplay({ imageUrl, onClose }: MockupDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 800,
    });

    (fabric.Image.fromURL as (
      url: string,
      callback: (img: fabric.Image | null) => void
    ) => void)(
      "/images/creo3001-mask.png",
      (maskImage) => {
        if (maskImage) {
          maskImage.scaleToWidth(800);
          canvas.add(maskImage);

          (fabric.Image.fromURL as (
            url: string,
            callback: (img: fabric.Image | null) => void
          ) => void)(imageUrl, (generatedImage) => {
            if (generatedImage) {
              generatedImage.scaleToWidth(400);
              generatedImage.set({
                left: 200,
                top: 200,
              });
              canvas.add(generatedImage);
              canvas.renderAll();
            } else {
              setError("Error al cargar la imagen generada.");
            }
          });
        } else {
          setError("Error al cargar la máscara.");
        }
      }
    );

    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 rounded-lg">
        <button onClick={onClose} className="mb-4">
          Cerrar
        </button>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <canvas ref={canvasRef} />
        )}
      </div>
    </div>
  );
}
