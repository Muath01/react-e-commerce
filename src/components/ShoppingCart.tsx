import { useState } from "react";
import {
  Drawer,
  Box,
  Typography,
  Button,
  CardHeader,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  changePrice,
  decrementItem,
  incrementItem,
  removeFromCart,
  setDrawer,
} from "../Redux/drawer";
import styled from "@emotion/styled";

const IncreaseAndReduceWrapper = styled(CardContent)(({ theme }) => ({
  display: "flex",
  gap: 10,
  justifyContent: "center",
}));

const closeButton = {
  width: "10%",
  height: "100%",
  borderRadius: 0,
  padding: 0,
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: "red",

  "&:hover": {
    backgroundColor: "darkRed",
  },
};

function ShoppingCart(): React.ReactElement {
  //States
  const [productCount, setProductCount] = useState(1);
  const [productName, setProductName] = useState("");

  //Selectors
  const { isOpen } = useSelector((state: any) => state.drawer);
  const { shoppingCartItems } = useSelector((state: any) => state.drawer);

  // variables
  const [isDrawOpen] = useState<boolean>(isOpen);

  //dispatch function
  const dispatch = useDispatch();

  //Functions

  // Calculate the total of the shopping cart and display it
  let total: number = 0;
  function calculateCartTotal(): number {
    Object.keys(shoppingCartItems).map((item) => {
      console.log(item);
      total += Math.round(shoppingCartItems[item]["price"] * 100) / 100;

      total = parseFloat(total.toFixed(2));
    });
    return total;
  }

  function adjustCount(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    productName: string
  ) {
    let value = e.currentTarget.innerText;
    let quantity = shoppingCartItems[productName].quantity;
    let price =
      shoppingCartItems[productName].price /
      shoppingCartItems[productName].quantity;

    if (value == "+") {
      dispatch(incrementItem(productName));
    } else if (shoppingCartItems[productName].quantity > 1) {
      dispatch(decrementItem(productName));
    } else {
      dispatch(removeFromCart(productName));
    }

    if (quantity >= 1) dispatch(changePrice({ productName, quantity, price }));
  }

  return (
    <>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => dispatch(setDrawer(false))}
      >
        <Box p={2} width="350px" textAlign="center" role="presentation">
          <Card
            sx={{
              backgroundColor: "white",
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
            }}
          >
            <Typography variant="h6" component="div">
              Shopping Cart
            </Typography>
            <Typography variant="h6" component="div">
              Total: {calculateCartTotal()}
            </Typography>

            <Button
              variant="contained"
              sx={closeButton}
              onClick={() => dispatch(setDrawer(false))}
            >
              X
            </Button>
          </Card>

          {Object.keys(shoppingCartItems).map((item: string) => (
            <Card key={item}>
              <div>
                <CardHeader
                  sx={{ textAlign: "center" }}
                  title={
                    Object.keys(shoppingCartItems).length != 0
                      ? `£${shoppingCartItems[item].price} ${item}`
                      : `£${item} ${item}`
                  }
                />

                <CardMedia
                  component="img"
                  height="300"
                  image={require(`../images/${item}.png`)}
                  alt={`an image of ${item}`}
                />
              </div>

              <IncreaseAndReduceWrapper>
                <Button
                  onClick={(e) => adjustCount(e, item)}
                  variant="contained"
                >
                  +
                </Button>
                <Typography sx={{ marginTop: "5px" }}>
                  {shoppingCartItems[item].quantity}
                </Typography>
                <Button
                  onClick={(e) => adjustCount(e, item)}
                  variant="contained"
                >
                  -
                </Button>
              </IncreaseAndReduceWrapper>
            </Card>
          ))}
        </Box>
      </Drawer>
    </>
  );
}

export default ShoppingCart;
