export function hello () {
  const a = 'Hello rubik!'
  return a
}

export function removeXmlVideo (xml) {
  return xml.replace(/<video>.*?<\/video>/ig, '')
}
