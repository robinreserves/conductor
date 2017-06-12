import * as React from 'react';
import { connect } from 'react-redux';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { startService } from '../actions';

const mapDispatchToProps = dispatch => ({
  startServiceByName: name => dispatch(startService(name)),
});

const Service = connect(null, mapDispatchToProps)(
  ({ name, service, startServiceByName }) =>
    <Fabric>
      <DefaultButton>{name}</DefaultButton>
      <p>This service has {service.exec.length} execution plan(s).</p>
      <p>This service is {service.running || 'not'} running.</p>
      <DefaultButton onClick={() => startServiceByName(name)}>
        Start
      </DefaultButton>
    </Fabric>,
  );

Service.propTypes = {
  name: React.PropTypes.string.isRequired,
  service: React.PropTypes.object.isRequired, // eslint-disable-line
  startServiceByName: React.PropTypes.func.isRequired,
};


// services is a map from name => descriptor/status
const ServiceList = ({ services }) => (
  <div>
    {Object.keys(services).map(name => (
      <Service
        name={name}
        service={services[name]}
      />
    ))}
  </div>
);

ServiceList.propTypes = {
  services: React.PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = state => ({
  services: state.services,
});

export default connect(mapStateToProps)(ServiceList);
