import { Card, CircularProgress } from "@mui/joy";
import { Backdrop } from "@mui/material";
import Image from "next/image";

interface Props {
  isLoading: boolean;
  isSuccess: boolean;
}

const SuccessIcon = ({ isLoading, isSuccess }: Props) => {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        {isSuccess ? (
          <Card
            variant="outlined"
            orientation="horizontal"
            sx={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              padding: 0,
              display: "contents",
            }}
          >
            (
            <Image
              src="/icons/ic_success.gif"
              width={150}
              height={150}
              alt="ic_success"
              style={{
                borderRadius: "50%",
              }}
            />
            )
          </Card>
        ) : (
          <CircularProgress size="lg" />
        )}
      </Backdrop>
    </>
  );
};

export default SuccessIcon;
