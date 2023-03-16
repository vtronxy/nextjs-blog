export const isServer = typeof window === "undefined";


// NOTE: 模块在Server是「单例的模式」，各个请求之间是「共享数据」，每次请求都得是单独的生产新对象
export const setGlobalData = (key, value) => {
  isServer ? global[key] = value : window[key] = value
}

export const getGlobalData = (key) => {
  return isServer ? global[key] : window[key]
}