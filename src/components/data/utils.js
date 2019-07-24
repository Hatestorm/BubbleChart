let totalMarketcap
let outputData
let piechartData
const wholeData = []
export const processData = (data) => {
  const sectorsName = filtersectorName(data, 'Category')
  const result = {}
  wholeData.push(data)
  for (let i = 0; i < sectorsName.length; i++) {
    const res = data.filter((element, index) => {
      return element.Category.toLowerCase() === sectorsName[i]
    })
    result[sectorsName[i]] = res
  }
  totalMarketcap = totalMc(data, 'Marketcap')
  piechartData = result
  combineData(result)
  return {
    outputData,
    piechartData,
    wholeData
  }
}

const combineData = (data) => {
  const result = []
  for (const i in data) {
    const obj = {}
    obj['sectors'] = i
    obj['assets'] = data[i].length
    obj['MC'] = totalMc(data[i], 'Marketcap')
    obj['million'] = convertMillion(totalMc(data[i], 'Marketcap'))
    obj['amount'] = fnum(totalMc(data[i], 'Marketcap'))
    obj['proportion'] = (totalMc(data[i], 'Marketcap') / totalMarketcap * 100).toFixed(3) + '%'

    result.push(obj)
  }
  outputData = result
}

export const filtersectorName = (data, name) => {
  const nameArr = data.map((element) => {
    return element[name]
  })

  return removeDup(nameArr)
}

const removeDup = (arr) => {
  const arrLowercase = arr.map((element) => {
    return element.toLowerCase()
  })

  arrLowercase.sort()
  const result = []
  for (let i = 0; i < arrLowercase.length; i++) {
    if (arrLowercase[i] !== arrLowercase[i + 1]) {
      result.push(arrLowercase[i])
    }
  }

  return result
}

export const totalMc = (req, name) => {
  let totalArr = []
  const maxCap = req.map((element) => {
    return element[name]
  })

  for (let index = 0; index < maxCap.length; index++) {
    const splitNo = maxCap[index].split('')
    splitNo.shift()
    let wholeNumber
    var number = []
    for (let i = 0; i < splitNo.length; i++) {
      if (!isNaN(parseInt(splitNo[i]))) {
        number.push(splitNo[i])

        if (splitNo.indexOf(splitNo[i]) === splitNo.length - 1) {
          const no = parseFloat(number.join(''))
          wholeNumber = no
        }
      } else {
        if (splitNo[i] === '.') {
          number.push(splitNo[i])
        }
        var no = parseFloat(number.join(''))
        switch (splitNo[i]) {
          case 'K':
            wholeNumber = no * 1000
            break

          case 'M':
            wholeNumber = no * 1000000
            break

          case 'B':
            wholeNumber = no * 1000000000
            break

          default:
        }
      }
    }
    totalArr.push(wholeNumber)
  }
  totalArr = totalArr.filter((element) => {
    return element !== undefined
  })
  const totalPrice = totalArr.reduce((total, num) => {
    return total + num
  })
  return totalPrice
}

export const fnum = (x) => {
  if (isNaN(x)) return x

  if (x < 9999) {
    return x
  }

  if (x < 1000000) {
    return Math.round(x / 1000) + 'K'
  }
  if (x < 10000000) {
    return (x / 1000000) + 'M'
  }

  if (x < 1000000000) {
    return Math.round((x / 1000000)) + 'M'
  }

  if (x < 1000000000000) {
    return Math.round((x / 1000000000)) + 'B'
  }

  return '1T+'
}
const convertMillion = (labelValue) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 //  million
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

      ? Math.abs(Number(labelValue)) / 1.0e+3 // k

      : Math.abs(Number(labelValue))
}
export const maxX = (req) => {
  return req.map((element) => {
    return element.million
  })
}

export const maxDensityY = (req) => {
  return req.map((element) => {
    return element.assets
  })
}

export const stringCombine = (str) => {
  const d = str.split(' ').join('').toLowerCase()
  return d
}

export const covertNumber = (request) => {
  request = request.toString()
  const splitNo = request.split('')

  splitNo.shift()
  let wholeNumber
  var number = []
  for (let i = 0; i < splitNo.length; i++) {
    if (!isNaN(parseInt(splitNo[i]))) {
      number.push(splitNo[i])

      if (splitNo.indexOf(splitNo[i]) === splitNo.length - 1) {
        const no = parseFloat(number.join(''))
        wholeNumber = no
      }
    } else {
      if (splitNo[i] === '.') {
        number.push(splitNo[i])
      }
      var no = parseFloat(number.join(''))
      switch (splitNo[i]) {
        case 'K':
          wholeNumber = no * 1000
          break

        case 'M':
          wholeNumber = no * 1000000
          break

        case 'B':
          wholeNumber = no * 1000000000
          break

        default:
      }
    }
  }
  return wholeNumber
}

export const totalMcCalc = (req, name) => {
  const maxCap = req.map((element) => {
    return element[name]
  })
  return maxCap.reduce((total, num) => {
    return total + num
  })
}
