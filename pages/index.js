import Header from '../components/Header';
import ServiceList from '../components/Services';
import { loadConfig } from '../app/config';

const Index = ({ config }) => (
  <div>
    <Header />
    <ServiceList config={config} />
    <p>Hello Next.js</p>
  </div>
);

// TODO change this into next-redux-wrapper
Index.getInitialProps = async () => {
  const config = getConfig();
  return { config };
};

export default Index;
