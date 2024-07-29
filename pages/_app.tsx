import type { AppProps } from 'next/app';

import { ConfigProvider } from 'antd';
import { ToastContainer } from 'react-toastify';

import { appWithTranslation } from 'next-i18next';

import { Layout } from '@components/index';

import '@resources/css/app.css';
import 'react-toastify/dist/ReactToastify.css';

import { useTheme } from '@hooks/index';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = useTheme();

  return (
    <ConfigProvider wave={{ disabled: true }} theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>

      <ToastContainer />
    </ConfigProvider>
  );
};

export default appWithTranslation(App);
