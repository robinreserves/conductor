import * as React from 'react';
import { connect } from 'react-redux';
import { startService } from '../actions';

const mapDispatchToProps = dispatch => ({
  startServiceByName: name => dispatch(startService(name)),
});

const Service = connect(null, mapDispatchToProps)(
  ({ name, service, startServiceByName }) =>
    <div>
      <h1>{name}</h1>
      <p>This service has {service.exec.length} execution plan(s).</p>
      <p>This service is {service.running || 'not'} running.</p>
      <a onClick={() => startServiceByName(name)}>
        Start Service
      </a>
    </div>,
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
