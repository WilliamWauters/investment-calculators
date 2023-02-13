import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

type PagePrpops = {
  children: any;
};

const Page = ({ children }: PagePrpops) => {
  return (
    <>
      <Box
        sx={{
          display: "grid",
        }}
      >
        <Box sx={{ height: "9vh" }}></Box>
        {children}
      </Box>
    </>
  );
};

export default Page;
