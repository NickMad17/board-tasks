import {baseImageUrl} from "@/config/supabase.js";

export const fetchAvatar = async (id) => {
  try {
    const response = await fetch(`${baseImageUrl}/avatars/${id}.png`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();
    return  URL.createObjectURL(blob)
  } catch (error) {
    console.error('There was a problem fetching the image:', error);
  }
};
export const setImgUrl = (id) => {
  if (id) {
    return `${baseImageUrl}/avatars/${id}.png`
  }
  return ''
}
