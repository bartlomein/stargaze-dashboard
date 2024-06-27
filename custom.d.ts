declare global {
  interface Window {
    __isReactDndBackendSetUp: any;
    keplr: any;
  }
}

export default global;
