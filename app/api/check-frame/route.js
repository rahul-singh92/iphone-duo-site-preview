// app/api/check-frame/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ canEmbed: false }, { status: 400 });
  }

  try {
    // Fetch only the headers to be fast
    const response = await fetch(url, { method: 'HEAD' });
    
    const xFrameOptions = response.headers.get('x-frame-options');
    const csp = response.headers.get('content-security-policy');

    let canEmbed = true;

    // Check for X-Frame-Options blocking
    if (xFrameOptions) {
      const xfo = xFrameOptions.toUpperCase();
      if (xfo === 'DENY' || xfo === 'SAMEORIGIN') {
        canEmbed = false;
      }
    }

    // Check for Content-Security-Policy blocking
    if (csp && csp.toLowerCase().includes('frame-ancestors')) {
      canEmbed = false;
    }

    return NextResponse.json({ canEmbed });
  } catch (error) {
    // If the fetch fails completely (e.g., bad DNS), assume we can't embed it
    return NextResponse.json({ canEmbed: false });
  }
}