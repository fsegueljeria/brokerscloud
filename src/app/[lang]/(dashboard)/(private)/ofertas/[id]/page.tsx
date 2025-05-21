import { OfferDetail } from "@/components/offer-detail"

export type paramsType = Promise<{ id: string }>;

export default async function OfferDetailPage(props: { params: paramsType }) {
  const { id } = await props.params;

  
return (
    <main>
      <OfferDetail offerId={id} />
    </main>
  )
}
