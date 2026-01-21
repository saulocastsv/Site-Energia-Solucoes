import svgPaths from '@/imports/svg-jfs3qpcatf';
import imgVideoCover from 'figma:asset/69d9b3c8ec550ca645383d6edbde961cb7347d48.png';

export function VideoSection() {
  return (
    <section className="relative min-h-[500px] lg:min-h-[600px] bg-[#080808] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={imgVideoCover}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] lg:min-h-[600px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-[970px] mx-auto text-center space-y-8 lg:space-y-12">
          {/* Title */}
          <h2 className="font-['Plus_Jakarta_Sans'] font-normal text-white text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-tight">
            Pronto para injetar <span className="italic text-[#ff5c00] font-semibold">mais</span> energia no motor do seu negócio.
          </h2>

          {/* CTA Button */}
          <a href="#" className="backdrop-blur-sm bg-[rgba(0,0,0,0.2)] text-white px-6 py-3.5 rounded-lg font-['Roboto'] font-light text-base hover:bg-[rgba(0,0,0,0.3)] transition-colors inline-flex items-center gap-2"> 
            <span>Começar</span>
            <div className="bg-[#ff5c00] rounded-full w-6 h-6 flex items-center justify-center">
              <svg className="w-3 h-3" fill="white" viewBox="0 0 24 24">
                <path clipRule="evenodd" d={svgPaths.pac71810} fillRule="evenodd" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
