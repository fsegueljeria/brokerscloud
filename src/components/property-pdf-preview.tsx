"use client"

import React from "react"
import { PDFViewer } from "@react-pdf/renderer"
import type { Property } from "@/types/types"
import { PropertyPDFGenerator } from "./property-pdf-generator"

interface PropertyPDFPreviewProps {
  property: Property
}

export function PropertyPDFPreview({ property }: PropertyPDFPreviewProps) {
  return (
    <PDFViewer width="100%" height="600px" style={{ border: "none" }}>
      <PropertyPDFGenerator property={property} />
    </PDFViewer>
  )
} 