"use client";

interface BookingWidgetProps {
  variant?: "light" | "dark";
  className?: string;
}

export default function BookingWidget({ variant = "light", className = "" }: BookingWidgetProps) {
  const handleReserve = () => {
    const el = document.getElementById("reservas");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const bg = variant === "dark" ? "bg-wilson-blue-deep/80 backdrop-blur-sm" : "bg-white/95 backdrop-blur-sm";
  const labelColor = variant === "dark" ? "text-wilson-sand" : "text-wilson-graphite";
  const inputBg = variant === "dark" ? "bg-wilson-blue/40 border-wilson-sand/30 text-white placeholder-wilson-sand/60" : "bg-white border-wilson-sand text-wilson-graphite";

  return (
    <div className={`${bg} shadow-xl p-6 ${className}`}>
      <p className={`font-montserrat text-xs tracking-widest uppercase mb-4 ${labelColor} opacity-70`}>
        Verificar disponibilidad
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className={`block font-montserrat text-xs uppercase tracking-wider mb-1 ${labelColor} opacity-60`}>
            Llegada
          </label>
          <input
            type="date"
            className={`w-full border px-3 py-2 font-montserrat text-sm focus:outline-none focus:border-wilson-gold transition-colors ${inputBg}`}
          />
        </div>
        <div>
          <label className={`block font-montserrat text-xs uppercase tracking-wider mb-1 ${labelColor} opacity-60`}>
            Salida
          </label>
          <input
            type="date"
            className={`w-full border px-3 py-2 font-montserrat text-sm focus:outline-none focus:border-wilson-gold transition-colors ${inputBg}`}
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleReserve}
            className="w-full btn-gold py-2.5 text-xs"
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
