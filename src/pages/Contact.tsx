
import styled from '@emotion/styled'
import { Grid, TextField } from '@mui/material'
import { Box, height } from '@mui/system'
import React from 'react'

const sx = {
  border: "2px solid black",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems:"center",
  // width:"50%"


}

const FormField = styled(TextField)(({theme}) => ({
  width:"25rem",
  // padding:20
  padding:0,
  marginTop:2,
  marginRight:2,
  
}))

const GridStyle = {
  width:"50%",
  // border:"2px solid grey",
  // padding:20
  // height:"30rem"


}

function Contact() {
  return (
    <Box sx={sx}>
      <Grid sx={GridStyle} container spacing={2}>

        <Grid item xs={12} spacing={3} >
        <FormField label="First Name" variant='filled'/>
        <FormField label="Second Name" variant='filled'/>
        </Grid>
        <Grid item xs={12}>
        <FormField label="Email" variant='filled'/>
        <FormField label="Phone Number" variant='filled'/>
        </Grid>
        <Grid item xs={12}>
        <FormField label="Email" variant='filled'/>
        <FormField label="Occupation" variant='filled'/>
        </Grid>
        <Grid item xs={12}>
        <FormField style={{width:"50rem"}} label="Country" variant='filled'/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Contact