import { MessageVO } from 'models/ui/messageVO'

export const toMessageVO = (message: string): MessageVO => ({
  message,
  sender: 'assistant',
  timestamp: Date.now()
})

/**
 * Function to store the value in the string where the Placeholder exists.
 * Enclose the key to be used as a Placeholder with `{{ KEY }}`
 *
 * e.g. `interpolate("Turned on the {{ DEVICE_NAME }}.", {DEVICE_NAME: "light"}` : "Turned on the light."
 * @param sentence String containing placeholder
 * @param values
 */
export const interpolate = (
  sentence: string,
  values: { [key: string]: string | number }
) => {
  const keys = sentence.split(/.*?{{\s?(.+?)\s?}}.*?/).filter(t => t !== '')
  const separate = sentence.split(/{{\s?(.+?)\s?}}/)
  return separate
    .map(content =>
      keys.includes(content) && values[content] ? values[content] : content
    )
    .join('')
}

// TODO: Allows the user to set it arbitrarily
export const getUserLang = () => {
  const language =
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language

  // HOPE: I want to increase the supported languages
  return language === 'ja' ? 'ja' : 'en'
}
export type SupportLang = ReturnType<typeof getUserLang>
