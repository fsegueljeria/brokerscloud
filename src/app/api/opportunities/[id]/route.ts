import { NextResponse } from 'next/server'
import { opportunityService } from '@/libs/services/opportunity-service'
import type { OpportunityStage } from '@/types/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const opportunity = await opportunityService.getOpportunityById(params.id)
    if (!opportunity) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 })
    }
    return NextResponse.json(opportunity)
  } catch (error) {
    console.error('Error fetching opportunity:', error)
    return NextResponse.json({ error: 'Error fetching opportunity' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { stage } = await request.json()
    const opportunity = await opportunityService.updateOpportunity(
      Number(params.id),
      { stage: stage as OpportunityStage }
    )
    if (!opportunity) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 })
    }
    return NextResponse.json(opportunity)
  } catch (error) {
    console.error('Error updating opportunity:', error)
    return NextResponse.json({ error: 'Error updating opportunity' }, { status: 500 })
  }
} 