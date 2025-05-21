import Image from "next/image"
import { Card, CardContent, Typography, Box, Alert } from "@mui/material"
import { ImageOff } from "lucide-react"

interface ManualImageProps {
  src: string
  alt: string
  description: string
  width?: number
  height?: number
}

export function ManualImage({ src, alt, description, width = 800, height = 450 }: ManualImageProps) {
  // Verificar si la imagen existe o usar un placeholder
  const imageExists = src && (src.startsWith("http") || src.startsWith("/"))

  return (
    <Card variant="outlined" sx={{ my: 3, maxWidth: "100%" }}>
      <CardContent sx={{ p: 2 }}>
        {!imageExists ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            La imagen "{alt}" será añadida próximamente.
          </Alert>
        ) : null}

        <Box sx={{ position: "relative", width: "100%", height: "auto", minHeight: "300px" }}>
          {!imageExists ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "300px",
                bgcolor: "grey.100",
                borderRadius: "4px",
              }}
            >
              <ImageOff size={48} color="#9e9e9e" />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {alt}
              </Typography>
            </Box>
          ) : (
            <Image
              src={src || "/placeholder.svg"}
              alt={alt}
              layout="responsive"
              width={width}
              height={height}
              style={{
                borderRadius: "4px",
                objectFit: "contain",
              }}
              onError={(e) => {
                // Fallback para imágenes que no se pueden cargar
                const target = e.target as HTMLImageElement
                target.style.display = "none"
                const parent = target.parentElement
                if (parent) {
                  const fallback = document.createElement("div")
                  fallback.style.display = "flex"
                  fallback.style.flexDirection = "column"
                  fallback.style.alignItems = "center"
                  fallback.style.justifyContent = "center"
                  fallback.style.height = "300px"
                  fallback.style.backgroundColor = "#f5f5f5"
                  fallback.style.borderRadius = "4px"

                  const icon = document.createElement("div")
                  icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="2" x2="22" y2="22"></line><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"></path><line x1="13.5" y1="13.5" x2="6" y2="21"></line><path d="M13.5 13.5L21 6"></path><path d="M21 21v-7.5"></path><path d="M3 3h7.5"></path></svg>`

                  const text = document.createElement("p")
                  text.textContent = alt
                  text.style.marginTop = "16px"
                  text.style.color = "#757575"
                  text.style.fontSize = "14px"

                  fallback.appendChild(icon)
                  fallback.appendChild(text)
                  parent.appendChild(fallback)
                }
              }}
            />
          )}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: "italic" }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}
