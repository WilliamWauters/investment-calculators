import React, { useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { RealEstateFormState } from "@/contexts/RealEstateFormContext";
import router from "next/router";
import { getLabelByLocation } from "@/utils/enums/Location";
import { NumericFormat } from "react-number-format";
import formatMoney from "@/utils/formatMoney";
import GroupIcon from "@mui/icons-material/Group";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonIcon from "@mui/icons-material/Person";

interface SimulationListProp {
  data: RealEstateFormState[];
}

const defaultProps: SimulationListProp = {
  data: [],
};

const sortArrayByPriceDesc = (array: any) => {
  return [...array].sort((a, b) => b.housePrice.value - a.housePrice.value);
};

export default function SimulationList(props: SimulationListProp) {
  return (
    <>
      <Grid container columns={{ xs: 6, sm: 6, md: 12 }}>
        {sortArrayByPriceDesc(props.data).map((x) => (
          <Grid
            item
            xs={6}
            md={6}
            key={x.id}
            onClick={() => {
              router.push("./SimulationForm?id=" + x.id);
            }}
          >
            <Box
              sx={{
                border: 1,
                borderRadius: "5px",
                borderColor: "#1E293B",
                py: 1,
                px: 2,
                mx: 1,
                my: 1,
                "&:hover": {
                  borderColor: "primary.main",
                  cursor: "pointer",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 1,
                }}
              >
                <Box
                  sx={{
                    color: "white",
                  }}
                >
                  {getLabelByLocation(x.houseLocation.value)}
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#f44336",
                      fontSize: "0.85rem",
                    }}
                  >
                    + {`${formatMoney(x.notaryFees.total)}`}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 1,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#38BDF8",
                      fontSize: "0.85rem",
                    }}
                  >
                    {`${formatMoney(x.housePrice.value)}`}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "green",
                      fontSize: "0.85rem",
                    }}
                  >
                    - {`${formatMoney(x.initialContribution.value)}`}
                  </Typography>
                </Box>
              </Box>
              <br />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 1,
                }}
              >
                <Box>
                  {x.borrowers.length == 1 && (
                    <PersonIcon
                      sx={{
                        color: "white",
                      }}
                      fontSize="small"
                    />
                  )}
                  {x.borrowers.length > 1 && (
                    <GroupIcon
                      sx={{
                        color: "white",
                      }}
                      fontSize="small"
                    />
                  )}
                </Box>
                <Box>
                  <AccountBalanceIcon
                    sx={{
                      color: "white",
                    }}
                    fontSize="small"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 1,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#38BDF8",
                      fontSize: "0.85rem",
                    }}
                  >
                    {`${formatMoney(x.monthlyIncomeTotal)}`}{" "}
                    <span
                      style={{
                        fontSize: "0.65rem",
                      }}
                    >
                      monthly
                    </span>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#38BDF8",
                      fontSize: "0.85rem",
                    }}
                  >
                    {`${x.creditInterestRate.value} %`}{" "}
                    <span
                      style={{
                        fontSize: "0.65rem",
                      }}
                    >
                      for
                    </span>{" "}
                    {`${x.creditDuration.value}`}{" "}
                    <span
                      style={{
                        fontSize: "0.65rem",
                      }}
                    >
                      year
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 1,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#38BDF8",
                      fontSize: "0.85rem",
                    }}
                  >
                    {`${formatMoney(x.monthlyPaymentCapacity)}`}{" "}
                    <span
                      style={{
                        fontSize: "0.65rem",
                      }}
                    >
                      monthly
                    </span>
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#38BDF8",
                      fontSize: "0.85rem",
                    }}
                  >
                    {`${formatMoney(x.loanMonthlyPayment)}`}{" "}
                    <span
                      style={{
                        fontSize: "0.65rem",
                      }}
                    >
                      monthly
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  borderRadius: 1,
                }}
              >
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#38BDF8",
                      fontSize: "0.85rem",
                    }}
                  ></Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#38BDF8",
                      fontSize: "1rem",
                    }}
                  >
                    {`${formatMoney(x.loan)}`}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
