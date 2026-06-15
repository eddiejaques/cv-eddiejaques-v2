import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://eddiejaques.me';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.png`;

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  jsonLd?: object;
}

export default function SEO({ title, description, path, image = DEFAULT_IMAGE, jsonLd }: SEOProps) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | Gaurav Kumar Dani — Director of Data & AI Products`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
