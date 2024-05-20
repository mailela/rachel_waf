const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  config: state => state.user.config,
  menus: state => state.user.menus,
  name: state => state.user.name,
  role_name: state => state.user.role_name,
  watermark: state => state.user.watermark,
  version: state => state.user.config.version,
  n_version: state => state.user.config.n_version,
  is_gov: state => state.user.config.gov
}
export default getters
