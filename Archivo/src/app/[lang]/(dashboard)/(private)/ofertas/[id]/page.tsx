import { OfferDetail } from "@/components/offer-detail"

export default function OfferDetailPage({ params }: { params: { id: string } }) {
  return <OfferDetail offerId={params.id} />
}
