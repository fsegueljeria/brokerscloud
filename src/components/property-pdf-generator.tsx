"use client"

import React from "react"
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"
import type { Property } from "@/types/types"
import { formatCurrency } from "@/libs/utils"

// Mapeo de estados a texto en español
const propertyStateLabels = {
  AVAILABLE: "Disponible",
  RESERVED: "Reservada",
  SOLD: "Vendida",
  RENTED: "Alquilada",
  UNAVAILABLE: "No Disponible",
  UNDER_CONSTRUCTION: "En Construcción",
  DRAFT: "Borrador",
  PUBLISHED: "Publicada",
}

// Mapeo de tipos a texto en español
const propertyTypeLabels = {
  HOUSE: "Casa",
  APARTMENT: "Apartamento",
  COMMERCIAL: "Local Comercial",
  LAND: "Terreno",
  OFFICE: "Oficina",
  GARAGE: "Garaje",
  STORAGE: "Bodega",
  OTHER: "Otro",
}

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 20,
    borderBottom: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: "#1a237e",
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    color: "#1a237e",
    borderBottom: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: "40%",
    fontSize: 12,
    color: "#666666",
  },
  value: {
    width: "60%",
    fontSize: 12,
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  feature: {
    width: "33%",
    fontSize: 10,
    marginBottom: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#666666",
  },
  description: {
    fontSize: 11,
    lineHeight: 1.5,
    marginTop: 5,
    textAlign: "justify",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  gridItem: {
    width: "50%",
    marginBottom: 5,
  },
})

interface PropertyPDFGeneratorProps {
  property: Property
}

export function PropertyPDFGenerator({ property }: PropertyPDFGeneratorProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.title}>{property.title}</Text>
          <Text style={styles.subtitle}>
            {propertyTypeLabels[property.type]} - {propertyStateLabels[property.status]}
          </Text>
        </View>

        {/* Información básica */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Básica</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Código de Referencia:</Text>
            <Text style={styles.value}>{property.code || "No especificado"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Precio:</Text>
            <Text style={styles.value}>
              {formatCurrency(property.price, property.currency)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{propertyStateLabels[property.status]}</Text>
          </View>
        </View>

        {/* Características principales */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Características Principales</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Área Total:</Text>
              <Text style={styles.value}>{property.area} m²</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Dormitorios:</Text>
              <Text style={styles.value}>{property.bedrooms}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Baños:</Text>
              <Text style={styles.value}>{property.bathrooms}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Año de Construcción:</Text>
              <Text style={styles.value}>{property.yearBuilt || "No especificado"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Área Construida:</Text>
              <Text style={styles.value}>{property.m2Built ? `${property.m2Built} m²` : "No especificado"}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.label}>Área Semi Cubierta:</Text>
              <Text style={styles.value}>{property.m2SemiCovered ? `${property.m2SemiCovered} m²` : "No especificado"}</Text>
            </View>
          </View>
        </View>

        {/* Ubicación */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ubicación</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Dirección:</Text>
            <Text style={styles.value}>{property.address}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ciudad:</Text>
            <Text style={styles.value}>{property.city}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Provincia:</Text>
            <Text style={styles.value}>{property.province}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>País:</Text>
            <Text style={styles.value}>{property.country}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Código Postal:</Text>
            <Text style={styles.value}>{property.zipCode || "No especificado"}</Text>
          </View>
        </View>

        {/* Características adicionales */}
        {property.features && property.features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Características Adicionales</Text>
            <View style={styles.features}>
              {property.features.map((feature, index) => (
                <Text key={index} style={styles.feature}>
                  • {feature}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Descripción */}
        {property.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={styles.description}>{property.description}</Text>
          </View>
        )}

        {/* Pie de página */}
        <Text style={styles.footer}>
          Documento generado el {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  )
} 