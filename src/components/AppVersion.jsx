import packageJson from '../../package.json';

const AppVersion = () => {
  const { name, version } = packageJson;
  console.log("AppVersion", name, version);
  return (
    <span>{name} v{version}</span>
  );
}

export default AppVersion;
