import { Box } from "@mui/material"
import type { ReactNode } from "react"

interface TabPanelProps {
  children?: ReactNode
  index: number
  value: number
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`manual-tabpanel-${index}`}
      aria-labelledby={`manual-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export function a11yProps(index: number) {
  return {
    id: `manual-tab-${index}`,
    "aria-controls": `manual-tabpanel-${index}`,
  }
}
