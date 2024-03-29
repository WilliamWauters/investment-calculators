import Head from "next/head";
import Page from "@/components/layout/Page";
import Header from "@/components/content/Header";
import { useRouter } from "next/router";
import { Box, Button } from "@mui/material";
import HouseIcon from "@mui/icons-material/House";
import PaidIcon from "@mui/icons-material/Paid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Investment Calculators</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Page>
          <Header text="Investment Calculators" />
          <Button
            sx={{
              border: 1,
              py: 4,
            }}
            onClick={() => {
              router.push("/RealEstate/SimulationList");
            }}
          >
            <HouseIcon sx={{ mr: 2 }} />
            Real Estate
          </Button>
          <Box sx={{ my: 1 }} />
          <Button
            disabled={true}
            sx={{
              border: 1,
              py: 4,
            }}
            onClick={() => {
              router.push("/calculators/PaymentInterval");
            }}
          >
            <CalendarMonthIcon sx={{ mr: 2 }} />
            Payment Interval
          </Button>
          <Box sx={{ my: 1 }} />
          <Button
            disabled={true}
            sx={{
              border: 1,
              py: 4,
            }}
            onClick={() => {
              router.push("/calculators/ExpectedReturns");
            }}
          >
            <PaidIcon sx={{ mr: 2 }} />
            Expected Returns
          </Button>
        </Page>
      </main>
    </>
  );
}
