import { createFileRoute } from '@tanstack/react-router'

export const Route =
    createFileRoute('/terms-privacy')({
        component: TermsPrivacyPage,
    })

function TermsPrivacyPage() {
    return (
        <main className="py-10 sm:py-14">
            <div className="container-app">
                <div
                    className="
                        mx-auto
                        max-w-4xl

                        rounded-2xl
                        border
                        border-border

                        bg-card

                        p-6

                        sm:p-10
                    "
                >
                    <header className="mb-10">
                        <h1
                            className="
                                text-3xl
                                font-bold
                                tracking-tight

                                sm:text-4xl
                            "
                        >
                            Términos de Uso y Política de Privacidad
                        </h1>

                        <p
                            className="
                                mt-4
                                text-muted-foreground
                            "
                        >
                            Última actualización:{' '}
                            {new Date().toLocaleDateString(
                                'es-AR',
                            )}
                        </p>
                    </header>

                    <div
                        className="
                            space-y-10

                            text-sm
                            leading-7

                            sm:text-base
                        "
                    >
                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                1. Introducción
                            </h2>

                            <p className="text-muted-foreground">
                                Bienvenido a Fenix Fichas.
                                Al utilizar nuestra plataforma,
                                aceptás los presentes Términos
                                de Uso y nuestra Política de
                                Privacidad.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                2. Uso de la plataforma
                            </h2>

                            <p className="text-muted-foreground">
                                Fenix Fichas permite a los
                                usuarios gestionar solicitudes
                                de recarga, participar en
                                programas de beneficios y
                                acceder a funcionalidades
                                relacionadas con la plataforma.
                            </p>

                            <p className="mt-3 text-muted-foreground">
                                El usuario se compromete a
                                proporcionar información veraz,
                                actualizada y completa durante
                                el uso del servicio.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                3. Cuentas de usuario
                            </h2>

                            <p className="text-muted-foreground">
                                Cada usuario es responsable de
                                mantener la confidencialidad de
                                sus credenciales de acceso y de
                                todas las actividades realizadas
                                desde su cuenta.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                4. Programa de puntos y beneficios
                            </h2>

                            <p className="text-muted-foreground">
                                Los puntos otorgados dentro de
                                la plataforma no poseen valor
                                monetario y únicamente pueden
                                utilizarse para acceder a los
                                beneficios disponibles en Fenix
                                Fichas.
                            </p>

                            <p className="mt-3 text-muted-foreground">
                                Nos reservamos el derecho de
                                modificar, suspender o finalizar
                                programas de beneficios,
                                promociones o recompensas en
                                cualquier momento.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                5. Conducta permitida
                            </h2>

                            <p className="text-muted-foreground">
                                No está permitido:
                            </p>

                            <ul
                                className="
                                    mt-3
                                    list-disc
                                    space-y-2
                                    pl-6
                                    text-muted-foreground
                                "
                            >
                                <li>
                                    Utilizar información falsa o
                                    engañosa.
                                </li>

                                <li>
                                    Intentar acceder a cuentas de
                                    terceros.
                                </li>

                                <li>
                                    Manipular el sistema de
                                    puntos o recompensas.
                                </li>

                                <li>
                                    Utilizar la plataforma con
                                    fines ilícitos.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                6. Limitación de responsabilidad
                            </h2>

                            <p className="text-muted-foreground">
                                Fenix Fichas realiza esfuerzos
                                razonables para mantener la
                                disponibilidad y seguridad del
                                servicio, aunque no garantiza un
                                funcionamiento ininterrumpido o
                                libre de errores.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                7. Información que recopilamos
                            </h2>

                            <p className="text-muted-foreground">
                                Podemos recopilar información
                                necesaria para operar la
                                plataforma, incluyendo:
                            </p>

                            <ul
                                className="
                                    mt-3
                                    list-disc
                                    space-y-2
                                    pl-6
                                    text-muted-foreground
                                "
                            >
                                <li>Nombre y datos de contacto.</li>

                                <li>
                                    Información relacionada con
                                    la cuenta.
                                </li>

                                <li>
                                    Historial de solicitudes y
                                    beneficios.
                                </li>

                                <li>
                                    Datos técnicos básicos de
                                    navegación.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                8. Uso de la información
                            </h2>

                            <p className="text-muted-foreground">
                                La información recopilada se
                                utiliza para:
                            </p>

                            <ul
                                className="
                                    mt-3
                                    list-disc
                                    space-y-2
                                    pl-6
                                    text-muted-foreground
                                "
                            >
                                <li>
                                    Gestionar cuentas y
                                    solicitudes.
                                </li>

                                <li>
                                    Mejorar nuestros servicios.
                                </li>

                                <li>
                                    Brindar soporte al usuario.
                                </li>

                                <li>
                                    Comunicar novedades o cambios
                                    relevantes.
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                9. Protección de datos
                            </h2>

                            <p className="text-muted-foreground">
                                Implementamos medidas razonables
                                para proteger la información de
                                nuestros usuarios frente a
                                accesos no autorizados,
                                alteraciones o divulgaciones
                                indebidas.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                10. Cookies
                            </h2>

                            <p className="text-muted-foreground">
                                La plataforma puede utilizar
                                cookies y tecnologías similares
                                para mejorar la experiencia de
                                navegación y recordar
                                preferencias del usuario.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                11. Modificaciones
                            </h2>

                            <p className="text-muted-foreground">
                                Nos reservamos el derecho de
                                actualizar estos términos y esta
                                política cuando resulte
                                necesario. Los cambios entrarán
                                en vigencia una vez publicados en
                                esta página.
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-xl font-semibold">
                                12. Contacto
                            </h2>

                            <p className="text-muted-foreground">
                                Si tenés consultas relacionadas
                                con estos términos o con la
                                privacidad de tus datos, podés
                                comunicarte con nuestro equipo de
                                soporte a través de los canales
                                oficiales de Fenix Fichas.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    )
}