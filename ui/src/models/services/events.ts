export namespace ServiceEvent {
  export const accessories = {
    GetAccessirues: 'get-accessories',
    AccessoriesData: 'accessories-data',
    AccessoriesReloadRequired: 'accessories-reload-required',
    AccessoryControl: 'accessory-control',
    AccessoryControlFailure: 'accessory-control-failure'
  } as const
}
