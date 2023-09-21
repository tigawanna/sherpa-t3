import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import Layout from "./layout";
import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "src/styles/cherry/cherry.css";
import { useEffect } from "react";
import { themeChange } from "theme-change";

const MyApp: AppType<{ session: Session | null }> = ({Component,pageProps: { session, ...pageProps },}) => {
  useEffect(() => {
  themeChange(false);
  // 👆 false parameter is required for react project
}, []);
  
  return (
    <ThemeProvider defaultTheme="system">
      <Layout>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Layout>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
