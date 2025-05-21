"use client"
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { Button } from "@mui/material"
import { PictureAsPdf as PdfIcon } from "@mui/icons-material"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { formatCurrency } from "@/libs/utils"
import type { Offer } from "@/types/types"
import {
  mockProperties,
  mockProspects,
  mockAgents,
  mockOpportunities,
  offerStageColors,
} from "@/libs/services/offer-service"

// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    borderBottomStyle: "solid",
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 50,
  },
  headerRight: {
    textAlign: "right",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  reference: {
    fontSize: 12,
    color: "#999999",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    backgroundColor: "#f5f5f5",
    padding: 5,
    color: "#333333",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: "#666666",
    marginBottom: 2,
  },
  value: {
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#999999",
    borderTopWidth: 1,
    borderTopColor: "#CCCCCC",
    borderTopStyle: "solid",
    paddingTop: 10,
  },
  chip: {
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    padding: "3px 8px",
    fontSize: 10,
    color: "#333333",
    display: "inline",
  },
  observations: {
    fontSize: 12,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5",
    fontWeight: "bold",
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    borderBottomStyle: "solid",
    flex: 1,
  },
})

// Componente para el documento PDF
const OfferPDF = ({ offer }: { offer: Offer }) => {
  const property = mockProperties[offer.propertyId as keyof typeof mockProperties]
  const prospect = mockProspects[offer.prospectId as keyof typeof mockProspects]
  const agent = mockAgents[offer.assignAgentId as keyof typeof mockAgents]
  const opportunity = mockOpportunities[offer.opportunityId as keyof typeof mockOpportunities]
  const stageInfo = offerStageColors[offer.stage as keyof typeof offerStageColors] || {
    label: offer.stage,
    color: "#424242",
    bg: "#f5f5f5",
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd 'de' MMMM 'de' yyyy", { locale: es })
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>OFERTA INMOBILIARIA</Text>
            <Text style={styles.subtitle}>{offer.title}</Text>
            <Text style={styles.reference}>Ref: {offer.reference}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={{ ...styles.chip, backgroundColor: stageInfo.bg, color: stageInfo.color }}>
              {stageInfo.label}
            </Text>
            <Text style={{ fontSize: 10, marginTop: 5 }}>Fecha: {formatDate(offer.createdAt)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la Oferta</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Monto Ofertado</Text>
              <Text style={styles.value}>{formatCurrency(offer.amount, offer.currency)}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Comisión</Text>
              <Text style={styles.value}>
                {offer.commission}% ({formatCurrency(offer.amountCommission, offer.currencyCommission)})
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Fecha de Expiración</Text>
              <Text style={styles.value}>{formatDate(offer.expirationDate)}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Incluye Canje</Text>
              <Text style={styles.value}>{offer.swap ? "Sí" : "No"}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Propiedad</Text>
          {property ? (
            <>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Nombre</Text>
                  <Text style={styles.value}>{property.name}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Tipo</Text>
                  <Text style={styles.value}>{property.type}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Dirección</Text>
                  <Text style={styles.value}>{property.address}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Ciudad</Text>
                  <Text style={styles.value}>{property.city}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Precio Listado</Text>
                  <Text style={styles.value}>{formatCurrency(property.price, property.curCode)}</Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.value}>Información de propiedad no disponible</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cliente</Text>
          {prospect ? (
            <>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Nombre</Text>
                  <Text style={styles.value}>
                    {prospect.firstName} {prospect.lastName}
                  </Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Tipo</Text>
                  <Text style={styles.value}>{prospect.type}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{prospect.email}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Teléfono</Text>
                  <Text style={styles.value}>{prospect.phone || "No disponible"}</Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.value}>Información de cliente no disponible</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agente Asignado</Text>
          {agent ? (
            <>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Nombre</Text>
                  <Text style={styles.value}>
                    {agent.firstName} {agent.lastName}
                  </Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Rol</Text>
                  <Text style={styles.value}>{agent.role}</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>Email</Text>
                  <Text style={styles.value}>{agent.email}</Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>Teléfono</Text>
                  <Text style={styles.value}>{agent.phone}</Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.value}>Información de agente no disponible</Text>
          )}
        </View>

        {offer.observation && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Observaciones</Text>
            <Text style={styles.observations}>{offer.observation}</Text>
          </View>
        )}

        <View style={styles.footer}>
          <Text>Documento generado el {format(new Date(), "dd/MM/yyyy HH:mm", { locale: es })}</Text>
          <Text>Este documento es informativo y no constituye un contrato legal.</Text>
        </View>
      </Page>
    </Document>
  )
}

export default OfferPDF

interface OfferPDFGeneratorProps {
  offer: Offer
  buttonLabel?: string
  buttonVariant?: "text" | "outlined" | "contained"
  buttonColor?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
  fullWidth?: boolean
  showIcon?: boolean
}

export const OfferPDFGenerator = ({
  offer,
  buttonLabel = "Generar PDF",
  buttonVariant = "contained",
  buttonColor = "primary",
  fullWidth = false,
  showIcon = true,
}: OfferPDFGeneratorProps) => {
  const fileName = `oferta_${offer.reference.replace(/\//g, "-")}.pdf`

  return (
    <PDFDownloadLink document={<OfferPDF offer={offer} />} fileName={fileName} style={{ textDecoration: "none" }}>
      {({ loading }) => (
        <Button
          variant={buttonVariant}
          color={buttonColor}
          disabled={loading}
          fullWidth={fullWidth}
          startIcon={showIcon ? <PdfIcon /> : undefined}
        >
          {loading ? "Generando documento..." : buttonLabel}
        </Button>
      )}
    </PDFDownloadLink>
  )
}
