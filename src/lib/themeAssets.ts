export function getThemeAssetUrls(baseUrl: string) {
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return [
    `${normalizedBaseUrl}image.jpg`,
    `${normalizedBaseUrl}industrial-warehouse.jpg`,
    `${normalizedBaseUrl}psytrance-stage.jpg`,
    `${normalizedBaseUrl}best-psytrance-festivals.jpg`,
    `${normalizedBaseUrl}detroit-underground.jpg`,
    `${normalizedBaseUrl}15-hidden-techno-clubs-in-los-angeles-that-locals-love.webp`,
  ];
}

