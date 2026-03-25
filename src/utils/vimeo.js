/** Cache de thumbnails HD desde oEmbed de Vimeo (sin API key). */
const thumbCache = new Map();

/**
 * @param {string} vimeoId
 * @returns {Promise<string|null>}
 */
export async function fetchVimeoThumbnail(vimeoId) {
  if (!vimeoId) return null;
  if (thumbCache.has(vimeoId)) return thumbCache.get(vimeoId);

  try {
    const pageUrl = encodeURIComponent(`https://vimeo.com/${vimeoId}`);
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${pageUrl}&width=1920&height=1080`
    );
    if (!res.ok) throw new Error(String(res.status));
    const data = await res.json();
    let url = data.thumbnail_url || null;
    // Vimeo CDN allows swapping the _WxH suffix for any resolution
    if (url) url = url.replace(/_\d+x\d+(\.\w+)$/, '_1920x1080$1');
    thumbCache.set(vimeoId, url);
    return url;
  } catch {
    return null;
  }
}

/** URL del player para preview en hover (muted, loop, sin UI). */
export function vimeoPreviewSrc(vimeoId) {
  if (!vimeoId) return '';
  const q = new URLSearchParams({
    autoplay: '1',
    muted: '1',
    loop: '1',
    background: '1',
    byline: '0',
    title: '0',
    portrait: '0',
    badge: '0',
  });
  return `https://player.vimeo.com/video/${vimeoId}?${q.toString()}`;
}

/**
 * Reproductor en modal (casi fullscreen): sin barra de Vimeo, sin título/byline.
 * El logo puede seguir apareciendo en cuentas gratuitas (límite de Vimeo).
 */
export function vimeoModalPlayerSrc(vimeoId) {
  if (!vimeoId) return '';
  const q = new URLSearchParams({
    autoplay: '1',
    muted: '0',
    controls: '1',
    title: '0',
    byline: '0',
    portrait: '0',
    badge: '0',
    pip: '0',
    keyboard: '1',
    dnt: '1',
    transparent: '0',
    app_id: '58479',
  });
  return `https://player.vimeo.com/video/${vimeoId}?${q.toString()}`;
}
