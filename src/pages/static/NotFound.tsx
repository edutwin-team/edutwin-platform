import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-6 overflow-hidden">
      <div className="text-center relative">
        <div
          className="
            motion-element
            absolute
            -top-16
            -left-16
            w-32
            h-32
            bg-primary/20
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            motion-element
            absolute
            -bottom-16
            -right-16
            w-40
            h-40
            bg-secondary/20
            rounded-full
            blur-3xl
            animate-pulse
          "
        />

        <h1
          className="
            motion-element
            text-8xl
            md:text-9xl
            font-black
            text-primary
            leading-none
            drop-shadow-lg
            animate-bounce
          "
        >
          404
        </h1>

        <h2
          className="
            mt-3
            text-2xl
            md:text-3xl
            font-bold
            text-base-content
          "
        >
          Page introuvable 😢
        </h2>

        <p
          className="
            mt-3
            max-w-md
            mx-auto
            text-base
            text-base-content/70
          "
        >
          Oups... cette page n’existe pas ou a été déplacée.
        </p>

        <div className="mt-5">
          <div
            className="
              motion-element
              mx-auto
              w-16
              h-16
              rounded-full
              bg-primary/10
              flex
              items-center
              justify-center
              animate-spin
              [animation-duration:6s]
            "
          >
            <span className="text-3xl">🪐</span>
          </div>
        </div>

        <Link
          to="/"
          className="
            btn
            btn-primary
            mt-6
            rounded-full
            px-7
            shadow-md
            hover:scale-105
            transition-transform
          "
        >
          🏠 Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
