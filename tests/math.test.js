// test('hello World',()=>{

// })

// test('Error here',()=>{
//     throw new error()
// })
//==============================================

const {celsiusToFahrenheit, fahrenheitToCelsius } = require('../src/math')


//======================

test('pass',()=>{
    result=fahrenheitToCelsius(32)
    expect(result).toBe(0)
})

test('pass',()=>{
    result=celsiusToFahrenheit(0)
    expect(result).toBe(32)
})
//======================


