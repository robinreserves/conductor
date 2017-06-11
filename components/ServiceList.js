import * as React from 'react';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

const Service = ({ name, service, state }) => 
  <Fabric>
    <DefaultButton>{name}</DefaultButton>
    <p>This service has {service.exec.length} execution plan(s).</p>
  </Fabric>;

// config is a map from service name => service descriptor
const ServiceList = ({ config }) => (
  <div>
    {Object.keys(config).map(name => (
      <Service
        name={name}
        service={config[name]}
        state={{}}
      />
    ))}
  </div>
);

export default ServiceList;
