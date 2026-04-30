import profile from '../../../data/profile.json';
import { createCVPdfBuffer } from '../../../lib/generateCV.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const toSafeAsciiFileName = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '_');

export async function GET() {
  try {
    const pdfBuffer = await createCVPdfBuffer(profile);
    const fileName = `CV_${toSafeAsciiFileName(profile.personal.name)}.pdf`;

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('CV API generation error:', error);
    return Response.json(
      {
        error: 'Failed to generate CV PDF',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
