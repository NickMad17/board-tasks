export const selectTaskStatuses = [
  {
    value: "pending",
    label: "В ожидании",
    color: 'secondary'
  },
  {
    value: "progress",
    label: "В работе",
    color: 'warning'
  },
  {
    value: "review",
    label: "На проверке",
    color: "danger"
  }
]

export const selectTaskStatusesOnBoard = [
  {
    value: "pending",
    label: "В ожидании",
    color: 'secondary'
  },
  {
    value: "progress",
    label: "В работе",
    color: 'warning'
  },
  {
    value: "review",
    label: "На проверке",
    color: "danger"
  },
  {
    value: "success",
    label: "Готово",
    color: "success"
  }
]

export const selectTaskTypes = [
  {
    value: "programmer",
    label: "Программирование",
    color: 'primary'
  },
  {
    value: "engineer",
    label: "Инженеинг",
    color: 'warning'
  },

]

export const selectUsersTest = [
  {
    id: "1",
    name: "Никита",
    img: 'https://i.ytimg.com/vi/rmx4UX_KMYI/maxresdefault.jpg',
    tg: 'https://t.me/maady55'
  },
  {
    id: "2",
    name: "Ярик",
    img: "https://aviaaleks.ru/wp-content/uploads/2021/01/1-vse-vozmozhno.jpg",
    tg: 'https://t.me/YarcheTuch'
  },
]

export const password = import.meta.env.VITE_APP_SUPER_KEY;