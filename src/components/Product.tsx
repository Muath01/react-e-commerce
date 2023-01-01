import React from 'react'
import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography} from "@mui/material"
import {Home} from "@mui/icons-material"


type ProductProp = {
    
    productName: string
}

const  Product = ({productName} : ProductProp) => {

  return (
    <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title={productName}
      />
      <CardMedia
        component="img"
        height="250"
        image={`../images/${productName}.png`}
        alt={`an image of ${productName}`}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Testing 123, Testing 123...
        </Typography>
      </CardContent>
     
    
    </Card>
    </div>
  )
}

export default Product