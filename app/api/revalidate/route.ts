import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/* ============================================
   ALBANOTTE — Shopify Webhook → On-Demand ISR
   
   When a product or collection is updated in Shopify Admin,
   this webhook triggers instant revalidation of cached pages.
   
   Setup: Shopify Admin → Settings → Notifications → Webhooks
   Add webhook pointing to: https://albanotte.com/api/revalidate
   ============================================ */

export async function POST(req: NextRequest) {
  try {
    // Verify webhook secret (optional but recommended)
    const secret = req.headers.get('x-shopify-hmac-sha256');
    // TODO: Implement HMAC verification with SHOPIFY_WEBHOOK_SECRET

    const body = await req.json();
    const topic = req.headers.get('x-shopify-topic');

    // Revalidate based on the webhook topic
    switch (topic) {
      case 'products/update':
      case 'products/create':
      case 'products/delete': {
        const handle = body.handle;
        if (handle) {
          revalidateTag(`product-${handle}`);
        }
        // Also revalidate any collection this product might be in
        revalidateTag('collection-drop001');
        revalidateTag('collection-streetwear');
        revalidateTag('collection-biscotti');
        break;
      }

      case 'collections/update':
      case 'collections/create': {
        const handle = body.handle;
        if (handle) {
          revalidateTag(`collection-${handle}`);
        }
        break;
      }

      default:
        // Revalidate everything as a fallback
        revalidateTag('collection-drop001');
        revalidateTag('collection-streetwear');
        revalidateTag('collection-biscotti');
    }

    return NextResponse.json({ revalidated: true, topic });
  } catch (err) {
    console.error('Revalidation webhook error:', err);
    return NextResponse.json(
      { revalidated: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
}
