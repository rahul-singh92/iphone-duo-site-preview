# iPhone Duo Site Preview

A simple Next.js tool for previewing websites on the iPhone Duo closed and open displays.

## Setup

1. Install Node.js 18+.
2. Open a terminal in this project directory.
3. Run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000

## Notes

- Closed display uses Apple's published 1398 x 2034 display resolution.
- Open display uses Apple's published 1878 x 2670 inner display resolution.
- The web viewport is simulated at 3x (466 x 678 CSS px closed, 626 x 890 CSS px open) so responsive layouts are tested against a fixed logical viewport while the simulator scales visually. This logical viewport is a simulator assumption until Apple publishes web-specific viewport dimensions.
- The preview uses an iframe, so websites that send `X-Frame-Options` or restrictive CSP `frame-ancestors` headers may refuse to load.
