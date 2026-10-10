# Yessine Choura — Portfolio

English portfolio based on the visual design requested from https://portfolio-dali.vercel.app: purple background, red accents, animated particle network, circular projects button and icon navigation. Professional content comes from Yessine's current CV.

Pages: Home, About, Services, Work, Experience and Contact. The About page has keyboard-accessible tabs; Work has project pagination. Contact opens an email draft and does not submit to a backend.

## Hosting
Static HTML, CSS and JavaScript. Vercel uses `vercel.json` rewrites for direct page URLs. No database or secrets are needed. Reduced-motion preferences disable animation.

Decorative reference assets are under `assets/reference/`; project screenshots and Yessine's photograph are under `assets/images/`. The original academic pages remain under `htmls/`.

## Reference motion
The home page uses a vendored tsParticles Slim 2.12.0 bundle (MIT license included), with the particle settings observed in the supplied Dali reference. Page changes use horizontal purple layers with 0.2/0.4/0.6-second delays. Text reveals use the reference's 80-pixel offsets and 1.4-second easing. Reduced-motion preferences disable movement. The current portrait is a color head-and-torso cutout displayed down to the elbows; CV download links are absent.
