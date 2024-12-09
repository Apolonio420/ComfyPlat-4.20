import React, { useEffect, useRef } from "react";
import * as fabric from "fabric";

interface MockupDisplayProps {
  imageUrl: string;
  onClose: () => void;
}

export function MockupDisplay({ imageUrl, onClose }: MockupDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Crear el canvas de Fabric
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 800,
    });

    // Cargar la máscara base
    (fabric.Image.fromURL as (
      url: string,
      callback: (img: fabric.Image | null) => void
    ) => void)(
      "/images/creo3001-mask.png",
      (maskImage) => {
        if (maskImage) {
          maskImage.scaleToWidth(800); // Escalar la máscara al ancho del canvas
          canvas.add(maskImage);

          // Cargar la imagen generada
          (fabric.Image.fromURL as (
            url: string,
            callback: (img: fabric.Image | null) => void
          ) => void)(imageUrl, (generatedImage) => {
            if (generatedImage) {
              generatedImage.scaleToWidth(400); // Escalar la imagen generada
              generatedImage.set({
                left: 200, // Posicionar la imagen en el canvas
                top: 200,
              });
              canvas.add(generatedImage); // Agregar la imagen al canvas
              canvas.renderAll(); // Renderizar el canvas
            }
          });
        }
      }
    );

    // Limpiar el canvas al desmontar el componente
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
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
