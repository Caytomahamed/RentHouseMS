// eslint-disable-next-line react/prop-types
import emptyHouse from '../assets/images/emptyhouse.jpg';

const NoPropertyFound = () => (
  <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <img
        src={emptyHouse}
        style={{ width: '35rem', opacity: '.5' }}
        alt="No property found"
      />
      <div style={{ marginTop: '0rem' }}>
        <h1 style={{ fontSize: '2rem' }}>No Property Found</h1>
      </div>
      <div style={{height:"15rem"}}></div>
    </div>
  </div>
);

export default NoPropertyFound;
