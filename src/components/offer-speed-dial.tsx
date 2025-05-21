"use client"

import type React from "react"

import { SpeedDial, SpeedDialAction, Box, Typography } from "@mui/material"
import type { SxProps, Theme } from "@mui/material"

// Definir la interfaz para las acciones
export interface SpeedDialActionItem {
  icon: React.ReactNode
  name: string
  onClick?: () => void
  color?: string
  bgColor?: string
}

interface OfferSpeedDialProps {
  actions: SpeedDialActionItem[]
  icon: React.ReactNode
  visible: boolean
  onlyIcon: boolean
  position?: {
    top?: number | string
    right?: number | string
    bottom?: number | string
    left?: number | string
  }
  fabColor?: string
  fabHoverColor?: string
  direction?: "up" | "down" | "left" | "right"
}

export function OfferSpeedDial({
  actions,
  icon,
  visible,
  onlyIcon,
  fabColor = "primary.main",
  fabHoverColor = "primary.dark",
  direction = "down",
}: OfferSpeedDialProps) {
  // Estilos para el SpeedDial
  const speedDialStyles: SxProps<Theme> = {
    alignItems: "flex-end",
    position: "absolute",
    right: "16px" ,
    top: "2px",
    "& .MuiSpeedDial-actions": {
      paddingTop: 8, // Aumentado de 2 a 4 para dar más espacio
      flexDirection: "column",
      alignItems: "flex-end", // Centra los actions
    },
    "& .MuiSpeedDialAction-staticTooltip:first-of-type": {
      marginTop: 8, // Añadir margen superior al primer elemento
    },
  }

  // Estilos comunes para los SpeedDialActions
  const actionStyles = {
    px: 2,
    borderRadius: "24px",
    width: "auto",
    height: "auto",
    minHeight: "40px",
    justifyContent: "flex-end", // Centra el contenido
  }

  if (!visible) return null

  return (
    <SpeedDial
      ariaLabel="Acciones de oferta"
      sx={speedDialStyles}
      icon={icon}
      FabProps={{
        sx: {
          bgcolor: fabColor,
          "&:hover": {
            bgcolor: fabHoverColor,
          },
        },
      }}
      direction={direction}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
              {action.icon}
              { onlyIcon ? <Typography variant="body2" sx={{ whiteSpace: "nowrap" }}>
                {action.name}
              </Typography> : null }
            </Box>
          }
          onClick={action.onClick}
          tooltipTitle={action.name}
          FabProps={{
            sx: {
              bgcolor: action.bgColor,
              color: action.color,
              "&:hover": {
                bgcolor: action.bgColor ? `${action.bgColor}dd` : undefined,
              },
              ...actionStyles,
            },
          }}
        />
      ))}
    </SpeedDial>
  )
}
