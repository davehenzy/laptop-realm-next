import ProductDetailContent from '../../../components/ProductDetailContent';
import { LATEST_ARRIVALS, NEW_YEAR_SPECIALS, APPLE_STORE } from '../../../constants';

export async function generateStaticParams() {
  const allProducts = [...LATEST_ARRIVALS, ...NEW_YEAR_SPECIALS, ...APPLE_STORE];
  
  return allProducts.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  return <ProductDetailContent slug={decodedSlug} />;
}
