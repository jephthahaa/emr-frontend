import { FONTS } from "@/assets/fonts";
import "./globals.css";
import Providers from "./providers";
import { SERVICE_MODE } from "@/constants";

const title = {
  ADMIN: "ZMR Admin Dashboard",
  PATIENT: "ZMR - Patient Portal",
  DOCTOR: "ZMR - Doctor Portal",
};

export const metadata = {
  title: title[SERVICE_MODE],
  description:
    "A secure healthcare platform to boost patient engagement and improve overall healthcare delivery",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${FONTS.productSans.variable}`}>
      <body suppressHydrationWarning={true} className="font-poppins">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
