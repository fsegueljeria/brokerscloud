'use server'

import { isAxiosError } from 'axios'

import axiosInstance from '@/libs/axios'
import type { PropertyType } from '@/types/apps/propertyTypes'

// import { getPropertiListData } from '@/app/server/actions'

type GetPropertiesParams = {
  page?: number
  size?: number
  sort?: string
  filters?: Record<string, any>
}

export const getProperties = async ({ page = 0, size = 20, sort = 'id', filters = {} }: GetPropertiesParams = {}) => {
  try {    
    const properties = await axiosInstance({ 
      url: `${process.env.API_URL}/properties`, 
      method: 'GET',
      params: { page, size, sort, ...filters } })      

    const countProp = await axiosInstance({ 
      url: `${process.env.API_URL}/properties/count`, 
      method: 'GET',
      params: { page, size, sort, ...filters } })      

      return {
        content : properties.data,
        totalElements: countProp.data
      }
    
    // const data = await getPropertiListData()
    // return data

  } catch (error) {
    console.error('exception', error)

    if (isAxiosError(error)) {
      console.error('Server error: ', error.response?.data)
      throw new Error(error.response?.data || 'Error desconocido')
    }

    console.error(error)
    console.error(JSON.stringify(error, null, 2))
    throw new Error('Error al obtener catastros desde action')
  }
}

export const deleteProperty = async (selectedId : number) => {
  try {
    const response = await axiosInstance({ url: `${process.env.API_URL}/properties/${selectedId}`, method: 'DELETE' })

    
return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Server error: ', error.response?.data)
      throw new Error(error.response?.data || 'Error desconocido')
    }

    console.error(error)
    console.error(JSON.stringify(error, null, 2))
    throw new Error('Error al obtener catastros desde action')
  }
}

export const getAttachByProperty = async (selectedId : number) => {
  try {    
    const response = await axiosInstance({ url: `${process.env.API_URL}/property-attachments?propertyId.equals=${selectedId}`, method: 'GET' })
    
    
return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Server error: ', error.response?.data)
      throw new Error(error.response?.data || 'Error desconocido')
    }

    console.error(error)
    console.error(JSON.stringify(error, null, 2))
    throw new Error('Error al obtener catastros desde action')
  }
}


export const createProperty = async (data : PropertyType) => {
  try {
    const response = await axiosInstance({ url: `${process.env.API_URL}/properties`, method: 'POST' })

    
return response.data
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Server error: ', error.response?.data)
      throw new Error(error.response?.data || 'Error desconocido')
    }

    console.error(error)
    console.error(JSON.stringify(error, null, 2))
    throw new Error('Error al obtener catastros desde action')
  }
}
