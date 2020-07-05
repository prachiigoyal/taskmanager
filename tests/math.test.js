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

test('Async function testing',(done)=>{
    setTimeout(()=>{
expect(1).toBe(2)
done()
    },2000)
})

//======================


