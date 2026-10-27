import { motion } from "motion/react";

/**
 * AntiqueMarbleMusePresence
 * 
 * Conception artistique : Une Muse antique en marbre blanc/ivoire qui existe en arrière-plan,
 * comme une apparition mystérieuse, un bas-relief de marbre antique ou une empreinte dans la pierre.
 * 
 * - Très grande silhouette partiellement coupée par le bord du viewport.
 * - Monochrome, ultra-discrète, subtilement floutée et diffusée dans la matière de la page.
 * - Présence partielle : profil sculpté serein, cascade de chevelure antique ondée, épaule et drapé en marbre.
 * - Totalement transparente sous les textes pour garantir une lisibilité éditoriale parfaite.
 */
export default function AntiqueMarbleMusePresence() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
    >
      {/* Subtle Warm Museum / Gallery Natural Ambient Chiaroscuro */}
      <div className="absolute -top-[10%] -left-[5%] w-[80vw] sm:w-[55vw] max-w-[700px] h-[75vh] bg-[radial-gradient(ellipse_at_top_left,_rgba(242,236,224,0.65)_0%,_rgba(247,243,234,0.3)_45%,_transparent_75%)] blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[45vw] max-w-[500px] h-[55vh] bg-[radial-gradient(ellipse_at_top_right,_rgba(244,239,230,0.5)_0%,_transparent_70%)] blur-3xl pointer-events-none" />

      {/* Monumental Marble Muse Sculpture Bas-Relief Imprint */}
      <motion.div
        animate={{
          y: [0, -5, 0],
          opacity: [0.14, 0.18, 0.14],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-6 -left-12 sm:-left-8 md:left-[-2%] lg:left-[1%] w-[380px] sm:w-[500px] md:w-[620px] lg:w-[720px] h-[95vh] max-h-[1100px] mix-blend-multiply"
      >
        <svg
          viewBox="0 0 540 850"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Marble & Antique Limestone Core Shading */}
            <linearGradient id="marbleStoneGrad" x1="15%" y1="5%" x2="75%" y2="95%">
              <stop offset="0%" stopColor="#4A4136" stopOpacity="0.85" />
              <stop offset="25%" stopColor="#5E5345" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#7E7262" stopOpacity="0.55" />
              <stop offset="80%" stopColor="#A89B88" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#D4C9B8" stopOpacity="0.0" />
            </linearGradient>

            {/* Soft Alabaster Highlight for chiseled marble contours */}
            <linearGradient id="alabasterHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#F5EFE3" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#DFD4C0" stopOpacity="0.0" />
            </linearGradient>

            {/* Subtle Antique Gold Patina on sculptured edges */}
            <linearGradient id="antiqueGoldVein" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#B39358" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#D8C59A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#967B46" stopOpacity="0.0" />
            </linearGradient>

            {/* Museum Bas-Relief Soft Diffusion Filter */}
            <filter id="marbleReliefDiffusion" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 0.95 0"
              />
            </filter>

            {/* Deeper Atmosphere Blur for subtle background veil */}
            <filter id="deepMarbleDiffusion" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="4.5" />
            </filter>
          </defs>

          {/* Layer 1: Ethereal diffuse shadow silhouette (gives marble sculptural depth) */}
          <g filter="url(#deepMarbleDiffusion)" opacity="0.35">
            {/* Monumental Sculptural Mass: Head, Wavy Hair, Torso & Draped Marble */}
            <path
              d="M180 80 C150 140 130 240 140 380 C150 500 120 620 80 820 C180 840 340 840 460 820 C420 680 390 540 370 420 C350 280 330 180 300 90 C260 80 210 75 180 80 Z"
              fill="url(#marbleStoneGrad)"
            />
          </g>

          {/* Layer 2: Masterfully Carved Classical Marble Sculpture Details */}
          <g filter="url(#marbleReliefDiffusion)">
            {/* --- SCULPTED MARBLE HAIR: Classical wavy chignon & cascading strands --- */}
            {/* Back chignon bun */}
            <path
              d="M205 130 C175 125 150 148 148 180 C146 215 168 245 198 250 C230 255 252 235 255 200 C258 160 238 135 205 130 Z"
              fill="url(#marbleStoneGrad)"
            />
            {/* Cascading wave 1 */}
            <path
              d="M175 220 C150 250 138 300 142 360 C146 410 162 455 154 505 C146 545 128 580 115 620 C130 590 152 545 158 495 C164 435 152 385 160 330 C165 295 180 260 188 235 Z"
              fill="url(#marbleStoneGrad)"
            />
            {/* Cascading wave 2 */}
            <path
              d="M200 245 C185 285 178 335 182 390 C185 435 198 475 195 520 C192 555 182 585 170 615 C182 585 198 545 202 505 C206 455 196 410 200 360 C204 320 215 280 220 255 Z"
              fill="url(#marbleStoneGrad)"
            />

            {/* Fine Carved Hair Locks on top of head */}
            <path
              d="M220 120 C240 105 270 98 305 105 C330 110 348 125 352 145 C330 135 305 132 278 135 C252 138 232 148 220 120 Z"
              fill="url(#marbleStoneGrad)"
            />
            <path
              d="M230 145 C255 135 285 130 320 135 C345 140 362 155 365 172 C342 162 318 158 290 160 C262 162 242 172 230 145 Z"
              fill="url(#marbleStoneGrad)"
            />

            {/* --- PROFILE: Serene Classical Greek Marble Face & Head --- */}
            {/* Forehead, noble straight Greek nose bridge, lips, chin, jawline */}
            <path
              d="M312 110 C338 118 360 135 368 160 C374 180 372 195 376 210 C380 225 394 235 396 248 C398 258 388 266 384 274 C380 282 386 290 384 298 C382 305 370 310 366 318 C360 330 362 344 352 355 C338 372 318 382 295 388 C265 395 240 380 230 350 C220 315 218 270 225 220 C230 180 245 145 275 125 C288 115 300 110 312 110 Z"
              fill="url(#marbleStoneGrad)"
            />

            {/* Sculpted Eye Contour (Classical serene closed/half-cast gaze) */}
            <path
              d="M335 205 C345 200 358 202 368 212 C356 214 346 212 335 205 Z"
              fill="url(#marbleStoneGrad)"
              opacity="0.8"
            />
            {/* Classical Sculpted Brow Arch */}
            <path
              d="M322 195 C338 188 358 190 372 202"
              stroke="url(#marbleStoneGrad)"
              strokeWidth="2.8"
              strokeLinecap="round"
            />

            {/* Delicate carved lip separation */}
            <path
              d="M372 278 C380 279 386 280 390 282"
              stroke="url(#marbleStoneGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* --- NECK & SCULPTED SHOULDER --- */}
            {/* Graceful statuesque neck column */}
            <path
              d="M265 375 C275 420 285 470 290 520 C270 525 245 520 230 500 C222 460 220 415 228 370 Z"
              fill="url(#marbleStoneGrad)"
            />

            {/* Arched Classical Marble Shoulder */}
            <path
              d="M290 510 C325 515 375 530 425 565 C455 585 480 615 500 655 C475 660 440 650 410 630 C365 600 325 570 285 550 Z"
              fill="url(#marbleStoneGrad)"
            />

            {/* --- DRAPED MARBLE CHITON: Deep carved marble folds & cascading fabric --- */}
            {/* Primary diagonal marble fold across chest */}
            <path
              d="M285 540 C320 575 365 620 410 680 C445 730 475 790 495 850 C465 850 425 810 390 755 C350 690 310 635 270 580 Z"
              fill="url(#marbleStoneGrad)"
            />
            {/* Secondary carved pleat 1 */}
            <path
              d="M245 550 C275 600 310 660 345 730 C375 790 400 845 415 850 C390 845 360 800 330 740 C298 675 265 615 235 565 Z"
              fill="url(#marbleStoneGrad)"
            />
            {/* Secondary carved pleat 2 */}
            <path
              d="M210 565 C235 620 265 690 290 765 C310 820 328 845 340 850 C322 845 300 810 278 755 C252 690 225 625 200 575 Z"
              fill="url(#marbleStoneGrad)"
            />
            {/* Leftward billowing marble drape */}
            <path
              d="M175 585 C190 645 208 720 222 795 C230 835 240 848 250 850 C238 845 224 815 210 760 C195 700 178 640 162 595 Z"
              fill="url(#marbleStoneGrad)"
            />
          </g>

          {/* Layer 3: Fine Carved Chisel Lines & Antique Gold / Alabaster Light Glints */}
          <g opacity="0.45">
            {/* Forehead to nose bridge fine marble edge */}
            <path
              d="M312 110 C338 118 360 135 368 160 C374 180 372 195 376 210 C380 225 394 235 396 248"
              stroke="url(#antiqueGoldVein)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Chin & Jaw contour line */}
            <path
              d="M384 298 C382 305 370 310 366 318 C360 330 362 344 352 355 C338 372 318 382 295 388"
              stroke="url(#antiqueGoldVein)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Shoulder arch lighting */}
            <path
              d="M290 510 C325 515 375 530 425 565 C455 585 480 615 500 655"
              stroke="url(#antiqueGoldVein)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            {/* Sculptured marble wave highlights in hair */}
            <path
              d="M230 145 C260 132 295 132 335 140"
              stroke="url(#alabasterHighlight)"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M245 170 C275 160 305 162 345 172"
              stroke="url(#alabasterHighlight)"
              strokeWidth="1.4"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
