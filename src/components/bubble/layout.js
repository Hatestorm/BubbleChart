
export const layout = () => {
  const margin = {
    top: 25,
    right: 100,
    bottom: 20,
    left: 55
  }

  const width = 1000 - margin.left - margin.right
  const height = 400 - margin.top - margin.bottom

  return {
    margin,
    width,
    height
  }
}
