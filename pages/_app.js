import "antd/dist/antd.css";
import "../styles/vars.css";
import "../styles/global.css";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Trump Translator</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
