import { Suspense } from 'react';
import ShopContent from '../../components/ShopContent';

export default function Shop() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
