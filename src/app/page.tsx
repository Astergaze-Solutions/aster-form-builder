"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { type Swapy, createSwapy } from 'swapy'
export default function Home() {
  const swapy = useRef<Swapy>(null)
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If container element is loaded
    if (container.current) {
      swapy.current = createSwapy(container.current)

      // event listeners
      swapy.current.onSwap((event) => {
        console.log('swap', event);
      });
    }
    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy()
    }
  }, []);


  return (

    <div className="h-full w-full overflow-hidden flex flex-col items-center justify-center">
      <h1>Swapy experiement</h1>
      <div ref={container} className="w-[50vw] border rounded-xl p-10 m-2 flex flex-col gap-2">
        <div data-swapy-slot="a" className="relative">
          <div data-swapy-item="a" className="select-none w-full h-10 flex items-center bg-gray-300 rounded-lg p-2">
            <div>A</div>
          </div>

        </div>

        <div data-swapy-slot="b" className="relative" >
          <div data-swapy-item="b" className="select-none w-full h-10 flex items-center bg-gray-300 rounded-lg p-2">
            <div>B</div>
          </div>

        </div>
        <div data-swapy-slot="c" className="relative" >
          <div data-swapy-item="c" className="select-none w-full h-10 flex items-center bg-gray-300 rounded-lg p-2">
            <div>c</div>
          </div>

        </div>
        <div data-swapy-slot="d" className="relative" >
          <div data-swapy-item="d" className="select-none w-full h-10 flex items-center bg-gray-300 rounded-lg p-2">
            <div>d</div>
          </div>

        </div>
      </div>

      <br />
      <a href="/form-builder"><Button>View Form Builder</Button></a>
    </div>
  );
}
