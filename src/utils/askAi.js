const YANDEX_API_KEY = 'AQVNwN75zaQ7N0_wS5EfhXNc8Ca8JIauHEw4UHRC'
const YANDEX_FOLDER_ID = 'b1g98li0e8rmsd5ar7rf'

export const getMessage = (mess) => `
  разбей задачу ${mess} на подзадачи и поставь примерное время выполнения.Не пиши ничего лишнего. Просто пришли список.
`
export async function askAi(message)  {
  const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
    method: 'POST',
    headers: {
      
      'Content-Type': 'application/json',
      Authorization: `Api-Key ${YANDEX_API_KEY}`,
      'x-folder-id': YANDEX_FOLDER_ID
    },
    body: JSON.stringify({
      modelUri: `gpt://${YANDEX_FOLDER_ID}/yandexgpt-lite`,
      completionOptions: {
        stream: false,
        temperature: 0.1,
        maxTokens: '1000',
      },
      messages: [
        {
          role: 'system',
          text: 'ты опытный разработчик микроконтроллеров ARDUINO, а иак же просто офигенный инженер. Тебя позвали консультантом в проект. Проект это лифт.',
        },
        {
          role: 'user',
          text: getMessage(message),
        },
      ],
    }),
  });
  const json = await response.json();
  const text = json.result.alternatives[0].message.text
  console.log(text)
  return text;
}

