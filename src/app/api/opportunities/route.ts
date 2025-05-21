import { NextResponse } from 'next/server'
import { opportunityService } from '@/libs/services/opportunity-service'

export async function GET() {
  try {
    const opportunities = await opportunityService.getOpportunities()
    return NextResponse.json(opportunities)
  } catch (error) {
    console.error('Error fetching opportunities:', error)
    return NextResponse.json({ error: 'Error fetching opportunities' }, { status: 500 })
  }
} 