module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'DndLoanDebt',
      externals: {
        react: 'React'
      }
    }
  }
}
