"use client";
import { DitherShader } from "@/components/ui/dither-shader";

export function DitherShaderDemoDuotone() {
  return (
    <div className="flex flex-col items-center gap-6 p-8">
      <div
        className="relative overflow-hidden rounded-2xl border border-neutral-200 shadow-2xl dark:border-neutral-800">
        <DitherShader
          src="https://p2.piqsels.com/preview/162/831/816/howrah-bridge-kolkata-india-sky.jpg"
          gridSize={1}
          ditherMode="bayer"
          colorMode="duotone"
          primaryColor="#1e3a5f"
          secondaryColor="#f0e68c"
          threshold={0.45}
          className="h-72 w-[400px] sm:h-80 sm:w-[500px]" />
      </div>
    </div>
  );
}
