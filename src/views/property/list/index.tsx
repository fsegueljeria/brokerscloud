// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import PropertyListTable from './PropertyListTable'
import PropertyCard from './PropertyCard'
import { getProperties } from '@/app/server/property/propertyActions'

// import { getPropertiListData } from '@/app/server/actions'

const PropertyListPage = async () => {
  
  const initialData = await getProperties({ page: 0, size: 10, sort: 'id' })

  // const initialData = await getPropertiListData()
  
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <PropertyCard />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <PropertyListTable initialData={initialData} /> 
      </Grid>
    </Grid>
  )
}

export default PropertyListPage
