
export const submitAns   = makeAction ('SUBMIT_ANS')
export const createNaire = makeAction ('CREATE_NAIRE')

function makeAction (type) {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
}
