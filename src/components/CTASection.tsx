import { Link } from '@tanstack/react-router'

export function CTASection() {
    return (
        <div className="">
            <div className="w-full h-full mx-auto relative overflow-hidden rounded-3xl  p-10 sm:p-50 text-center">

                {/* Glow background */}
                <div className="absolute  left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-indigo-500/20 blur-3xl rounded-full" />

                <div className="relative z-10 space-y-6">

                    {/* Badge */}
                    <span className="inline-flex items-center rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
                        Plataforma de beneficios
                    </span>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">
                        Sobre Nosotros
                    </h2>

                    {/* Description */}
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Un grupo pequeno de personas que ofrece beneficios exlusivos por confiar en nosotros como lugar de para hacer recargas a su casino favorito 
                    </p>

                    {/* Extra trust text */}
                    <p className="text-xs text-slate-500">
                        Sin costos ocultos • Activación inmediata • Soporte en tiempo real
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">

                        <Link
                            to="/dashboard"
                            className="bg-indigo-500 px-6 py-3 rounded-xl font-semibold text-white hover:bg-indigo-400 transition"
                        >
                            Ir a mi cuenta
                        </Link>

                        <Link
                            to="/signup"
                            className="bg-white/5 px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition border border-white/10"
                        >
                            Crear cuenta gratis
                        </Link>

                    </div>

                    {/* Social proof / placeholder */}
                    <div className="pt-6">
                        <p className="text-xs text-slate-500">
                            Más de <span className="text-white font-semibold">1,200+</span> usuarios ya están acumulando puntos
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}